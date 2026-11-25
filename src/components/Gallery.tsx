"use client";

import { useCallback, useEffect, useId, useState } from "react";
import type { GalleryImage } from "@/lib/gallery";
import type { Lang } from "@/lib/i18n";
import { UI } from "@/data/ui";
import { ArrowRight, X } from "@phosphor-icons/react";

/**
 * Mosaico a blocchi di 8 riquadri che si incastrano senza buchi (vedi .sheet in globals.css):
 * uno grande, tre alti, due larghi, due piccoli. Dentro ogni blocco le foto vanno nel riquadro
 * che somiglia di più alla loro forma: le verticali negli alti, le panoramiche nei larghi.
 */
const SLOTS = [
  "big",
  "one",
  "tall",
  "one",
  "tall",
  "wide",
  "tall",
  "wide",
] as const;
type Slot = (typeof SLOTS)[number];

function arrange(images: GalleryImage[]): (GalleryImage & { slot?: Slot })[] {
  const out: (GalleryImage & { slot?: Slot })[] = [];
  for (let b = 0; b < images.length; b += SLOTS.length) {
    const block = images.slice(b, b + SLOTS.length);
    if (block.length < SLOTS.length) {
      out.push(...block); // blocco incompleto: riquadri normali, nessuno schema
      continue;
    }
    const byRatio = [...block].sort((x, y) => x.w / x.h - y.w / y.h);
    const pool: Record<Slot, GalleryImage[]> = {
      tall: byRatio.slice(0, 3), // le tre più verticali
      wide: byRatio.slice(-2), // le due più panoramiche
      big: byRatio.slice(-3, -2), // la più larga che resta
      one: byRatio.slice(3, 5),
    };
    out.push(...SLOTS.map((slot) => ({ ...pool[slot].shift()!, slot })));
  }
  return out;
}

/** Foglio dei provini a mosaico: le prime `initial`, poi "Altri". Clic su una foto = lightbox con frecce e tastiera. */
export function Gallery({
  images: source,
  lang,
  initial = 8,
}: {
  images: GalleryImage[];
  lang: Lang;
  initial?: number;
}) {
  const t = UI[lang];
  const images = arrange(source);
  const [open, setOpen] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const hidden = images.length - initial;

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) =>
      setOpen((i) =>
        i === null ? i : (i + d + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open, close, step]);

  return (
    <>
      <ul id={id} className={`sheet${expanded ? " is-open" : ""}`}>
        {images.map((img, i) => (
          <li
            key={img.src}
            className={
              [img.slot && `slot-${img.slot}`, i >= initial && "x-more"]
                .filter(Boolean)
                .join(" ") || undefined
            }
            hidden={i >= initial && !expanded}
            style={{ "--k": i - initial } as React.CSSProperties}
          >
            <button
              type="button"
              className="frame"
              onClick={() => setOpen(i)}
              aria-label={`${t.gallery.open} ${i + 1}/${images.length}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- immagini già ottimizzate */}
              <img
                src={img.src}
                alt=""
                width={img.w}
                height={img.h}
                loading="lazy"
                decoding="async"
              />
            </button>
          </li>
        ))}
      </ul>
      {hidden > 0 && (
        <div className="x-toggle">
          <button
            type="button"
            className="btn btn-ghost"
            aria-expanded={expanded}
            aria-controls={id}
            onClick={() => setExpanded((e) => !e)}
          >
            {expanded ? t.less : `${t.more} (${hidden})`}
            <span className="x-icon" aria-hidden="true" />
          </button>
        </div>
      )}

      {open !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={t.gallery.title}
          onClick={close}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[open].src}
            alt={`dr.gam, ${open + 1}/${images.length}`}
            onClick={(e) => e.stopPropagation()}
          />
          <p className="lb-count num">
            {String(open + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </p>
          <button type="button" className="lb-btn lb-close" onClick={close}>
            <X size={18} aria-hidden="true" />
            {t.galleryClose}
          </button>
          <button
            type="button"
            className="lb-btn lb-prev"
            aria-label={t.galleryPrev}
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            <ArrowRight className="lb-flip" size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="lb-btn lb-next"
            aria-label={t.galleryNext}
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            <ArrowRight size={22} aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
