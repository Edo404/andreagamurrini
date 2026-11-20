// Importa il sito Wix catturato (JSON di layout per pagina/lingua) in dati per Next.js
// e scarica/ottimizza le immagini in public/media.
//
// Uso:  node scripts/import-wix.mjs <cartella-cattura>
// La cartella contiene d_<lang>_<slug>.json (layout desktop 1366px) ed events_<lang>.json.
// Script usato una volta per la migrazione: i dati generati in src/content sono la fonte di verità.

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const CAP = process.argv[2];
if (!CAP) throw new Error("Passa la cartella della cattura");
const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_CONTENT = path.join(ROOT, "src/content");
const OUT_MEDIA = path.join(ROOT, "public/media");
fs.mkdirSync(path.join(OUT_CONTENT, "pages"), { recursive: true });
fs.mkdirSync(OUT_MEDIA, { recursive: true });

const LANGS = ["en", "it", "es"];
const SLUGS = ["home", "bio", "gallery", "records", "videos", "stampa", "events", "white-coal", "white-coal-records", "contact"];
const GRID = 980;

// Palette del tema Wix (variabili --color_N)
const THEME = {0:"255,255,255",1:"255,255,255",2:"0,0,0",3:"255,203,5",4:"0,136,203",5:"237,28,36",6:"253,253,254",7:"254,253,253",8:"0,0,0",9:"245,233,0",10:"58,190,254",11:"255,255,255",12:"242,242,242",13:"207,207,207",14:"168,168,168",15:"96,96,96",16:"164,230,247",17:"119,215,239",18:"0,185,232",19:"0,123,154",20:"0,61,77",21:"240,173,160",22:"226,131,113",23:"211,35,0",24:"141,23,0",25:"70,11,0",26:"211,233,170",27:"182,212,126",28:"137,191,36",29:"91,127,24",30:"45,63,12",31:"255,239,170",32:"255,231,127",33:"255,208,0",34:"169,138,0",35:"84,69,0",36:"255,255,255",37:"96,96,96",38:"242,242,242",39:"207,207,207",40:"168,168,168",41:"0,185,232",42:"255,231,127",43:"207,207,207",44:"255,255,255",45:"96,96,96",46:"168,168,168",47:"168,168,168",48:"0,185,232"};

// Font Wix → variabili CSS dei font sostitutivi (vedi src/app/fonts.ts)
function mapFont(ff) {
  const f = ff.toLowerCase();
  if (f.includes("din-next")) return "var(--font-din)";
  if (f.includes("futura")) return "var(--font-futura)";
  if (f.includes("trirong")) return "var(--font-trirong)";
  if (f.includes("jura")) return "var(--font-jura)";
  if (f.includes("cormorant")) return "var(--font-cormorant)";
  if (f.includes("georgia")) return "Georgia, Palatino, 'Book Antiqua', serif";
  if (f.includes("helvetica") || f.includes("arial")) return "Arial, Helvetica, sans-serif";
  console.warn("Font non mappato:", ff);
  return ff;
}

