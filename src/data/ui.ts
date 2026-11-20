import { pagePath, type Lang } from "@/lib/i18n";

/** Pagine del sito: slug (uguale a Wix, per non perdere i link) → etichetta nel menu. */
export const NAV_SLUGS = ["records", "videos", "bio", "gallery", "stampa", "white-coal", "contact"] as const;
export type PageSlug = "home" | (typeof NAV_SLUGS)[number] | "events";

/** Musica, video, galleria e stampa sono sezioni della home (ancore); le altre voci sono pagine. */
export const SECTION_ANCHORS: Partial<Record<(typeof NAV_SLUGS)[number], string>> = {
  records: "music",
  videos: "videos",
  gallery: "gallery",
  stampa: "press",
};

export function navHref(lang: Lang, slug: (typeof NAV_SLUGS)[number] | "home" | "events") {
  const anchor = SECTION_ANCHORS[slug as (typeof NAV_SLUGS)[number]];
  return anchor ? `${pagePath(lang, "home")}#${anchor}` : pagePath(lang, slug);
}

type Dict = {
  heads: Record<"records" | "videos" | "gallery" | "stampa" | "events" | "white-coal", { soft: string; hard: string }>;
  nav: Record<(typeof NAV_SLUGS)[number] | "events" | "home", string>;
  meta: Record<PageSlug, { title: string; description: string }>;
  role: string;
  motto: string;
  outNow: string;
  liveInRome: { kicker: string; desc: string; listen: string; watch: string };
  genres: string[];
  facts: { n: string; label: string }[];
  latestVideos: string;
  allVideos: string;
  storyKicker: string;
  storyCta: string;
  pressKicker: string;
  pressCta: string;
  contactCta: string;
  contactLead: string;
  music: { title: string; album: string; single: string; albums: string; singles: string; physical: string; soldOut: string; listen: string; quotes: string };
  videos: { title: string; lead: string; play: string };
  gallery: { title: string; lead: string; open: string };
  press: { title: string; lead: string; clippings: string };
  story: { title: string; wikipedia: string };
  archive: { title: string; lead: string; live: string; radio: string; release: string };
  studio: { title: string; productions: string; records: string; partners: string; lead: string };
  contact: { title: string; lead: string; elsewhere: string };
  more: string;
  less: string;
  menu: string;
  close: string;
  language: string;
  skip: string;
  sending: string;
  sent: string;
  error: string;
  required: string;
  invalidEmail: string;
  play: string;
  galleryClose: string;
  galleryPrev: string;
  galleryNext: string;
  notFound: { title: string; lead: string; back: string };
  rights: string;
};

