export const LANGS = ["en", "it", "es"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

export const LANG_INFO: Record<
  Lang,
  { name: string; locale: string; flag: string }
> = {
  en: { name: "English", locale: "en_GB", flag: "gb" },
  it: { name: "Italiano", locale: "it_IT", flag: "it" },
  es: { name: "Español", locale: "es_ES", flag: "es" },
};

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

/** URL pubblico di una pagina: l'inglese sta alla radice, le altre lingue sotto /it e /es (come su Wix). */
export function pagePath(lang: Lang, slug: string): string {
  const prefix = lang === DEFAULT_LANG ? "" : `/${lang}`;
  if (slug === "home") return prefix || "/";
  return `${prefix}/${slug}`;
}

/** Dominio canonico: per cambiarlo basta la variabile NEXT_PUBLIC_SITE_URL al build. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.andreagamurrini.com";
