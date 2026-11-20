"use client";

import { useState, type FormEvent } from "react";
import type { Lang } from "@/lib/i18n";
import { UI } from "@/data/ui";

type Labels = { name: string; email: string; subject: string; message: string; send: string };
type Status = { kind: "idle" | "sending" | "sent" | "error"; message?: string };

const clean = (s: string) => s.replace(/\s*\*\s*$/, "");

export function ContactForm({ labels, lang }: { labels: Labels; lang: Lang }) {
  const t = UI[lang];
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const bad = {
      name: !data.name?.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email?.trim() ?? ""),
    };
    setInvalid(bad);
    if (bad.name || !data.email?.trim()) return setStatus({ kind: "error", message: t.required });
    if (bad.email) return setStatus({ kind: "error", message: t.invalidEmail });

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus({ kind: "sent", message: t.sent });
    } catch {
      setStatus({ kind: "error", message: t.error });
    }
  }

  const busy = status.kind === "sending";
  const field = (name: string, label: string, opts: { type?: string; required?: boolean; area?: boolean; auto?: string; max: number }) => (
    <div className={`field${invalid[name] ? " is-invalid" : ""}${opts.area ? " field-area" : ""}`}>
      <label htmlFor={`cf-${name}`}>
        {clean(label)}
        {opts.required && <span aria-hidden="true"> *</span>}
      </label>
      {opts.area ? (
        <textarea id={`cf-${name}`} name={name} maxLength={opts.max} rows={6} />
      ) : (
        <input
          id={`cf-${name}`}
          name={name}
          type={opts.type ?? "text"}
          required={opts.required}
          autoComplete={opts.auto}
          maxLength={opts.max}
          aria-invalid={invalid[name] || undefined}
        />
      )}
    </div>
  );

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      {field("name", labels.name, { required: true, auto: "name", max: 200 })}
      {field("email", labels.email, { type: "email", required: true, auto: "email", max: 200 })}
      {field("subject", labels.subject, { max: 300 })}
      {field("message", labels.message, { area: true, max: 5000 })}
      {/* campo trappola per i bot: invisibile alle persone */}
      <input className="hp" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form-foot">
        <p className={`form-status ${status.kind}`} role="status" aria-live="polite">
          {busy ? t.sending : status.message}
        </p>
        <button type="submit" className="btn btn-solid" disabled={busy}>
          {busy ? t.sending : labels.send.charAt(0) + labels.send.slice(1).toLowerCase()}
          {!busy && <span aria-hidden="true"> →</span>}
        </button>
      </div>
    </form>
  );
}
