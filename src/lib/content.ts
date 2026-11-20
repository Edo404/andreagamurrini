import type { Lang } from "./i18n";
import site from "@/content/site.json";

import enHome from "@/content/pages/en/home.json";
import enBio from "@/content/pages/en/bio.json";
import enGallery from "@/content/pages/en/gallery.json";
import enRecords from "@/content/pages/en/records.json";
import enVideos from "@/content/pages/en/videos.json";
import enStampa from "@/content/pages/en/stampa.json";
import enEvents from "@/content/pages/en/events.json";
import enWhiteCoal from "@/content/pages/en/white-coal.json";
import enWhiteCoalRecords from "@/content/pages/en/white-coal-records.json";
import enContact from "@/content/pages/en/contact.json";
import itHome from "@/content/pages/it/home.json";
import itBio from "@/content/pages/it/bio.json";
import itGallery from "@/content/pages/it/gallery.json";
import itRecords from "@/content/pages/it/records.json";
import itVideos from "@/content/pages/it/videos.json";
import itStampa from "@/content/pages/it/stampa.json";
import itEvents from "@/content/pages/it/events.json";
import itWhiteCoal from "@/content/pages/it/white-coal.json";
import itWhiteCoalRecords from "@/content/pages/it/white-coal-records.json";
import itContact from "@/content/pages/it/contact.json";
import esHome from "@/content/pages/es/home.json";
import esBio from "@/content/pages/es/bio.json";
import esGallery from "@/content/pages/es/gallery.json";
import esRecords from "@/content/pages/es/records.json";
import esVideos from "@/content/pages/es/videos.json";
import esStampa from "@/content/pages/es/stampa.json";
import esEvents from "@/content/pages/es/events.json";
import esWhiteCoal from "@/content/pages/es/white-coal.json";
import esWhiteCoalRecords from "@/content/pages/es/white-coal-records.json";
import esContact from "@/content/pages/es/contact.json";

// ---- tipi dei dati di pagina (generati da scripts/import-wix.mjs, modificabili a mano) ----
export type Rect = { x: number; y: number; w: number; h: number };

export type ParagraphStyle = {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  fontStyle?: string;
  color?: string;
  textAlign?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textDecoration?: string;
};

export type TextElement = Rect & {
  type: "text";
  id?: string;
  panel?: { bg: string; radius?: string };
  paragraphs: { tag: string; html: string; style: ParagraphStyle }[];
};
export type ImageElement = Rect & {
  type: "image";
  src: string;
  alt: string;
  href?: string;
  fit?: string;
  radius?: string;
};
export type VideoElement = Rect & { type: "video"; youtubeId: string; title: string };
export type BoxElement = Rect & {
  type: "box";
  bg: string;
  radius?: string;
  shadow?: string;
  border?: string;
  events?: boolean;
};
export type GalleryElement = Rect & {
  type: "gallery";
  images: { src: string; alt: string; width: number; height: number }[];
};
export type EventsElement = Rect & {
  type: "events";
  items: {
    date: string;
    title: string;
    titleHref?: string;
    lines: { text: string; href?: string; color: string; italic: boolean; bold: boolean }[];
  }[];
};
export type ContactFormElement = Rect & {
  type: "contactForm";
  labels: { title: string; name: string; email: string; subject: string; message: string; send: string };
};

export type PageElement =
  | TextElement
  | ImageElement
  | VideoElement
  | BoxElement
  | GalleryElement
  | EventsElement
  | ContactFormElement;

export type PageData = {
  slug: string;
  lang: Lang;
  stageHeight: number;
  background: { image: string | null; color: string };
  elements: PageElement[];
};

const PAGES = {
  en: { home: enHome, bio: enBio, gallery: enGallery, records: enRecords, videos: enVideos, stampa: enStampa, events: enEvents, "white-coal": enWhiteCoal, "white-coal-records": enWhiteCoalRecords, contact: enContact },
  it: { home: itHome, bio: itBio, gallery: itGallery, records: itRecords, videos: itVideos, stampa: itStampa, events: itEvents, "white-coal": itWhiteCoal, "white-coal-records": itWhiteCoalRecords, contact: itContact },
  es: { home: esHome, bio: esBio, gallery: esGallery, records: esRecords, videos: esVideos, stampa: esStampa, events: esEvents, "white-coal": esWhiteCoal, "white-coal-records": esWhiteCoalRecords, contact: esContact },
} as unknown as Record<Lang, Record<string, PageData>>;

export const SLUGS = Object.keys(PAGES.en);
/** Pagine raggiungibili ma non nel menu (come su Wix). */
export const SUBPAGE_SLUGS = SLUGS.filter((s) => s !== "home");

export function getPage(lang: Lang, slug: string): PageData | undefined {
  return PAGES[lang][slug];
}

type SiteData = {
  nav: Record<Lang, { label: string; slug: string }[]>;
  pages: Record<string, Record<Lang, { title: string; description: string | null }>>;
};
export const SITE = site as unknown as SiteData;

export function getNav(lang: Lang) {
  return SITE.nav[lang];
}

export function getMeta(lang: Lang, slug: string) {
  return SITE.pages[slug]?.[lang] ?? SITE.pages[slug]?.en;
}

export const SOCIAL = [
  { name: "Facebook", href: "https://www.facebook.com/andreagamurrini/", icon: "facebook" },
  { name: "Instagram", href: "https://www.instagram.com/andreagamurrini/", icon: "instagram" },
  { name: "YouTube", href: "https://www.youtube.com/@dr.gamOfficial", icon: "youtube" },
  { name: "Spotify", href: "https://open.spotify.com/artist/1EZPrWGWoRqehCUeV2UsvJ", icon: "spotify" },
  { name: "TikTok", href: "https://www.tiktok.com/@andreagamurrini", icon: "tiktok" },
  { name: "X", href: "https://twitter.com/AndreaGamurrini", icon: "x" },
  { name: "Amazon", href: "https://www.amazon.it/Another-Family-Dr-Gam/dp/B01M5G20N8", icon: "amazon" },
  { name: "Apple Music", href: "https://music.apple.com/es/artist/dr-gam/1134439613", icon: "applemusic" },
] as const;
