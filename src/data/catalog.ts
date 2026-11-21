// Catalogo di dr.gam: dischi, video, stampa, foto. Unica fonte dei contenuti "a elenco" del sito.
// Per aggiungere un'uscita o un video basta aggiungere una voce in cima alla lista giusta.

export type Release = {
  title: string;
  kind: "album" | "single" | "cd";
  year?: number;
  cover: string;
  href?: string;
  edition?: { en: string; it: string; es: string };
  soldOut?: boolean;
};

export const RELEASES: Release[] = [
  { title: "Live in Rome", kind: "album", year: 2026, cover: "/media/ccec8c89fa11451b9bffb9fc844be9e0.webp", href: "https://open.spotify.com/album/36P5MEr7QfKy6L3v2kg1jB" },
  { title: "Another Family", kind: "album", year: 2016, cover: "/media/506795bde6f54deb93dd33386a21cb61.webp" },

  { title: "Vieni a cambiare il mondo", kind: "single", cover: "/media/18a70e7ce71042d6a5ae355cdb3708e5.webp", href: "https://www.youtube.com/watch?v=AGHvpHesc-Q" },
  { title: "Rise and Fall", kind: "single", cover: "/media/28dbbdaa37964ad7b5275716f3c586e0.webp", href: "https://open.spotify.com/track/7sY0V6goXtn5i1YNKaejPb" },
  { title: "Connesso", kind: "single", cover: "/media/51e3a5415c214b63ac11fa949e3b7a79.webp", href: "https://open.spotify.com/track/57C4XcLEFRVfR5163Cmmqj" },
  { title: "Vota Barabba", kind: "single", cover: "/media/71c6cfaf22a641eba28abdc1cd8f63d1.webp", href: "https://open.spotify.com/track/6uuaDKMH5q95WV09Wf429U" },
  { title: "The Way Out", kind: "single", year: 2024, cover: "/media/f48d84a89bd649efb739a0e9f6bab92d.webp", href: "https://www.youtube.com/watch?v=TBeJphJLh0w" },
  { title: "La Mer", kind: "single", cover: "/media/775a1b91e3b2401ebebb10b431f5def1.webp", href: "https://open.spotify.com/track/4t4xWdLpHmbgT28h5bdILX" },
  { title: "Kilimangiaro", kind: "single", year: 2023, cover: "/media/4f4a644a7fc9445e9dbc42e15b0f5919.webp", href: "https://open.spotify.com/track/02zaGpUVWTFNmL3QBgNYfD" },
  { title: "dr.gam is in da house", kind: "single", year: 2016, cover: "/media/ed6ae0771ced48db9b71b1f1b31f3f5d.webp", href: "https://open.spotify.com/album/529E4YXMqD2t1Jpkoa1R4x" },
  { title: "Italian Rastaman", kind: "single", year: 2016, cover: "/media/431449d28e22471a9860b87dbddb5659.webp", href: "https://open.spotify.com/album/0u6TmOKGKEiTeZNJ7TO2T0" },
  { title: "Ritmo Ideale", kind: "single", year: 2017, cover: "/media/e8a0f781c6d2433ea027181ecae3c769.webp", href: "https://open.spotify.com/album/4cd28VvKF0v8RayvDDbCAc" },

  { title: "Another Family", kind: "cd", year: 2016, cover: "/media/506795bde6f54deb93dd33386a21cb61.webp", soldOut: true, edition: { en: "Italy, Lungomare, Jois, Universal", it: "Italia, Lungomare, Jois, Universal", es: "Italia, Lungomare, Jois, Universal" } },
  { title: "Another Family", kind: "cd", year: 2018, cover: "/media/cb44549f37c84018b9bdaaccb243c8ee.webp", soldOut: true, edition: { en: "Spain, Portugal, Andorra reissue", it: "Ristampa Spagna, Portogallo, Andorra", es: "Reedición España, Portugal, Andorra" } },
  { title: "Another Family", kind: "cd", year: 2019, cover: "/media/36342d56267e4a4996406b076ff43ac3.webp", soldOut: true, edition: { en: "USA & Canada, Applauso US", it: "USA e Canada, Applauso US", es: "EE. UU. y Canadá, Applauso US" } },
  { title: "The New Medicine Show", kind: "cd", cover: "/media/3fdec50111f1491d9a615ec12326f428.webp", soldOut: true },
];

