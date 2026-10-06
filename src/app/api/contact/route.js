import { company } from "@/content/company";

/**
 * Project briefs from the contact form, delivered to the inbox by email
 * through Resend (https://resend.com). Set these on the server:
 *
 *   RESEND_API_KEY  the API key
 *   CONTACT_FROM    a sender on a domain verified in Resend,
 *                   e.g. "Nexarrow website <website@nexarrow.eu>"
 *   CONTACT_TO      the inbox that receives briefs (defaults to company.email)
 *
 * Without a key the route answers 503 and the form offers an email draft
 * instead, so a brief is never silently dropped.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** At most five briefs per address every ten minutes. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map();

function overLimit(ip) {
  const now = Date.now();
  if (recent.size > 2000) recent.clear();
  const hits = (recent.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

const field = (value, max) => String(value ?? "").trim().slice(0, max);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  // Honeypot: people never see this field, bots fill it. Answer as if sent.
  if (field(body.website, 200)) return Response.json({ ok: true });

  const brief = {
    name: field(body.name, 120),
    company: field(body.company, 120),
    email: field(body.email, 200),
    topic: field(body.topic, 80),
    message: field(body.message, 5000),
  };
  if (!brief.name || !EMAIL.test(brief.email) || brief.message.length < 10) {
    return Response.json({ error: "invalid" }, { status: 422 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (overLimit(ip)) return Response.json({ error: "rate_limited" }, { status: 429 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: "not_configured" }, { status: 503 });

  const subject = `Project brief${brief.topic ? `: ${brief.topic}` : ""}${brief.company ? ` (${brief.company})` : ""}`;
  const details = [
    `Name: ${brief.name}`,
    brief.company && `Company: ${brief.company}`,
    `Email: ${brief.email}`,
    brief.topic && `Service: ${brief.topic}`,
  ].filter(Boolean);
  const text = `${details.join("\n")}\n\n${brief.message}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || `${company.short} website <website@nexarrow.eu>`,
        to: [process.env.CONTACT_TO || company.email],
        reply_to: brief.email,
        subject,
        text,
      }),
    });
    if (!res.ok) {
      console.error("contact: email provider refused the brief", res.status, await res.text().catch(() => ""));
      return Response.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("contact: email provider unreachable", err);
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
