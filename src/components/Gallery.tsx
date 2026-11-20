"use client";

import { useCallback, useEffect, useState } from "react";
import { masonryColumns, type GalleryImage } from "@/lib/gallery";
import type { Lang } from "@/lib/i18n";
import { UI } from "@/data/ui";

export function Gallery({ images, lang }: { images: GalleryImage[]; lang: Lang }) {
  const [open, setOpen] = useState<number | null>(null);
  const t = UI[lang];
  // 3 colonne su desktop, 2 su telefono: entrambe nel DOM, il CSS mostra quella giusta
  const layouts = [3, 2].map((n) => ({ n, cols: masonryColumns(images, n) }));

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + images.length) % images.length)),
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
      {layouts.map(({ n, cols }) => (
        <div key={n} className={`masonry masonry-${n}`} aria-hidden={n === 2 ? "true" : undefined}>
          {cols.map((c, ci) => (
            <div key={ci} className="masonry-col">
              {c.items.map(({ img, index }) => (
                <button
                  key={index}
                  type="button"
                  className="masonry-item reveal"
                  onClick={() => setOpen(index)}
                  tabIndex={n === 2 ? -1 : undefined}
                  aria-label={`dr.gam – ${index + 1}/${images.length}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- immagini già ottimizzate */}
                  <img src={img.src} alt="" width={img.w} height={img.h} loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          ))}
        </div>
      ))}

      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="dr.gam" onClick={close}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[open].src} alt={`dr.gam – ${open + 1}/${images.length}`} onClick={(e) => e.stopPropagation()} />
          <p className="lb-count num">
            {String(open + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </p>
          <button type="button" className="lb-btn lb-close" aria-label={t.galleryClose} onClick={close}>
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
            ←
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
            →
          </button>
        </div>
      )}
    </>
  );
}
