import type { Metadata } from "next";
import { LANGS, LANG_INFO, pagePath, type Lang } from "./i18n";
import { UI, type PageSlug } from "@/data/ui";
import { PHOTOS } from "@/data/catalog";

// Musica, video, galleria e stampa sono sezioni della home (vedi i redirect in next.config.ts)
export const PAGE_SLUGS: PageSlug[] = ["home", "bio", "events"];
export const SUBPAGE_SLUGS = PAGE_SLUGS.filter((s) => s !== "home");

export function isPageSlug(s: string): s is PageSlug {
  return (PAGE_SLUGS as string[]).includes(s);
}

export function pageMetadata(lang: Lang, slug: PageSlug): Metadata {
  const m = UI[lang].meta[slug];
  // i contenuti sono per lingua, non per paese: hreflang en / it / es
  const languages = Object.fromEntries(
    LANGS.map((l) => [l, pagePath(l, slug)]),
  );
  const imageAlt = "dr.gam (Andrea Gamurrini)";
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: pagePath(lang, slug),
      languages: { ...languages, "x-default": pagePath("en", slug) },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: pagePath(lang, slug),
      siteName: "dr.gam",
      locale: LANG_INFO[lang].locale,
      type: slug === "home" ? "profile" : "website",
      images: [
        {
          url: PHOTOS.portrait.src,
          width: PHOTOS.portrait.w,
          height: PHOTOS.portrait.h,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@AndreaGamurrini",
      creator: "@AndreaGamurrini",
      title: m.title,
      description: m.description,
      images: [{ url: PHOTOS.portrait.src, alt: imageAlt }],
    },
  };
}
