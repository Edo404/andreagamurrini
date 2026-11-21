import { pagePath, type Lang } from "@/lib/i18n";

/** Pagine del sito: slug (uguale a Wix, per non perdere i link) → etichetta nel menu. */
export const NAV_SLUGS = [
  "records",
  "videos",
  "bio",
  "gallery",
  "stampa",
  "white-coal",
  "contact",
] as const;
/** Le uniche pagine vere del sito: musica, video, galleria e stampa sono sezioni della home. */
export type PageSlug = "home" | "bio" | "events" | "white-coal" | "contact";

/** Musica, video, galleria e stampa sono sezioni della home (ancore); le altre voci sono pagine. */
export const SECTION_ANCHORS: Partial<
  Record<(typeof NAV_SLUGS)[number], string>
> = {
  records: "music",
  videos: "videos",
  gallery: "gallery",
  stampa: "press",
};

export function navHref(
  lang: Lang,
  slug: (typeof NAV_SLUGS)[number] | "home" | "events",
) {
  const anchor = SECTION_ANCHORS[slug as (typeof NAV_SLUGS)[number]];
  return anchor ? `${pagePath(lang, "home")}#${anchor}` : pagePath(lang, slug);
}

type Dict = {
  heads: Record<
    "records" | "videos" | "gallery" | "stampa" | "events" | "white-coal",
    { soft: string; hard: string }
  >;
  nav: Record<(typeof NAV_SLUGS)[number] | "events" | "home", string>;
  meta: Record<PageSlug, { title: string; description: string }>;
  role: string;
  motto: string;
  outNow: string;
  liveInRome: { kicker: string; desc: string; listen: string; watch: string };
  facts: { n: string; label: string }[];
  storyCta: string;
  contactCta: string;
  contactLead: string;
  music: { album: string; single: string; soldOut: string; quotes: string };
  gallery: { title: string; open: string };
  press: { clippings: string };
  story: { title: string; wikipedia: string };
  archive: {
    title: string;
    lead: string;
    live: string;
    radio: string;
    release: string;
  };
  studio: {
    title: string;
    productions: string;
    records: string;
    partners: string;
    lead: string;
  };
  contact: { title: string; lead: string; elsewhere: string };
  alt: { rocks: string; leaves: string; live: string; ivy: string };
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
    heads: {
      records: { soft: "All the", hard: "music" },
      videos: { soft: "On", hard: "screen" },
      gallery: { soft: "Through the", hard: "lens" },
      stampa: { soft: "In the", hard: "press" },
      events: { soft: "On the", hard: "road" },
      "white-coal": { soft: "White", hard: "Coal" },
    },
    nav: {
      home: "Home",
      records: "Music",
      videos: "Videos",
      bio: "Story",
      gallery: "Gallery",
      stampa: "Press",
      "white-coal": "White Coal",
      contact: "Contact",
      events: "Live archive",
    },
    meta: {
      home: {
        title: "dr.gam | official website",
        description:
          "dr.gam (Andrea Gamurrini): singer-songwriter, multi-instrumentalist and producer. Reggae, jazz and grunge in one sound. New live album “Live in Rome” out now.",
      },
      bio: {
        title: "Story | dr.gam",
        description:
          "Alchemy is everything, my friend. The story of Andrea Gamurrini, aka dr.gam.",
      },
      events: {
        title: "Live archive | dr.gam",
        description:
          "Concerts, radio appearances and releases of dr.gam, 2016-2019.",
      },
      "white-coal": {
        title: "White Coal | dr.gam",
        description:
          "White Coal Productions and White Coal Records: dr.gam's audio/video studio and label in Fuerteventura.",
      },
      contact: {
        title: "Contact | dr.gam",
        description: "Write to dr.gam for concerts, collaborations and press.",
      },
    },
    role: "Singer-songwriter, multi-instrumentalist, producer",
    motto: "Alchemy is everything, my friend",
    outNow: "Out now",
    liveInRome: {
      kicker: "Live album & concert film",
      desc: "Recorded in Rome on the 2025 summer tour with the new band. Fourteen tracks: older songs and new material, played as one.",
      listen: "Listen on Spotify",
      watch: "Watch the session",
    },
    facts: [
      { n: "Nearly 2,000", label: "concerts across Italy, Europe and America" },
      { n: "Almost 500,000", label: "YouTube views for “Kilimangiaro”" },
      {
        n: "Four",
        label: "languages he sings in: Italian, English, Spanish, French",
      },
    ],
    storyCta: "Read the whole story",
    contactCta: "Write to dr.gam",
    contactLead: "Concerts, collaborations, press.",
    music: {
      album: "Album",
      single: "Single",
      soldOut: "Sold out",
      quotes: "What they say",
    },
    gallery: { title: "Gallery", open: "Open photo" },
    press: { clippings: "Clipping" },
    story: { title: "Story", wikipedia: "Full biography on Wikipedia" },
    archive: {
      title: "Live archive",
      lead: "Concerts, radio guest spots and releases, 2016-2019.",
      live: "Live",
      radio: "Radio & press",
      release: "Release",
    },
    studio: {
      title: "White Coal",
      productions: "Productions",
      records: "Records",
      partners: "Worked with",
      lead: "The studio and label behind every dr.gam record, based in Fuerteventura.",
    },
    contact: {
      title: "Contact",
      lead: "For concerts, collaborations and press. Every message is read.",
      elsewhere: "Or find him here",
    },
    alt: {
      rocks:
        "dr.gam dressed in white with his guitar among the rocks of Fuerteventura",
      leaves: "dr.gam sitting among blue leaves",
      live: "dr.gam singing live with an acoustic guitar",
      ivy: "dr.gam sitting in front of an ivy wall",
    },
    more: "Others",
    less: "Show less",
    menu: "Menu",
    close: "Close",
    language: "Language",
    skip: "Skip to content",
    sending: "Sending…",
    sent: "Thank you. Your message has been sent.",
    error:
      "The message could not be sent. Please try again, or write on social media.",
    required: "Please fill in your name and email.",
    invalidEmail: "That email address doesn't look right.",
    play: "Play video",
    galleryClose: "Close",
    galleryPrev: "Previous photo",
    galleryNext: "Next photo",
    notFound: {
      title: "Lost track",
      lead: "This page doesn't exist, or it has moved.",
      back: "Back home",
    },
    rights: "Website by White Coal Productions",
  },
  it: {
    heads: {
      records: { soft: "Tutta la", hard: "musica" },
      videos: { soft: "Sullo", hard: "schermo" },
      gallery: { soft: "Dietro", hard: "l'obiettivo" },
      stampa: { soft: "Sulla", hard: "stampa" },
      events: { soft: "In", hard: "viaggio" },
      "white-coal": { soft: "White", hard: "Coal" },
    },
    nav: {
      home: "Home",
      records: "Musica",
      videos: "Video",
      bio: "Storia",
      gallery: "Galleria",
      stampa: "Stampa",
      "white-coal": "White Coal",
      contact: "Contatti",
      events: "Archivio live",
    },
    meta: {
      home: {
        title: "dr.gam | sito ufficiale",
        description:
          "dr.gam (Andrea Gamurrini): cantautore, polistrumentista e produttore. Reggae, jazz e grunge in un unico suono. Il nuovo album live “Live in Rome” è uscito.",
      },
      bio: {
        title: "Storia | dr.gam",
        description:
          "L'alchimia è tutto, amico mio. La storia di Andrea Gamurrini, in arte dr.gam.",
      },
      events: {
        title: "Archivio live | dr.gam",
        description: "Concerti, ospitate radio e uscite di dr.gam, 2016-2019.",
      },
      "white-coal": {
        title: "White Coal | dr.gam",
        description:
          "White Coal Productions e White Coal Records: lo studio audio/video e l'etichetta di dr.gam a Fuerteventura.",
      },
      contact: {
        title: "Contatti | dr.gam",
        description: "Scrivi a dr.gam per concerti, collaborazioni e stampa.",
      },
    },
    role: "Cantautore, polistrumentista, produttore",
    motto: "L'alchimia è tutto, amico mio",
    outNow: "Ora disponibile",
    liveInRome: {
      kicker: "Album live e film concerto",
      desc: "Registrato a Roma durante il tour estivo 2025 con la nuova band. Quattordici brani: canzoni di ieri e materiale nuovo, suonati come una cosa sola.",
      listen: "Ascolta su Spotify",
      watch: "Guarda la session",
    },
    facts: [
      { n: "Quasi 2000", label: "concerti tra Italia, Europa e America" },
      {
        n: "Quasi 500.000",
        label: "visualizzazioni su YouTube per “Kilimangiaro”",
      },
      {
        n: "Quattro",
        label: "lingue in cui canta: italiano, inglese, spagnolo, francese",
      },
    ],
    storyCta: "Leggi tutta la storia",
    contactCta: "Scrivi a dr.gam",
    contactLead: "Concerti, collaborazioni, stampa.",
    music: {
      album: "Album",
      single: "Singolo",
      soldOut: "Esaurito",
      quotes: "Cosa dicono",
    },
    gallery: { title: "Galleria", open: "Apri la foto" },
    press: { clippings: "Ritaglio" },
    story: { title: "Storia", wikipedia: "Biografia completa su Wikipedia" },
    archive: {
      title: "Archivio live",
      lead: "Concerti, ospitate radio e uscite, 2016-2019.",
      live: "Live",
      radio: "Radio e stampa",
      release: "Uscita",
    },
    studio: {
      title: "White Coal",
      productions: "Productions",
      records: "Records",
      partners: "Ha lavorato con",
      lead: "Lo studio e l'etichetta dietro ogni disco di dr.gam, con base a Fuerteventura.",
    },
    contact: {
      title: "Contatti",
      lead: "Per concerti, collaborazioni e stampa. Ogni messaggio viene letto.",
      elsewhere: "Oppure trovalo qui",
    },
    alt: {
      rocks:
        "dr.gam vestito di bianco con la chitarra tra le rocce di Fuerteventura",
      leaves: "dr.gam seduto tra le foglie blu",
      live: "dr.gam canta dal vivo con la chitarra acustica",
      ivy: "dr.gam seduto davanti a un muro d'edera",
    },
    more: "Altri",
    less: "Mostra meno",
    menu: "Menu",
    close: "Chiudi",
    language: "Lingua",
    skip: "Vai al contenuto",
    sending: "Invio in corso…",
    sent: "Grazie. Il messaggio è stato inviato.",
    error:
      "Non è stato possibile inviare il messaggio. Riprova, oppure scrivi sui social.",
    required: "Inserisci nome ed email.",
    invalidEmail: "L'indirizzo email non sembra corretto.",
    play: "Riproduci il video",
    galleryClose: "Chiudi",
    galleryPrev: "Foto precedente",
    galleryNext: "Foto successiva",
    notFound: {
      title: "Traccia persa",
      lead: "Questa pagina non esiste, o è stata spostata.",
      back: "Torna alla home",
    },
    rights: "Sito di White Coal Productions",
  },
  es: {
    heads: {
      records: { soft: "Toda la", hard: "música" },
      videos: { soft: "En", hard: "pantalla" },
      gallery: { soft: "A través del", hard: "objetivo" },
      stampa: { soft: "En la", hard: "prensa" },
      events: { soft: "En la", hard: "carretera" },
      "white-coal": { soft: "White", hard: "Coal" },
    },
    nav: {
      home: "Inicio",
      records: "Música",
      videos: "Vídeos",
      bio: "Historia",
      gallery: "Galería",
      stampa: "Prensa",
      "white-coal": "White Coal",
      contact: "Contacto",
      events: "Archivo en vivo",
    },
    meta: {
      home: {
        title: "dr.gam | web oficial",
        description:
          "dr.gam (Andrea Gamurrini): cantautor, multiinstrumentista y productor. Reggae, jazz y grunge en un solo sonido. Ya disponible el nuevo álbum en directo “Live in Rome”.",
      },
      bio: {
        title: "Historia | dr.gam",
        description:
          "La alquimia lo es todo, amigo mío. La historia de Andrea Gamurrini, alias dr.gam.",
      },
      events: {
        title: "Archivo en vivo | dr.gam",
        description:
          "Conciertos, apariciones en radio y lanzamientos de dr.gam, 2016-2019.",
      },
      "white-coal": {
        title: "White Coal | dr.gam",
        description:
          "White Coal Productions y White Coal Records: el estudio audiovisual y el sello de dr.gam en Fuerteventura.",
      },
      contact: {
        title: "Contacto | dr.gam",
        description:
          "Escribe a dr.gam para conciertos, colaboraciones y prensa.",
      },
    },
    role: "Cantautor, multiinstrumentista, productor",
    motto: "La alquimia lo es todo, amigo mío",
    outNow: "Ya disponible",
    liveInRome: {
      kicker: "Álbum en directo y película concierto",
      desc: "Grabado en Roma durante la gira de verano de 2025 con la nueva banda. Catorce temas: canciones de antes y material nuevo, tocados como una sola cosa.",
      listen: "Escuchar en Spotify",
      watch: "Ver la sesión",
    },
    facts: [
      { n: "Casi 2000", label: "conciertos entre Italia, Europa y América" },
      {
        n: "Casi 500.000",
        label: "visualizaciones en YouTube de “Kilimangiaro”",
      },
      {
        n: "Cuatro",
        label: "idiomas en los que canta: italiano, inglés, español, francés",
      },
    ],
    storyCta: "Leer toda la historia",
    contactCta: "Escribe a dr.gam",
    contactLead: "Conciertos, colaboraciones, prensa.",
    music: {
      album: "Álbum",
      single: "Single",
      soldOut: "Agotado",
      quotes: "Lo que dicen",
    },
    gallery: { title: "Galería", open: "Abrir la foto" },
    press: { clippings: "Recorte" },
    story: { title: "Historia", wikipedia: "Biografía completa en Wikipedia" },
    archive: {
      title: "Archivo en vivo",
      lead: "Conciertos, apariciones en radio y lanzamientos, 2016-2019.",
      live: "En vivo",
      radio: "Radio y prensa",
      release: "Lanzamiento",
    },
    studio: {
      title: "White Coal",
      productions: "Productions",
      records: "Records",
      partners: "Ha trabajado con",
      lead: "El estudio y el sello detrás de cada disco de dr.gam, con sede en Fuerteventura.",
    },
    contact: {
      title: "Contacto",
      lead: "Para conciertos, colaboraciones y prensa. Se leen todos los mensajes.",
      elsewhere: "O encuéntralo aquí",
    },
    alt: {
      rocks:
        "dr.gam vestido de blanco con su guitarra entre las rocas de Fuerteventura",
      leaves: "dr.gam sentado entre hojas azules",
      live: "dr.gam cantando en directo con guitarra acústica",
      ivy: "dr.gam sentado frente a un muro de hiedra",
    },
    more: "Otros",
    less: "Mostrar menos",
    menu: "Menú",
    close: "Cerrar",
    language: "Idioma",
    skip: "Ir al contenido",
    sending: "Enviando…",
    sent: "Gracias. Tu mensaje se ha enviado.",
    error:
      "No se pudo enviar el mensaje. Inténtalo de nuevo o escribe en redes sociales.",
    required: "Escribe tu nombre y tu correo.",
    invalidEmail: "El correo no parece correcto.",
    play: "Reproducir vídeo",
    galleryClose: "Cerrar",
    galleryPrev: "Foto anterior",
    galleryNext: "Foto siguiente",
    notFound: {
      title: "Pista perdida",
      lead: "Esta página no existe o se ha movido.",
      back: "Volver al inicio",
    },
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
  {
    name: "La Vali Photographer",
    href: "https://www.instagram.com/la_vali_ph/",
  },
];
