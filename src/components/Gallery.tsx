"use client";

import { useCallback, useEffect, useState } from "react";
import { masonryColumns, type GalleryImage } from "@/lib/gallery";
import { UI, type Lang } from "@/lib/i18n";

export function Gallery({ images, lang }: { images: GalleryImage[]; width: number; lang: Lang }) {
  const [open, setOpen] = useState<number | null>(null);
  const t = UI[lang];
  const cols = masonryColumns(images);

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
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  return (
    <>
      <div className="masonry">
        {cols.map((c, ci) => (
          <div key={ci} className="masonry-col">
            {c.items.map(({ img, index }) => (
              <button key={index} type="button" className="masonry-item" onClick={() => setOpen(index)}>
                {/* eslint-disable-next-line @next/next/no-img-element -- immagini già ottimizzate */}
                <img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        ))}
      </div>

      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[open].src} alt={images[open].alt} onClick={(e) => e.stopPropagation()} />
          <button type="button" className="lb-btn lb-close" aria-label={t.galleryClose} onClick={close}>
            ×
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
            ‹
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
            ›
          </button>
        </div>
      )}
    </>
  );
}