// ---------- immagini ----------
const media = new Map(); // file wix → { width needed, out name }
function wixFile(src) {
  const m = src.match(/static\.wixstatic\.com\/media\/([^/?]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}
function useImage(src, displayW, { background = false } = {}) {
  const file = wixFile(src);
  if (!file) return null;
  const base = file.replace(/~mv2.*$/, "").replace(/\.[a-z]+$/i, "").replace(/^8932a6_/, "");
  const name = `${base}.webp`;
  const need = background ? 1920 : Math.min(2000, Math.ceil(displayW * 2));
  const prev = media.get(file);
  media.set(file, { name, need: Math.max(need, prev?.need ?? 0), png: /\.png$/i.test(file) });
  return `/media/${name}`;
}

async function downloadImages() {
  let i = 0;
  for (const [file, { name, need }] of media) {
    i++;
    const dest = path.join(OUT_MEDIA, name);
    if (fs.existsSync(dest)) continue;
    const url = `https://static.wixstatic.com/media/${file}`;
    let res = await fetch(url);
    // alcuni originali sono protetti (403): si chiede a Wix una versione ridimensionata
    if (res.status === 403) res = await fetch(`${url}/v1/fit/w_${need},h_${need * 2},q_90/${file}`);
    if (!res.ok) { console.warn("Immagine non scaricata", res.status, url); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    const img = sharp(buf, { animated: false }).rotate();
    const meta = await img.metadata();
    await img
      .resize({ width: Math.min(need, meta.width ?? need), withoutEnlargement: true })
      .webp({ quality: 80, alphaQuality: 90 })
      .toFile(dest);
    process.stdout.write(`\r  immagini ${i}/${media.size}`);
  }
  process.stdout.write("\n");
}

// ---------- testo ----------
function cleanHtml(html, lang) {
  let h = html;
  // colori del tema → stile inline
  h = h.replace(/<span([^>]*?)class="([^"]*)"([^>]*)>/g, (_, a, cls, b) => {
    const styles = [];
    const col = cls.match(/(?:^|\s)color_(\d+)/);
    if (col && THEME[col[1]]) styles.push(`color:rgb(${THEME[col[1]]})`);
    const bc = cls.match(/backcolor_(\d+)/);
    if (bc && THEME[bc[1]]) styles.push(`background-color:rgb(${THEME[bc[1]]})`);
    const rest = (a + b).replace(/style="([^"]*)"/, (_m, s) => { styles.unshift(s.replace(/;$/, "")); return ""; });
    return `<span${rest.trim() ? " " + rest.trim() : ""}${styles.length ? ` style="${styles.join(";")}"` : ""}>`;
  });
  h = h.replace(/\sclass="[^"]*"/g, "");
  // font-family inline → font sostitutivi
  h = h.replace(/font-family:([^;"]+)/g, (_, f) => `font-family:${mapFont(f).replace(/'/g, "")}`);
  // link interni → percorsi relativi della lingua corrente
  h = h.replace(/href="https?:\/\/(?:www\.)?andreagamurrini\.com(\/(?:it|es))?(\/[^"]*)?"/g, (_, _l, p) => {
    const pathPart = p && p !== "/" ? p : "";
    const prefix = lang === "en" ? "" : `/${lang}`;
    return `href="${prefix}${pathPart}" data-internal="1"`.replace('href=""', 'href="/"');
  });
  h = h.replace(/<span>(\s*)<\/span>/g, "$1");
  h = h.replace(/&nbsp;/g, " ");
  return h;
}

function paraStyle(p) {
  const s = p.pst;
  const lh = s.lh === "normal" ? "normal" : s.lh;
  return {
    fontFamily: mapFont(s.ff),
    fontSize: s.fs,
    fontWeight: s.fw,
    fontStyle: s.fst,
    color: s.col,
    textAlign: s.ta === "start" ? "left" : s.ta,
    lineHeight: lh,
    letterSpacing: s.ls === "normal" ? undefined : s.ls,
    textDecoration: s.td === "none" ? undefined : s.td,
  };
}

// ---------- pagine ----------
const HEADER_IDS = /^(img_comp-k0tqdwx4|comp-m16ibr9i)$/;
const FOOTER_IDS = /comp-lrh01srb|comp-jz5k66ol|WRchTxt1/;

function within(a, b, tol = 2) {
  return a.x >= b.x - tol && a.y >= b.y - tol && a.x + a.w <= b.x + b.w + tol && a.y + a.h <= b.y + b.h + tol;
}

const GALLERY = ["eda9c41a5a0e46eab8d13925af229855~mv2.jpg","93bc211e0a814390896d74b6b8752358~mv2.jpg","eeec873dd944426aa1d50f8c76cccacc~mv2.jpg","9781e9c3e88f4d4b9c929e26fe7eb5f9~mv2.jpg","29481297373e4d93a103ffbce011d2ae~mv2_d_4584_3744_s_4_2.jpg","3f5fd9d7d2a340368824d45e15a554d2~mv2_d_3456_5184_s_4_2.jpg","005ae1d3b1f24fa18133c70d5e90f981.jpg","728706501c5049e48cce224c58c1ca58.jpg","8f96e304d5dc43b8b45f314134bbe6ee~mv2_d_5000_5000_s_4_2.jpg","d9eba1c0312545ea9ddf3150a1ae403b.jpg","783c0847212c4b1bb402d8cb17322af2.jpg","6ccf71390a204a5083e53f6fc2847346.jpg","a42645b9f736481b862d3db808e814f0.jpg","15fb369f4a7d44618e645dfa0d0a3c33.jpg","a0995d0a820a4772baae57bf9fdd67f0.jpg","a1857bad45a14457954b5bf9afb17453.jpg"].map((f) => `https://static.wixstatic.com/media/8932a6_${f}`);

