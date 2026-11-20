export type GalleryImage = { src: string; w: number; h: number };

/** Masonry: ogni foto va nella colonna più corta (in proporzione all'altezza). */
export function masonryColumns(images: GalleryImage[], columns: number) {
  const cols: { items: { img: GalleryImage; index: number }[]; ratioSum: number }[] = Array.from(
    { length: columns },
    () => ({ items: [], ratioSum: 0 }),
  );
  images.forEach((img, index) => {
    const target = cols.reduce((a, b) => (b.ratioSum < a.ratioSum ? b : a));
    target.items.push({ img, index });
    target.ratioSum += img.h / img.w;
  });
  return cols;
}
