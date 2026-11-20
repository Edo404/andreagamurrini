"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import { UI } from "@/data/ui";

/**
 * Video YouTube "leggero": mostra la copertina e carica il player (youtube-nocookie) solo al clic.
 * `compact` = riga con miniatura e titolo; al clic il player si apre sopra il titolo.
 */
export function YouTube({
  id,
  title,
  lang,
  large = false,
  compact = false,
  index,
}: {
  id: string;
  title: string;
  lang: Lang;
  large?: boolean;
  compact?: boolean;
  index?: number;
}) {
  const [play, setPlay] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${id}/${large ? "hqdefault" : "mqdefault"}.jpg`;

  const player = (
    <iframe
      className="yt-frame"
      src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );

  if (compact) {
    return (
      <div className={`yt-compact${play ? " is-playing" : ""}`}>
        {play ? (
          <div className="yt-box">{player}</div>
        ) : (
          <button type="button" className="yt-row" onClick={() => setPlay(true)} aria-label={`${UI[lang].play}: ${title}`}>
            <span className="yt-row-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumb} alt="" loading="lazy" decoding="async" width={320} height={180} />
              <span className="yt-mini-play" aria-hidden="true" />
            </span>
            <span className="yt-row-text">
              {index !== undefined && <span className="num">{String(index).padStart(2, "0")}</span>}
              <span className="yt-row-title">{title}</span>
            </span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`yt-box${large ? " yt-large" : ""}`}>
      {play ? (
        player
      ) : (
        <button type="button" className="yt-facade" onClick={() => setPlay(true)} aria-label={`${UI[lang].play}: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumb} alt="" loading="lazy" decoding="async" width={480} height={360} />
          <span className="yt-caption">
            {index !== undefined && <span className="num">{String(index).padStart(2, "0")}</span>}
            <span className="yt-title">{title}</span>
          </span>
          <span className="yt-play" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
