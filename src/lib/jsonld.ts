import { SITE_URL, pagePath, type Lang } from "./i18n";
import { LISTEN, PHOTOS, RELEASES, SOCIAL, WIKIPEDIA } from "@/data/catalog";
import { UI } from "@/data/ui";

/**
 * Dati strutturati schema.org (un solo grafo per pagina): sito, artista, persona e uscite.
 * Solo fatti già presenti nei dati del sito; i profili ufficiali vanno in sameAs.
 */
export function artistGraph(lang: Lang) {
  const t = UI[lang];
  const artist = `${SITE_URL}/#artist`;
  const person = `${SITE_URL}/#person`;
  const sameAs = [
    ...new Set(
      [...SOCIAL, ...LISTEN]
        .map((s) => s.href)
        .filter((h) => !h.includes("amazon.")),
    ),
    WIKIPEDIA,
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL + pagePath(lang, "home"),
        name: "dr.gam",
        inLanguage: lang,
        publisher: { "@id": artist },
      },
      {
        "@type": "MusicGroup",
        "@id": artist,
        name: "dr.gam",
        alternateName: "Andrea Gamurrini",
        url: SITE_URL + pagePath(lang, "home"),
        image: SITE_URL + PHOTOS.portrait.src,
        logo: `${SITE_URL}/media/logo.webp`,
        description: t.meta.home.description,
        genre: ["Rock", "Pop", "Funk"],
        slogan: t.motto,
        sameAs,
        member: { "@id": person },
        album: RELEASES.filter((r) => r.kind !== "cd").map((r) => ({
          "@type": "MusicAlbum",
          name: r.title,
          albumReleaseType:
            r.kind === "album"
              ? "https://schema.org/AlbumRelease"
              : "https://schema.org/SingleRelease",
          ...(r.year && { datePublished: String(r.year) }),
          ...(r.href && { url: r.href }),
          image: SITE_URL + r.cover,
          byArtist: { "@id": artist },
        })),
      },
      {
        "@type": "Person",
        "@id": person,
        name: "Andrea Gamurrini",
        alternateName: "dr.gam",
        jobTitle: t.role,
        image: SITE_URL + PHOTOS.portrait.src,
        sameAs: [WIKIPEDIA, SOCIAL[0].href],
      },
    ],
  };
}
