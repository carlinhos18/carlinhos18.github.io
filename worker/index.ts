export interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO: string;
  CONTACT_LIMITER?: { limit(o: { key: string }): Promise<{ success: boolean }> };
  TURNSTILE_SECRET?: string;
}

const corsHeaders: Record<string, string> = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "content-type",
};

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json",
      ...corsHeaders,
    },
  });

export async function handle(request: Request, env: Env): Promise<Response> {
  const { pathname } = new URL(request.url);

  if (pathname === "/api/contact") {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method === "POST") {
      const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";

      if (env.CONTACT_LIMITER) {
        const { success } = await env.CONTACT_LIMITER.limit({ key: ip });
        if (!success) return json({ error: "Too many requests" }, 429);
      }

      let body: any;
      try {
        body = await request.json();
      } catch {
        return json({ error: "Invalid JSON" }, 400);
      }

      const { name, email, message, website, token } = body ?? {};
      if (website) return json({ ok: true }); // honeypot: bots fill this hidden field
      if (!name || !email || !message || message.length > 2000 || !/^\S+@\S+\.\S+$/.test(email)) {
        return json({ error: "Invalid input" }, 400);
      }

      if (env.TURNSTILE_SECRET) {
        const v = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
          method: "POST",
          body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token ?? "", remoteip: ip }),
        }).then((r) => r.json<{ success: boolean }>());
        if (!v.success) return json({ error: "Bot check failed" }, 403);
      }

      const rawKey = env.RESEND_API_KEY || "";
      const apiKey = rawKey.trim().replace(/^["']|["']$/g, "");

      if (!apiKey) {
        console.error("Missing RESEND_API_KEY in worker environment");
        return json({ error: "Configuration error: RESEND_API_KEY is not configured in Cloudflare" }, 500);
      }

      const targetEmail = env.CONTACT_TO || "carloslisboa2005@gmail.com";

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio <onboarding@resend.dev>",
          to: targetEmail,
          reply_to: email,
          subject: `Portfolio message from ${name}`,
          text: `${name} <${email}>\n\n${message}`,
        }),
      });

      if (!res.ok) {
        const errorDetail = await res.text();
        const masked = apiKey.length >= 8 ? `${apiKey.slice(0, 5)}...${apiKey.slice(-4)} (length ${apiKey.length})` : `(length ${apiKey.length})`;
        console.error("resend failed", res.status, errorDetail, "key info:", masked);
        if (res.status === 401) {
          return json({ error: `Resend rejected API key (401). Key in Cloudflare is ${masked}. Please check that the secret matches your active Resend key.` }, 502);
        }
        return json({ error: `Email failed (${res.status}): ${errorDetail}` }, 502);
      }

      return json({ ok: true });
    }
  }

  return json({ error: "Not found" }, 404);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      return await handle(request, env);
    } catch (err) {
      console.error("unhandled", { path: new URL(request.url).pathname, err: String(err) });
      return json({ error: "Internal error" }, 500);
    }
  },
};
