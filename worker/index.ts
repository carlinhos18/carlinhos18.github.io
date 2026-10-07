interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO: string;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/contact" && request.method === "POST") {
      let body: any;
      try {
        body = await request.json();
      } catch {
        return json({ error: "Invalid JSON" }, 400);
      }

      const { name, email, message, website } = body ?? {};
      if (website) return json({ ok: true }); // honeypot: bots fill this hidden field
      if (!name || !email || !message || message.length > 2000 || !/^\S+@\S+\.\S+$/.test(email)) {
        return json({ error: "Invalid input" }, 400);
      }

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio <onboarding@resend.dev>",
          to: env.CONTACT_TO,
          reply_to: email,
          subject: `Portfolio message from ${name}`,
          text: `${name} <${email}>\n\n${message}`,
        }),
      });

      return res.ok ? json({ ok: true }) : json({ error: "Email failed" }, 502);
    }

    return json({ error: "Not found" }, 404);
  },
};
