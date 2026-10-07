import { describe, it, expect, vi } from "vitest";
import worker from "./index";

const env = {
  RESEND_API_KEY: "x",
  CONTACT_TO: "me@test.dev",
  CONTACT_LIMITER: { limit: async () => ({ success: true }) },
  TURNSTILE_SECRET: "x",
} as any;

const post = (body: unknown) =>
  worker.fetch(
    new Request("https://t.dev/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }),
    env
  );

describe("/api/contact", () => {
  it("rejects invalid email", async () => {
    expect((await post({ name: "A", email: "nope", message: "hi" })).status).toBe(400);
  });

  it("silently accepts honeypot hits without sending", async () => {
    const f = vi.fn();
    vi.stubGlobal("fetch", f);
    expect((await post({ website: "spam" })).status).toBe(200);
    expect(f).not.toHaveBeenCalled();
  });

  it("returns 429 when rate limited", async () => {
    const limited = { ...env, CONTACT_LIMITER: { limit: async () => ({ success: false }) } };
    const res = await worker.fetch(
      new Request("https://t.dev/api/contact", { method: "POST", body: "{}" }),
      limited
    );
    expect(res.status).toBe(429);
  });

  it("returns 403 when turnstile verification fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: false })));
    vi.stubGlobal("fetch", fetchMock);

    const res = await post({
      name: "Alice",
      email: "alice@example.com",
      message: "Hello world!",
      token: "bad-token",
    });
    expect(res.status).toBe(403);
  });

  it("sends email successfully when valid", async () => {
    const fetchMock = vi.fn().mockImplementation(async (url: string) => {
      if (typeof url === "string" && url.includes("turnstile")) {
        return new Response(JSON.stringify({ success: true }));
      }
      return new Response(JSON.stringify({ id: "msg_123" }), { status: 200 });
    });
    vi.stubGlobal("fetch", fetchMock);

    const res = await post({
      name: "Alice",
      email: "alice@example.com",
      message: "Hello world!",
      token: "good-token",
    });
    expect(res.status).toBe(200);
  });
});
