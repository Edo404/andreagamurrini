import type { Metadata } from "next";
import { LANGS, LANG_INFO, pagePath, type Lang } from "./i18n";
import { UI, type PageSlug } from "@/data/ui";
import { PHOTOS } from "@/data/catalog";

export const PAGE_SLUGS: PageSlug[] = ["home", "records", "videos", "bio", "gallery", "stampa", "events", "white-coal", "contact"];
export const SUBPAGE_SLUGS = PAGE_SLUGS.filter((s) => s !== "home");

export function isPageSlug(s: string): s is PageSlug {
  return (PAGE_SLUGS as string[]).includes(s);
}

export function pageMetadata(lang: Lang, slug: PageSlug): Metadata {
  const m = UI[lang].meta[slug];
  const languages = Object.fromEntries(LANGS.map((l) => [LANG_INFO[l].locale.replace("_", "-"), pagePath(l, slug)]));
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: pagePath(lang, slug), languages: { ...languages, "x-default": pagePath("en", slug) } },
    openGraph: {
      title: m.title,
      description: m.description,
      url: pagePath(lang, slug),
      siteName: "dr.gam",
      locale: LANG_INFO[lang].locale,
      type: slug === "home" ? "profile" : "website",
      images: [{ url: PHOTOS.portrait.src, width: PHOTOS.portrait.w, height: PHOTOS.portrait.h, alt: "dr.gam" }],
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: [PHOTOS.portrait.src] },
  };
}