export const UI: Record<Lang, Dict> = {
  en: {
    heads: { records: { soft: "All the", hard: "music" }, videos: { soft: "On", hard: "screen" }, gallery: { soft: "Through the", hard: "lens" }, stampa: { soft: "In the", hard: "press" }, events: { soft: "On the", hard: "road" }, "white-coal": { soft: "White", hard: "Coal" } },
    nav: { home: "Home", records: "Music", videos: "Videos", bio: "Story", gallery: "Gallery", stampa: "Press", "white-coal": "White Coal", contact: "Contact", events: "Live archive" },
    meta: {
      home: { title: "dr.gam | official website", description: "dr.gam (Andrea Gamurrini): singer-songwriter, multi-instrumentalist and producer. Reggae, jazz and grunge in one sound. New live album “Live in Rome” out now." },
      records: { title: "Music | dr.gam", description: "Albums, singles and physical editions by dr.gam, from “Another Family” to “Live in Rome”." },
      videos: { title: "Videos | dr.gam", description: "Music videos, live sessions and interviews with dr.gam." },
      bio: { title: "Story | dr.gam", description: "Alchemy is everything, my friend. The story of Andrea Gamurrini, aka dr.gam." },
      gallery: { title: "Gallery | dr.gam", description: "Photos of dr.gam on stage and in the studio." },
      stampa: { title: "Press | dr.gam", description: "Reviews, interviews and TV, radio and press coverage of dr.gam." },
      events: { title: "Live archive | dr.gam", description: "Concerts, radio appearances and releases of dr.gam, 2016-2019." },
      "white-coal": { title: "White Coal | dr.gam", description: "White Coal Productions and White Coal Records: dr.gam's audio/video studio and label in Fuerteventura." },
      contact: { title: "Contact | dr.gam", description: "Write to dr.gam for concerts, collaborations and press." },
    },
    role: "Singer-songwriter, multi-instrumentalist, producer",
    motto: "Alchemy is everything, my friend",
    outNow: "Out now",
    liveInRome: { kicker: "Live album & concert film", desc: "Recorded in Rome on the 2025 summer tour with the new band. Fourteen tracks: older songs and new material, played as one.", listen: "Listen on Spotify", watch: "Watch the session" },
    genres: ["Reggae", "Jazz", "Grunge", "Soul", "Funk", "Blues", "Rock"],
    facts: [
      { n: "≈2000", label: "concerts across Italy, Europe and America" },
      { n: "≈500k", label: "YouTube views for “Kilimangiaro”" },
      { n: "4", label: "languages he sings in: Italian, English, Spanish, French" },
    ],
    latestVideos: "Latest videos",
    allVideos: "All videos",
    storyKicker: "The story",
    storyCta: "Read the whole story",
    pressKicker: "They wrote about it",
    pressCta: "All press",
    contactCta: "Write to dr.gam",
    contactLead: "Concerts, collaborations, press.",
    music: { title: "Music", album: "Album", single: "Single", albums: "Albums", singles: "Singles", physical: "Physical editions", soldOut: "Sold out", listen: "Listen", quotes: "What they say" },
    videos: { title: "Videos", lead: "Music videos, live sessions, radio and TV.", play: "Play" },
    gallery: { title: "Gallery", lead: "On stage, in the studio, on the road.", open: "Open photo" },
    press: { title: "Press", lead: "Newspapers, TV and radio that covered dr.gam. Each logo opens the article.", clippings: "Clipping" },
    story: { title: "Story", wikipedia: "Full biography on Wikipedia" },
    archive: { title: "Live archive", lead: "Concerts, radio guest spots and releases, 2016-2019.", live: "Live", radio: "Radio & press", release: "Release" },
    studio: { title: "White Coal", productions: "Productions", records: "Records", partners: "Worked with", lead: "The studio and label behind every dr.gam record, based in Fuerteventura." },
    contact: { title: "Contact", lead: "For concerts, collaborations and press. Every message is read.", elsewhere: "Or find him here" },
    more: "Others",
    less: "Show less",
    menu: "Menu",
    close: "Close",
    language: "Language",
    skip: "Skip to content",
    sending: "Sending…",
    sent: "Thank you. Your message has been sent.",
    error: "The message could not be sent. Please try again, or write on social media.",
    required: "Please fill in your name and email.",
    invalidEmail: "That email address doesn't look right.",
    play: "Play video",
    galleryClose: "Close",
    galleryPrev: "Previous photo",
    galleryNext: "Next photo",
    notFound: { title: "Lost track", lead: "This page doesn't exist, or it has moved.", back: "Back home" },
    rights: "Website by White Coal Productions",
  },
  it: {
    heads: { records: { soft: "Tutta la", hard: "musica" }, videos: { soft: "Sullo", hard: "schermo" }, gallery: { soft: "Dietro", hard: "l'obiettivo" }, stampa: { soft: "Sulla", hard: "stampa" }, events: { soft: "In", hard: "viaggio" }, "white-coal": { soft: "White", hard: "Coal" } },
    nav: { home: "Home", records: "Musica", videos: "Video", bio: "Storia", gallery: "Galleria", stampa: "Stampa", "white-coal": "White Coal", contact: "Contatti", events: "Archivio live" },
    meta: {
      home: { title: "dr.gam | sito ufficiale", description: "dr.gam (Andrea Gamurrini): cantautore, polistrumentista e produttore. Reggae, jazz e grunge in un unico suono. Il nuovo album live “Live in Rome” è uscito." },
      records: { title: "Musica | dr.gam", description: "Album, singoli ed edizioni fisiche di dr.gam, da “Another Family” a “Live in Rome”." },
      videos: { title: "Video | dr.gam", description: "Videoclip, sessioni live e interviste di dr.gam." },
      bio: { title: "Storia | dr.gam", description: "L'alchimia è tutto, amico mio. La storia di Andrea Gamurrini, in arte dr.gam." },
      gallery: { title: "Galleria | dr.gam", description: "Foto di dr.gam sul palco e in studio." },
      stampa: { title: "Stampa | dr.gam", description: "Recensioni, interviste e servizi TV, radio e stampa su dr.gam." },
      events: { title: "Archivio live | dr.gam", description: "Concerti, ospitate radio e uscite di dr.gam, 2016-2019." },
      "white-coal": { title: "White Coal | dr.gam", description: "White Coal Productions e White Coal Records: lo studio audio/video e l'etichetta di dr.gam a Fuerteventura." },
      contact: { title: "Contatti | dr.gam", description: "Scrivi a dr.gam per concerti, collaborazioni e stampa." },
    },
    role: "Cantautore, polistrumentista, produttore",
    motto: "L'alchimia è tutto, amico mio",
    outNow: "Ora disponibile",
    liveInRome: { kicker: "Album live e film concerto", desc: "Registrato a Roma durante il tour estivo 2025 con la nuova band. Quattordici brani: canzoni di ieri e materiale nuovo, suonati come una cosa sola.", listen: "Ascolta su Spotify", watch: "Guarda la session" },
    genres: ["Reggae", "Jazz", "Grunge", "Soul", "Funk", "Blues", "Rock"],
    facts: [
      { n: "≈2000", label: "concerti tra Italia, Europa e America" },
      { n: "≈500k", label: "visualizzazioni su YouTube per “Kilimangiaro”" },
      { n: "4", label: "lingue in cui canta: italiano, inglese, spagnolo, francese" },
    ],
    latestVideos: "Ultimi video",
    allVideos: "Tutti i video",
    storyKicker: "La storia",
    storyCta: "Leggi tutta la storia",
    pressKicker: "Hanno scritto di lui",
    pressCta: "Tutta la stampa",
    contactCta: "Scrivi a dr.gam",
    contactLead: "Concerti, collaborazioni, stampa.",
    music: { title: "Musica", album: "Album", single: "Singolo", albums: "Album", singles: "Singoli", physical: "Edizioni fisiche", soldOut: "Esaurito", listen: "Ascolta", quotes: "Cosa dicono" },
    videos: { title: "Video", lead: "Videoclip, sessioni live, radio e TV.", play: "Riproduci" },
    gallery: { title: "Galleria", lead: "Sul palco, in studio, in viaggio.", open: "Apri la foto" },
    press: { title: "Stampa", lead: "Giornali, TV e radio che hanno parlato di dr.gam. Ogni logo apre l'articolo.", clippings: "Ritaglio" },
    story: { title: "Storia", wikipedia: "Biografia completa su Wikipedia" },
    archive: { title: "Archivio live", lead: "Concerti, ospitate radio e uscite, 2016-2019.", live: "Live", radio: "Radio e stampa", release: "Uscita" },
    studio: { title: "White Coal", productions: "Productions", records: "Records", partners: "Ha lavorato con", lead: "Lo studio e l'etichetta dietro ogni disco di dr.gam, con base a Fuerteventura." },
    contact: { title: "Contatti", lead: "Per concerti, collaborazioni e stampa. Ogni messaggio viene letto.", elsewhere: "Oppure trovalo qui" },
    more: "Altri",
    less: "Mostra meno",
    menu: "Menu",
    close: "Chiudi",
    language: "Lingua",
    skip: "Vai al contenuto",
    sending: "Invio in corso…",
    sent: "Grazie. Il messaggio è stato inviato.",
    error: "Non è stato possibile inviare il messaggio. Riprova, oppure scrivi sui social.",
    required: "Inserisci nome ed email.",
    invalidEmail: "L'indirizzo email non sembra corretto.",
    play: "Riproduci il video",
    galleryClose: "Chiudi",
    galleryPrev: "Foto precedente",
    galleryNext: "Foto successiva",
    notFound: { title: "Traccia persa", lead: "Questa pagina non esiste, o è stata spostata.", back: "Torna alla home" },
    rights: "Sito di White Coal Productions",
  },
  es: {
    heads: { records: { soft: "Toda la", hard: "música" }, videos: { soft: "En", hard: "pantalla" }, gallery: { soft: "A través del", hard: "objetivo" }, stampa: { soft: "En la", hard: "prensa" }, events: { soft: "En la", hard: "carretera" }, "white-coal": { soft: "White", hard: "Coal" } },
    nav: { home: "Inicio", records: "Música", videos: "Vídeos", bio: "Historia", gallery: "Galería", stampa: "Prensa", "white-coal": "White Coal", contact: "Contacto", events: "Archivo en vivo" },
    meta: {
      home: { title: "dr.gam | web oficial", description: "dr.gam (Andrea Gamurrini): cantautor, multiinstrumentista y productor. Reggae, jazz y grunge en un solo sonido. Ya disponible el nuevo álbum en directo “Live in Rome”." },
      records: { title: "Música | dr.gam", description: "Álbumes, singles y ediciones físicas de dr.gam, de “Another Family” a “Live in Rome”." },
      videos: { title: "Vídeos | dr.gam", description: "Videoclips, sesiones en directo y entrevistas de dr.gam." },
      bio: { title: "Historia | dr.gam", description: "La alquimia lo es todo, amigo mío. La historia de Andrea Gamurrini, alias dr.gam." },
      gallery: { title: "Galería | dr.gam", description: "Fotos de dr.gam en el escenario y en el estudio." },
      stampa: { title: "Prensa | dr.gam", description: "Reseñas, entrevistas y apariciones en TV, radio y prensa de dr.gam." },
      events: { title: "Archivo en vivo | dr.gam", description: "Conciertos, apariciones en radio y lanzamientos de dr.gam, 2016-2019." },
      "white-coal": { title: "White Coal | dr.gam", description: "White Coal Productions y White Coal Records: el estudio audiovisual y el sello de dr.gam en Fuerteventura." },
      contact: { title: "Contacto | dr.gam", description: "Escribe a dr.gam para conciertos, colaboraciones y prensa." },
    },
    role: "Cantautor, multiinstrumentista, productor",
    motto: "La alquimia lo es todo, amigo mío",
    outNow: "Ya disponible",
    liveInRome: { kicker: "Álbum en directo y película concierto", desc: "Grabado en Roma durante la gira de verano de 2025 con la nueva banda. Catorce temas: canciones de antes y material nuevo, tocados como una sola cosa.", listen: "Escuchar en Spotify", watch: "Ver la sesión" },
    genres: ["Reggae", "Jazz", "Grunge", "Soul", "Funk", "Blues", "Rock"],
    facts: [
      { n: "≈2000", label: "conciertos entre Italia, Europa y América" },
      { n: "≈500k", label: "visualizaciones en YouTube de “Kilimangiaro”" },
      { n: "4", label: "idiomas en los que canta: italiano, inglés, español, francés" },
    ],
    latestVideos: "Últimos vídeos",
    allVideos: "Todos los vídeos",
    storyKicker: "La historia",
    storyCta: "Leer toda la historia",
    pressKicker: "Escribieron sobre él",
    pressCta: "Toda la prensa",
    contactCta: "Escribe a dr.gam",
    contactLead: "Conciertos, colaboraciones, prensa.",
    music: { title: "Música", album: "Álbum", single: "Single", albums: "Álbumes", singles: "Singles", physical: "Ediciones físicas", soldOut: "Agotado", listen: "Escuchar", quotes: "Lo que dicen" },
    videos: { title: "Vídeos", lead: "Videoclips, sesiones en directo, radio y TV.", play: "Reproducir" },
    gallery: { title: "Galería", lead: "En el escenario, en el estudio, de viaje.", open: "Abrir la foto" },
    press: { title: "Prensa", lead: "Periódicos, TV y radio que hablaron de dr.gam. Cada logo abre el artículo.", clippings: "Recorte" },
    story: { title: "Historia", wikipedia: "Biografía completa en Wikipedia" },
    archive: { title: "Archivo en vivo", lead: "Conciertos, apariciones en radio y lanzamientos, 2016-2019.", live: "En vivo", radio: "Radio y prensa", release: "Lanzamiento" },
    studio: { title: "White Coal", productions: "Productions", records: "Records", partners: "Ha trabajado con", lead: "El estudio y el sello detrás de cada disco de dr.gam, con sede en Fuerteventura." },
    contact: { title: "Contacto", lead: "Para conciertos, colaboraciones y prensa. Se leen todos los mensajes.", elsewhere: "O encuéntralo aquí" },
    more: "Otros",
    less: "Mostrar menos",
    menu: "Menú",
    close: "Cerrar",
    language: "Idioma",
    skip: "Ir al contenido",
    sending: "Enviando…",
    sent: "Gracias. Tu mensaje se ha enviado.",
    error: "No se pudo enviar el mensaje. Inténtalo de nuevo o escribe en redes sociales.",
    required: "Escribe tu nombre y tu correo.",
    invalidEmail: "El correo no parece correcto.",
    play: "Reproducir vídeo",
    galleryClose: "Cerrar",
    galleryPrev: "Foto anterior",
    galleryNext: "Foto siguiente",
    notFound: { title: "Pista perdida", lead: "Esta página no existe o se ha movido.", back: "Volver al inicio" },
    rights: "Web de White Coal Productions",
  },
};

