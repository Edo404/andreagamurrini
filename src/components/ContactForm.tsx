"use client";

import { useState, type FormEvent } from "react";
import type { ContactFormElement } from "@/lib/content";
import { UI, type Lang } from "@/lib/i18n";

type Status = { kind: "idle" | "sending" | "sent" | "error"; message?: string };

export function ContactForm({ labels, lang }: { labels: ContactFormElement["labels"]; lang: Lang }) {
  const t = UI[lang];
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (!data.name?.trim() || !data.email?.trim()) return setStatus({ kind: "error", message: t.required });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      return setStatus({ kind: "error", message: t.invalidEmail });

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
  return (
    <form className="contact" onSubmit={onSubmit} noValidate>
      <h1 className="contact-title">{labels.title}</h1>
      <label className="sr-only" htmlFor="cf-name">{labels.name}</label>
      <input id="cf-name" name="name" type="text" placeholder={labels.name} required autoComplete="name" maxLength={200} />
      <label className="sr-only" htmlFor="cf-email">{labels.email}</label>
      <input id="cf-email" name="email" type="email" placeholder={labels.email} required autoComplete="email" maxLength={200} />
      <label className="sr-only" htmlFor="cf-subject">{labels.subject}</label>
      <input id="cf-subject" name="subject" type="text" placeholder={labels.subject} maxLength={300} />
      <label className="sr-only" htmlFor="cf-message">{labels.message}</label>
      <textarea id="cf-message" name="message" placeholder={labels.message} maxLength={5000} />
      {/* campo trappola per i bot: invisibile alle persone */}
      <input className="hp" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="contact-foot">
        <p className={`contact-status ${status.kind}`} role="status" aria-live="polite">
          {busy ? t.sending : status.message}
        </p>
        <button type="submit" disabled={busy}>
          {labels.send}
        </button>
      </div>
    </form>
  );
}
