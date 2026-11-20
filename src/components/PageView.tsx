import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMeta, getPage } from "@/lib/content";
import { LANGS, LANG_INFO, pagePath, type Lang } from "@/lib/i18n";
import { Stage } from "./Stage";

export function PageView({ lang, slug }: { lang: Lang; slug: string }) {
  const page = getPage(lang, slug);
  if (!page) notFound();
  const bg = page.background;

  return (
    <>
      {/* sfondo fisso a tutto schermo, come lo sfondo pagina di Wix */}
      <div className="page-bg" style={{ backgroundColor: bg.color }} aria-hidden="true">
        {bg.image && (
          // eslint-disable-next-line @next/next/no-img-element -- immagine già ottimizzata
          <img src={bg.image} alt="" fetchPriority="high" decoding="async" />
        )}
      </div>
      <main id="main" className={`page page-${slug}`}>
        <Stage page={page} />
      </main>
    </>
  );
}

export function pageMetadata(lang: Lang, slug: string): Metadata {
  const meta = getMeta(lang, slug);
  const page = getPage(lang, slug);
  const languages = Object.fromEntries(LANGS.map((l) => [LANG_INFO[l].locale.replace("_", "-"), pagePath(l, slug)]));
  return {
    title: meta?.title ?? "dr.gam",
    description: meta?.description ?? undefined,
    alternates: {
      canonical: pagePath(lang, slug),
      languages: { ...languages, "x-default": pagePath("en", slug) },
    },
    openGraph: {
      title: meta?.title ?? "dr.gam",
      description: meta?.description ?? undefined,
      url: pagePath(lang, slug),
      siteName: "dr.gam",
      locale: LANG_INFO[lang].locale,
      type: "website",
      images: page?.background.image ? [{ url: page.background.image }] : undefined,
    },
  };
}
