"use client";

import { useState } from "react";
import { UI, type Lang } from "@/lib/i18n";

/**
 * Video YouTube "leggero": mostra l'anteprima e carica il player solo al clic
 * (pagine molto più veloci di 25 iframe caricati subito, come faceva Wix).
 */
export function YouTube({ id, title, lang }: { id: string; title: string; lang: Lang }) {
  const [play, setPlay] = useState(false);

  if (play) {
    return (
      <iframe
        className="yt-frame"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button type="button" className="yt-facade" onClick={() => setPlay(true)} aria-label={`${UI[lang].play}: ${title}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- miniatura servita da YouTube */}
      <img src={`https://i.ytimg.com/vi/${id}/mqdefault.jpg`} alt="" loading="lazy" decoding="async" />
      <span className="yt-title">{title}</span>
      <span className="yt-play" aria-hidden="true">
        <svg viewBox="0 0 68 48" width="68" height="48">
          <path d="M66.5 7.7c-.8-2.9-2.5-5.4-5.4-6.2C55.8.1 34 0 34 0S12.2.1 6.9 1.6c-3 .7-4.6 3.2-5.4 6.1C.1 13 0 24 0 24s.1 11 1.5 16.3c.8 2.9 2.5 5.4 5.4 6.2C12.2 47.9 34 48 34 48s21.8-.1 27.1-1.6c3-.7 4.6-3.2 5.4-6.1C67.9 35 68 24 68 24s-.1-11-1.5-16.3z" fill="#f00" />
          <path d="M45 24 27 14v20" fill="#fff" />
        </svg>
      </span>
    </button>
  );
}
