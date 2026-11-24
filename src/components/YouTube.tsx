"use client";

import { useState } from "react";
import { Play } from "@phosphor-icons/react";
import type { Lang } from "@/lib/i18n";
import { UI } from "@/data/ui";

/**
 * Video YouTube "leggero": mostra la copertina e carica il player (youtube-nocookie) solo al clic.
 * `large` è il grande schermo; `row` è una riga della scaletta (miniatura e titolo affiancati).
 */
export function YouTube({
  id,
  title,
  lang,
  large = false,
  row = false,
}: {
  id: string;
  title: string;
  lang: Lang;
  large?: boolean;
  row?: boolean;
}) {
  const [play, setPlay] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${id}/${large ? "hqdefault" : "mqdefault"}.jpg`;

  if (play) {
    return (
      <div
        className={`yt-box${large ? " yt-large" : ""}${row ? " yt-row is-playing" : ""}`}
      >
        <iframe
          className="yt-frame"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={`yt-box${large ? " yt-large" : ""}${row ? " yt-row" : ""}`}>
      <button
        type="button"
        className="yt-facade"
        onClick={() => setPlay(true)}
        aria-label={`${UI[lang].play}: ${title}`}
      >
        <span className="yt-thumb">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt=""
            loading="lazy"
            decoding="async"
            width={480}
            height={360}
          />
          <span className="yt-play" aria-hidden="true">
            <Play weight="fill" size={large ? 30 : 18} />
          </span>
        </span>
        {row && <span className="yt-title">{title}</span>}
      </button>
    </div>
  );
}