export const PARTNERS = [
  { name: "Universal Music Group", href: "http://www.universalmusic.it/pop/" },
  { name: "Sony Music", href: "https://www.sonymusic.it/" },
  { name: "AWAL", href: "https://www.awal.com/" },
  { name: "The Orchard", href: "https://www.theorchard.com/" },
  { name: "Believe", href: "https://www.believe.com/" },
  { name: "ASCAP", href: "https://www.ascap.com" },
  { name: "SIAE", href: "https://www.siae.it/" },
  { name: "Saifam", href: "http://saifam.com/" },
  { name: "Lungomare" },
  { name: "Jois" },
  { name: "Applauso US" },
  { name: "Imago" },
  { name: "Studio Rocca Romana", href: "http://www.studioroccaromana.it/" },
  { name: "MEI - Meeting degli Indipendenti", href: "https://meiweb.it/" },
  { name: "AudioCoop", href: "https://www.facebook.com/audiocoopmei/" },
  { name: "Elite Music", href: "https://www.elitemusic.it/" },
  { name: "Astralmusic", href: "http://www.astralmusic.it/" },
  { name: "L'altoparlante", href: "https://www.laltoparlante.it/" },
  { name: "Tunefit", href: "http://www.tune-fit.com/" },
  { name: "Parole & Dintorni", href: "http://www.paroleedintorni.it/" },
  { name: "La Vali Photographer", href: "https://www.instagram.com/la_vali_ph/" },
];
