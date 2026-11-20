export type GalleryImage = { src: string; alt: string; width: number; height: number };

export const GALLERY_GAP = 16;
export const GALLERY_COLUMNS = 2;

/** Masonry a 2 colonne: ogni immagine va nella colonna più corta (in proporzione). */
export function masonryColumns(images: GalleryImage[], columns = GALLERY_COLUMNS) {
  const cols: { items: { img: GalleryImage; index: number }[]; ratioSum: number }[] = Array.from(
    { length: columns },
    () => ({ items: [], ratioSum: 0 }),
  );
  images.forEach((img, index) => {
    const target = cols.reduce((a, b) => (b.ratioSum < a.ratioSum ? b : a));
    target.items.push({ img, index });
    target.ratioSum += img.height / img.width;
  });
  return cols;
}

/** Altezza della galleria alla larghezza indicata (serve a dimensionare la pagina su desktop). */
export function galleryHeight(images: GalleryImage[], width: number, columns = GALLERY_COLUMNS) {
  const colW = (width - GALLERY_GAP * (columns - 1)) / columns;
  return Math.max(
    ...masonryColumns(images, columns).map(
      (c) => c.ratioSum * colW + GALLERY_GAP * Math.max(0, c.items.length - 1),
    ),
  );
}
