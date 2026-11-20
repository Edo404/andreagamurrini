import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Resend } from "resend";

type Env = { RESEND_API_KEY?: string; CONTACT_TO_EMAIL?: string; CONTACT_FROM_EMAIL?: string };

function readEnv(): Env {
  // su Cloudflare le variabili arrivano dai binding del Worker; in locale da .dev.vars / .env
  let cf: Env = {};
  try {
    cf = getCloudflareContext().env as Env;
  } catch {
    /* fuori dal runtime Cloudflare */
  }
  return {
    RESEND_API_KEY: cf.RESEND_API_KEY ?? process.env.RESEND_API_KEY,
    CONTACT_TO_EMAIL: cf.CONTACT_TO_EMAIL || process.env.CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL: cf.CONTACT_FROM_EMAIL || process.env.CONTACT_FROM_EMAIL,
  };
}

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // honeypot: i bot compilano anche il campo nascosto → si risponde "ok" senza inviare
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const name = clean(body.name, 200);
  const email = clean(body.email, 200);
  const subject = clean(body.subject, 300);
  const message = clean(body.message, 5000);
  const lang = clean(body.lang, 5);
  if (!name || !EMAIL.test(email)) return Response.json({ ok: false, error: "invalid_fields" }, { status: 422 });

  const env = readEnv();
  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    console.error("Modulo contatti: RESEND_API_KEY, CONTACT_TO_EMAIL o CONTACT_FROM_EMAIL non configurati");
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const resend = new Resend(env.RESEND_API_KEY);
  const text = [`Nome: ${name}`, `Email: ${email}`, `Oggetto: ${subject || "-"}`, `Lingua: ${lang || "-"}`, "", message || "(nessun messaggio)"].join("\n");
  const { error } = await resend.emails.send({
    from: env.CONTACT_FROM_EMAIL,
    to: env.CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
    replyTo: email,
    subject: `[andreagamurrini.com] ${subject || `Messaggio da ${name}`}`,
    text,
    html: `<pre style="font-family:inherit;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
  });

  if (error) {
    console.error("Resend:", error);
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