export const LISTEN = [
  { name: "Spotify", href: "https://open.spotify.com/artist/1EZPrWGWoRqehCUeV2UsvJ" },
  { name: "Apple Music", href: "https://music.apple.com/es/artist/dr-gam/1134439613" },
  { name: "YouTube", href: "https://www.youtube.com/@dr.gamOfficial" },
  { name: "Amazon", href: "https://www.amazon.it/Another-Family-Dr-Gam/dp/B01M5G20N8" },
] as const;

export const SOCIAL = [
  { name: "Instagram", href: "https://www.instagram.com/andreagamurrini/" },
  { name: "YouTube", href: "https://www.youtube.com/@dr.gamOfficial" },
  { name: "Spotify", href: "https://open.spotify.com/artist/1EZPrWGWoRqehCUeV2UsvJ" },
  { name: "TikTok", href: "https://www.tiktok.com/@andreagamurrini" },
  { name: "Facebook", href: "https://www.facebook.com/andreagamurrini/" },
  { name: "X", href: "https://twitter.com/AndreaGamurrini" },
  { name: "Apple Music", href: "https://music.apple.com/es/artist/dr-gam/1134439613" },
] as const;

export const WIKIPEDIA = "https://en.wikipedia.org/wiki/Dr.gam";

export type Video = { id: string; title: string };

/** In ordine: il primo è il video in evidenza. */
export const VIDEOS: Video[] = [
  { id: "_iX5vwO1AWA", title: "Live Session in Rome" },
  { id: "AGHvpHesc-Q", title: "dr.gam & Peter Godwin - Vieni a cambiare il mondo" },
  { id: "tNbWc_E70ns", title: "Rise and Fall" },
  { id: "Fd5Of_KWVmk", title: "Connesso" },
  { id: "YnDesTQzUnc", title: "La Mer" },
  { id: "HPs6kjKYHjc", title: "Vota Barabba" },
  { id: "qNuWRPE2fYI", title: "Kilimangiaro" },
  { id: "TBeJphJLh0w", title: "The Way Out" },
  { id: "6_CjeJBqkNI", title: "Guest on RAI Radio 1 Sport" },
  { id: "9PrkWbVJxbs", title: "dr.gam @ Radio Radio" },
  { id: "v4rrzuI7ub8", title: "Kilimangiaro - interview with Monia Palmieri" },
  { id: "pYg8g6Zy-_U", title: "Live, press, radio, TV, reviews" },
  { id: "wOjT9ToWf5k", title: "Another Family - the album" },
  { id: "EYeyy_Nvqek", title: "dr.gam is in da house" },
  { id: "Ep1qlv-FQEQ", title: "Italian Rastaman" },
  { id: "wufLNTpHU3Y", title: "Marley & Wonder in da house of Renaissance" },
  { id: "8rxNU4GN1Pg", title: "Live with Peppe Vessicchio & I Solisti del Sesto Armonico" },
  { id: "b2O0VHOfWBc", title: "Our Roots" },
  { id: "qBlQikBnhCs", title: "Ritmo Ideale" },
  { id: "Pq6-cknhaIo", title: "dr.gam for EMERGENCY" },
  { id: "HgUrVLdr-Rw", title: "dr.gam in Los Angeles" },
  { id: "9QY3Rb3vq7g", title: "Fragile (Sting)" },
  { id: "moHp1zSAkrE", title: "Live @ MEI 2020" },
  { id: "Pi2BEN8HLKk", title: "dr.gam is in da house (Corrado Cori Remix)" },
  { id: "fm-NnrJz_80", title: "Italian Rastaman (Corrado Cori Remix)" },
];

