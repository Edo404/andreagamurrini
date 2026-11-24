import type { MetadataRoute } from "next";
import { PAGE_SLUGS as SLUGS } from "@/lib/meta";
import { LANGS, SITE_URL, pagePath } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return SLUGS.flatMap((slug) =>
    LANGS.map((lang) => ({
      url: SITE_URL + pagePath(lang, slug),
      changeFrequency: "monthly" as const,
      priority: slug === "home" ? 1 : 0.7,
      alternates: {
        languages: {
          ...Object.fromEntries(
            LANGS.map((l) => [l, SITE_URL + pagePath(l, slug)]),
          ),
          "x-default": SITE_URL + pagePath("en", slug),
        },
      },
    })),
  );
}
