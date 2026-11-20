export const LANGS = ["en", "it", "es"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

export const LANG_INFO: Record<Lang, { name: string; locale: string; flag: string }> = {
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

export const SITE_URL = "https://www.andreagamurrini.com";

/** Testi dell'interfaccia non presenti nelle pagine Wix. */
export const UI: Record<Lang, Record<string, string>> = {
  en: {
    menu: "Menu",
    close: "Close",
    language: "Language",
    sending: "Sending…",
    sent: "Thanks for submitting!",
    error: "Something went wrong. Please try again or write on social media.",
    required: "Please fill in the required fields.",
    invalidEmail: "Please enter a valid email address.",
    skip: "Skip to Main Content",
    play: "Play video",
    galleryClose: "Close gallery",
    galleryPrev: "Previous image",
    galleryNext: "Next image",
  },
  it: {
    menu: "Menu",
    close: "Chiudi",
    language: "Lingua",
    sending: "Invio in corso…",
    sent: "Grazie, messaggio inviato!",
    error: "Si è verificato un errore. Riprova o scrivi sui social.",
    required: "Compila i campi obbligatori.",
    invalidEmail: "Inserisci un indirizzo email valido.",
    skip: "Vai al contenuto principale",
    play: "Riproduci il video",
    galleryClose: "Chiudi la galleria",
    galleryPrev: "Immagine precedente",
    galleryNext: "Immagine successiva",
  },
  es: {
    menu: "Menú",
    close: "Cerrar",
    language: "Idioma",
    sending: "Enviando…",
    sent: "¡Gracias por tu mensaje!",
    error: "Algo salió mal. Inténtalo de nuevo o escribe en redes sociales.",
    required: "Rellena los campos obligatorios.",
    invalidEmail: "Introduce un correo electrónico válido.",
    skip: "Ir al contenido principal",
    play: "Reproducir vídeo",
    galleryClose: "Cerrar galería",
    galleryPrev: "Imagen anterior",
    galleryNext: "Imagen siguiente",
  },
};