const site = { nav: {}, pages: {} };

for (const lang of LANGS) {
  for (const slug of SLUGS) {
    const file = path.join(CAP, `d_${lang}_${slug}.json`);
    if (!fs.existsSync(file)) { console.warn("manca", file); continue; }
    const d = JSON.parse(fs.readFileSync(file, "utf8"));
    const ox = Math.round((d.vw - GRID) / 2);
    const items = d.items;

    // titolo/descrizione
    site.pages[slug] ??= {};
    site.pages[slug][lang] = { title: d.title, description: d.description ?? null };

    // nav (una volta per lingua)
    if (!site.nav[lang]) {
      site.nav[lang] = items.filter((i) => i.k === "a" && i.y === 0 && i.h === 42 && i.w < 200)
        .sort((a, b) => a.x - b.x)
        .map((a) => ({ label: a.text, slug: (new URL(a.href).pathname.replace(/^\/(it|es)(?=\/|$)/, "").replace(/^\//, "") || "home") }));
    }

    const copyright = items.find((i) => i.k === "txt" && i.id === "WRchTxt1");
    const stageH = copyright ? copyright.y - 10 : d.h;

    const bgImg = items.find((i) => i.k === "img" && /pageBackground/.test(i.id ?? ""));
    const bgColorBox = items.find((i) => i.k === "box" && i.x === 0 && i.y === 0 && i.w >= d.vw - 20 && i.h >= 800);
    const page = {
      slug, lang, stageHeight: stageH,
      background: {
        image: bgImg ? useImage(bgImg.src, 0, { background: true }) : null,
        color: bgColorBox?.bg ?? "#fff",
      },
      elements: [],
    };

    const rel = (i) => ({ x: i.x - ox, y: i.y, w: i.w, h: i.h });
    const inHeader = (i) => i.y < 120 && i.y + i.h < 130 && (i.k !== "txt");

    // pannelli (box colorati) del contenuto
    const panels = items.filter((i) => i.k === "box" && i.tag !== "BUTTON" && !(i.x === 0 && i.y === 0) && i.y > 50 &&
      i.bg !== "rgba(0, 0, 0, 0)" && i.y + i.h > 0 && slug !== "contact" && !(slug === "gallery"));
    for (const b of panels) {
      if (b.y < 0) continue;
      page.elements.push({ type: "box", ...rel(b), bg: b.bg, radius: b.radius, shadow: b.shadow === "none" ? undefined : b.shadow,
        border: b.border.startsWith("0px") ? undefined : b.border.replace(/ solid /, " solid ") });
    }

    for (const i of items) {
      if (i.k === "img") {
        if (/pageBackground/.test(i.id ?? "") || HEADER_IDS.test(i.id ?? "") || FOOTER_IDS.test(i.id ?? "")) continue;
        if (!wixFile(i.src)) continue;
        if (i.x - ox > GRID + 100 || i.x + i.w < 0) continue; // fuori dalla pagina (nascosti in Wix)
        if (slug === "gallery" && GALLERY.some((g) => wixFile(g) === wixFile(i.src))) continue; // resi dalla galleria
        const src = useImage(i.src, i.w);
        page.elements.push({ type: "image", ...rel(i), src, alt: i.alt || "", href: i.href || undefined,
          fit: i.fit === "fill" ? "fill" : i.fit, radius: i.radius !== "0px" ? i.radius : undefined });
      } else if (i.k === "ifr") {
        const yt = i.src.match(/youtube\.com\/embed\/([\w-]{6,})/);
        if (yt) page.elements.push({ type: "video", ...rel(i), youtubeId: yt[1], title: i.title || "dr.gam video" });
        else if (/Masonry/.test(i.src)) page.elements.push({ type: "gallery", ...rel(i), images: GALLERY.map((g) => ({ src: useImage(g, 480), alt: "dr.gam" })) });
      } else if (i.k === "txt") {
        if (FOOTER_IDS.test(i.id ?? "")) continue;
        if (slug === "contact") continue; // gestito dal modulo
        const panel = panels.find((b) => within(rel(i), rel(b)) && b.bg !== "rgba(0, 0, 0, 0)");
        page.elements.push({
          type: "text", ...rel(i), id: i.id,
          panel: panel ? { bg: panel.bg, radius: panel.radius } : undefined,
          paragraphs: i.paras.map((p) => ({ tag: p.tag.toLowerCase(), html: cleanHtml(p.html, lang), style: paraStyle(p) })),
        });
      }
    }

    if (slug === "gallery" && !page.elements.some((e) => e.type === "gallery")) {
      // in alcune lingue la galleria è stata catturata già "esplosa": stessa area della versione inglese
      page.elements.push({ type: "gallery", x: 14, y: 156, w: 952, h: 3879, images: GALLERY.map((g) => ({ src: useImage(g, 480), alt: "dr.gam" })) });
    }

    if (slug === "contact") {
      const inputs = items.filter((i) => i.k === "input" || i.k === "textarea");
      const btn = items.find((i) => i.k === "button" && i.y > 200);
      const title = items.find((i) => i.k === "txt" && i.id === "comp-ixr7tjaj");
      const titleBox = items.find((i) => i.k === "box" && i.bg === "rgb(255, 208, 0)");
      const all = [titleBox, ...inputs, btn].filter(Boolean);
      const x0 = Math.min(...all.map((i) => i.x)), y0 = Math.min(...all.map((i) => i.y));
      const x1 = Math.max(...all.map((i) => i.x + i.w)), y1 = Math.max(...all.map((i) => i.y + i.h));
      page.elements.push({
        type: "contactForm", x: x0 - ox, y: y0, w: x1 - x0, h: y1 - y0,
        labels: {
          title: title?.text?.trim() ?? "CONTACT",
          name: inputs[0]?.ph, email: inputs[1]?.ph, subject: inputs[2]?.ph, message: inputs[3]?.ph,
          send: btn?.text?.trim() ?? "SEND",
        },
      });
    }

    if (slug === "events") {
      const ev = JSON.parse(fs.readFileSync(path.join(CAP, `events_${lang}.json`), "utf8"));
      const panel = page.elements.find((e) => e.type === "box" && e.h > 5000);
      page.elements.push({
        type: "events", x: (panel?.x ?? 206) + 27, y: (panel?.y ?? 106) + 23, w: 501, h: (panel?.h ?? 12000) - 46,
        items: ev.map((e) => ({
          date: e.date,
          title: e.title?.t ?? "",
          titleHref: e.title?.h || undefined,
          lines: e.lines.map((l) => ({ text: l.t, href: l.h || undefined, color: l.col, italic: l.fst === "italic", bold: Number(l.fw) >= 600 })),
        })),
      });
      if (panel) panel.events = true;
    }

    // ordine di lettura (per il layout mobile) e ordine di disegno: box sotto, poi resto
    page.elements.sort((a, b) => (a.type === "box" ? 0 : 1) - (b.type === "box" ? 0 : 1) || a.y - b.y || a.x - b.x);

    fs.mkdirSync(path.join(OUT_CONTENT, "pages", lang), { recursive: true });
    fs.writeFileSync(path.join(OUT_CONTENT, "pages", lang, `${slug}.json`), JSON.stringify(page, null, 1));
    console.log(lang, slug, page.elements.length, "elementi, h", stageH);
  }
}

fs.writeFileSync(path.join(OUT_CONTENT, "site.json"), JSON.stringify(site, null, 1));
await downloadImages();
console.log("Fatto.", media.size, "immagini");
