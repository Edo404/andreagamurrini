"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import { UI } from "@/data/ui";

/**
 * Video YouTube "leggero": mostra la copertina e carica il player (youtube-nocookie) solo al clic.
 */
export function YouTube({
  id,
  title,
  lang,
  large = false,
  index,
}: {
  id: string;
  title: string;
  lang: Lang;
  large?: boolean;
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

  return (
    <div className={`yt-box${large ? " yt-large" : ""}`}>
      {play ? (
        player
      ) : (
        <button
          type="button"
          className="yt-facade"
          onClick={() => setPlay(true)}
          aria-label={`${UI[lang].play}: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt=""
            loading="lazy"
            decoding="async"
            width={480}
            height={360}
          />
          <span className="yt-caption">
            {index !== undefined && (
              <span className="num">{String(index).padStart(2, "0")}</span>
            )}
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