export type PressItem = { outlet: string; logo: string; href: string; w: number; h: number };

const m = (f: string) => `/media/${f}.webp`;
export const PRESS: PressItem[] = [
  { outlet: "RAI Radio 1 Sport", logo: m("b3138ba55e5e48dbad6e392a285b55fe"), href: "https://www.youtube.com/watch?v=6_CjeJBqkNI", w: 243, h: 86 },
  { outlet: "Il Sole 24 Ore", logo: m("399d8f944267400f99975d4e5cf903ad"), href: "https://stream24.ilsole24ore.com/video/cultura/in-anteprima-video-kilimangiaro-nuovo-singolo-drgam/AFOYg4iB", w: 232, h: 74 },
  { outlet: "Sky TG24", logo: m("870c3239b1be4bc3a49450c767292b45"), href: "https://tg24.sky.it/spettacolo/musica/2024/03/19/dr-gam-the-way-out-video", w: 271, h: 170 },
  { outlet: "OA Plus", logo: m("db0028abbd2a414584fd39b66bea2fdd"), href: "https://www.oaplus.it/musica/nuove-uscite/la-mer-di-dr-gam-un-viaggio-onirico-verso-la-pace-attraverso-la-musica/", w: 243, h: 86 },
  { outlet: "il Resto del Carlino", logo: m("7a35f25baade4103b8bf3dfc6b54cd2e"), href: "https://www.ilrestodelcarlino.it/pesaro/cronaca/dr-gam-ci-fa-scoprire-il-suo-kilimangiaro-1d0262b3", w: 289, h: 74 },
  { outlet: "Il Messaggero", logo: m("d601559d8df84aa1a2233950a2abab86"), href: "https://www.ilmessaggero.it/video/spettacoli/dr_gam_la_mer_video-7851841.html", w: 243, h: 47 },
  { outlet: "Il Tempo", logo: m("a660788099e6474ab77e60e21a7b5219"), href: "https://www.iltempo.it/tv-news/2023/11/21/video/in-anteprima-il-video-di-kilimangiaro-nuovo-singolo-di-dr-gam-37605737/", w: 289, h: 74 },
  { outlet: "Libero Quotidiano", logo: m("7172a6cabc184f1a9a80e46d794dc104"), href: "https://www.liberoquotidiano.it/video/tv-news/37605735/in-anteprima-il-video-di-kilimangiaro-nuovo-singolo-di-dr-gam.html", w: 259, h: 86 },
  { outlet: "askanews", logo: m("41f4ad7c9c81408081ac7292398cc7c1"), href: "https://askanews.it/2023/11/21/in-anteprima-il-video-di-kilimangiaro-nuovo-singolo-di-dr-gam/", w: 259, h: 47 },
  { outlet: "QN Quotidiano Nazionale", logo: m("b2e9dd5c35424bd6a6068169df77a653"), href: "https://www.quotidiano.net/video/in-anteprima-il-video-di-kilimangiaro-nuovo-singolo-di-drgam-xd1h5s80", w: 280, h: 86 },
  { outlet: "Fanpage.it", logo: m("3534d5f565d24f7aa4e9ff57c55d7882"), href: "https://youmedia.fanpage.it/video/ZVxkHuSwAbXRc42Z", w: 259, h: 74 },
  { outlet: "TGCOM24", logo: m("22f6458e36cd45c5b2baf55a9e8658c0"), href: "http://www.video.mediaset.it/video/tgcom24/servizio_spettacolo/dr-gam-arriva-italian-rastaman_657649.html", w: 243, h: 87 },
  { outlet: "Radio Radio", logo: m("dc4456fd6f4e4760a35152804f75833c"), href: "https://www.youtube.com/watch?v=9PrkWbVJxbs", w: 129, h: 136 },
  { outlet: "Radio Freccia", logo: m("873d2187fba04e0d968940da04a93dd6"), href: "https://www.youtube.com/watch?v=LNRE8CEIzag", w: 278, h: 91 },
  { outlet: "RDS", logo: m("73fe5cefae674f5e810015c4d0a22d84"), href: "https://www.rds.it/scopri/rds-tv/video-news/ritmo-ideale-lironia-dr-gam-sulla-frenesia-della-vita-di-oggi", w: 147, h: 92 },
  { outlet: "Radio Vaticana", logo: m("d3055b46821941beb7e26a1794a3f221"), href: "https://www.youtube.com/watch?v=vEuVLhOa-Is", w: 129, h: 125 },
  { outlet: "Corriere della Sera", logo: m("851c1388526144c4b1f3ec7b8ecf60b7"), href: "https://drive.google.com/file/d/1MtOQ76baULV8mzWcXBX4jtmFjWgnNZUl/view", w: 317, h: 56 },
  { outlet: "RaiPlay", logo: m("1b03ca64ef98441f8cc9d8f3f9cf982a"), href: "https://youtu.be/4oREpvdS7as", w: 249, h: 107 },
  { outlet: "Virgilio", logo: m("e41e3882e57a4e5cb1384c15ad85a57a"), href: "https://drive.google.com/file/d/1u2kdXtigZRNMj5r8LUDZEe23QF0OD0ia/view", w: 314, h: 51 },
  { outlet: "Contemporanea - radio interview", logo: m("9c8bf297ed4f493899276d7edbaab39a"), href: "https://www.youtube.com/watch?v=VfTMDyhRFHs", w: 296, h: 101 },
  { outlet: "Rai", logo: m("6ca4620df9104cd8a9caf1582393004a"), href: "https://www.youtube.com/watch?v=0DM2At7JSoo", w: 181, h: 101 },
  { outlet: "Music Map", logo: m("f72d277e3093422ea36f2f033b2857dd"), href: "http://www.musicmap.it/recdischi/ordinaperr.asp?id=5077", w: 254, h: 79 },
  { outlet: "MEI - Meeting degli Indipendenti", logo: m("08a782ae78244e1b9d2f72dd2f2ee0b5"), href: "https://www.youtube.com/watch?v=moHp1zSAkrE", w: 254, h: 122 },
  { outlet: "Teatrionline", logo: m("1032f7cd34b745aa83f1a3853cdf7b6e"), href: "https://www.teatrionline.com/2019/12/intervista-a-dr-gam/", w: 317, h: 91 },
  { outlet: "Tiscali Spettacoli", logo: m("90d1efb0f6f943e0b1a7a9ede946b6b2"), href: "http://spettacoli.tiscali.it/feeds/ritmo-ideale-ironia-dr-gam-sulla-frenesia-vita-oggi/", w: 286, h: 74 },
  { outlet: "Snap Italy", logo: m("7cbe7bc713ee4e8e8ba37796d9643246"), href: "http://www.snapitaly.it/dr-gam-another-family/", w: 149, h: 117 },
  { outlet: "Voce Spettacolo", logo: m("cbb9eead33e44f0992aeea33e3e6a547"), href: "http://www.vocespettacolo.com/intervista-dr-gam/", w: 157, h: 134 },
  { outlet: "Da Sapere", logo: m("f624391e7dd0471c942878f29f8f2a9b"), href: "http://www.dasapere.it/2016/12/08/conosciamo-meglio-dr-gam/", w: 244, h: 88 },
  { outlet: "MyDreams", logo: m("a80b4f558e63434f9df8a2ed4f5e5084"), href: "http://www.mydreams.it/dr-gam-racconta-another-family-suo-primo-album-inediti/", w: 214, h: 89 },
  { outlet: "Exhimusic", logo: m("88e416d5e1514db69b33d5738b430b2d"), href: "https://exhimusic.wordpress.com/2016/12/06/intervista-a-andrea-gamurrini-in-arte-dr-gam/", w: 253, h: 92 },
  { outlet: "Fourzine", logo: m("becc38b4d6244e579d3f5249c1205577"), href: "http://www.fourzine.it/2016/12/20/abbiamo-intervistato-dr-gam-another-family-e-il-suo-primo-album/", w: 243, h: 92 },
  { outlet: "QN - blog Arminio", logo: m("9429bb0cff7a4178ace11ddc65433ff1"), href: "http://blog.quotidiano.net/arminio/2016/11/28/musica-dr-gam-gioca-con-i-cliche/", w: 295, h: 86 },
  { outlet: "Press clipping", logo: m("cd3b78656b8044eda7857ebd1a33a864"), href: "https://drive.google.com/file/d/1X31Wq05Pg-PmUBKDucHHR9PLsh2yfgsc/view", w: 295, h: 68 },
  { outlet: "Press clipping", logo: m("ada1532e73314568b37848b510ede649"), href: "https://drive.google.com/file/d/1hfWEg2y5DXITl4_axyur3VPAh7Sw_qlq/view", w: 230, h: 101 },
  { outlet: "Press clipping", logo: m("0724e8f252a54a3d9c7a772c194d45bf"), href: "https://drive.google.com/file/d/1p0kfLq_d9bI2Zw4KwYZ8JJ4wajFkiZO-/view", w: 278, h: 110 },
  { outlet: "Press clipping", logo: m("3cbeaa052ae84fdcb002309907c6b240"), href: "https://drive.google.com/file/d/1INwa2-w_raCpvZiczPUTbu0E2kBqwPlF/view", w: 219, h: 99 },
  { outlet: "Press clipping", logo: m("a16c221aed944eedbe2b62d3aec2a5a9"), href: "https://drive.google.com/file/d/14VkhG3P8JjOxuLVgtO73LPhBD1dr27BO/view", w: 190, h: 80 },
  { outlet: "Press clipping", logo: m("7ba1ca068e174f14927c466dbab269c0"), href: "https://drive.google.com/file/d/1bsvcspsOpfQlGkei_hBiJhHMwxIlF3VA/view", w: 326, h: 124 },
  { outlet: "Press clipping", logo: m("0788d68c4a254777ae48ac1f0aa2d063"), href: "https://drive.google.com/file/d/1QBu_2r8ji-DKq6-WUOWOeekFoDIdpVG5/view", w: 232, h: 76 },
  { outlet: "Press clipping", logo: m("e506e69723ce4b23888703379cda8102"), href: "https://drive.google.com/file/d/1XDY2CIObfAlT5ETKJlLO9lLzqhDtoi9G/view", w: 207, h: 155 },
  { outlet: "Press clipping", logo: m("b52535e1965b4e91aa8a5874c502d870"), href: "https://drive.google.com/file/d/1UpYdFjS78CLCZBlzSe3FpcRBTKcHB6cv/view", w: 278, h: 77 },
  { outlet: "Press clipping", logo: m("4079d6d902c74b95b1ab43c0fccb123c"), href: "https://drive.google.com/file/d/1QMqpeKlPf6M-038cepc7OP5BzVPmV2gG/view", w: 258, h: 75 },
];

export const PHOTOS = {
  portrait: { src: "/media/hero-portrait.webp", w: 2200, h: 1207 }, // primo piano in bianco e nero
  rocks: { src: "/media/white-rocks.webp", w: 1080, h: 1579 }, // in bianco tra le rocce, con la chitarra
  live: { src: "/media/live-mic.webp", w: 2200, h: 1466 }, // live al microfono
  leaves: { src: "/media/blue-leaves.webp", w: 2200, h: 1127 }, // seduto tra le foglie blu
  ivy: { src: "/media/ivy-wall.webp", w: 2200, h: 1462 }, // davanti al muro d'edera
};

export const LOGOS = {
  productions: "/media/3d1235e4a5c94a979df83bc4df9864a3.webp",
  records: "/media/d002c83967a742428d0136809ffd7c49.webp",
};
