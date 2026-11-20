// Su Wix "futura-lt-w01-light" ha un solo peso: il grassetto è un falso bold, quasi uguale al light.
// Con Jost il grassetto sarebbe molto più pesante: nei paragrafi solo-Futura si usa il peso 400.
import fs from "node:fs";
import path from "node:path";
const dir = path.resolve(import.meta.dirname, "../src/content/pages");
let n = 0;
for (const lang of fs.readdirSync(dir)) {
  for (const f of fs.readdirSync(path.join(dir, lang))) {
    const file = path.join(dir, lang, f);
    const page = JSON.parse(fs.readFileSync(file, "utf8"));
    for (const el of page.elements) {
      if (el.type !== "text") continue;
      for (const p of el.paragraphs) {
        const fams = new Set([...p.html.matchAll(/font-family:([^;"]+)/g)].map((m) => m[1].trim()));
        const onlyFutura = fams.size > 0 && [...fams].every((x) => x.includes("--font-futura"));
        if (onlyFutura && /font-weight:bold/.test(p.html)) {
          p.html = p.html.replace(/font-weight:bold/g, "font-weight:400");
          n++;
        }
      }
    }
    fs.writeFileSync(file, JSON.stringify(page, null, 1));
  }
}
console.log("paragrafi corretti:", n);
