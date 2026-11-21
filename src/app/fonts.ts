import { Bricolage_Grotesque, DM_Mono, Figtree, Instrument_Serif, Shrikhand } from "next/font/google";

// ---- Identità: insegna dipinta a mano + testo leggibile (max 2 famiglie, 4 pesi) ----
// Shrikhand: lettering da insegna anni '70, solo per titoli e momenti chiave. È l'unico precaricato.
export const sign = Shrikhand({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-sign",
  display: "swap",
  preload: true,
});
// Figtree: tutto ciò che si legge (testo, menu, pulsanti, moduli).
export const text = Figtree({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "800"],
  variable: "--font-text",
  display: "swap",
  preload: false,
});

// ---- Solo per la sezione Stampa congelata (src/app/press.css): non usarli altrove ----
const grotesk = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-grotesk", display: "swap", axes: ["wdth", "opsz"], preload: false });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap", preload: false });
const mono = DM_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-mono", display: "swap", preload: false });

export const fontVariables = [sign, text, grotesk, serif, mono].map((f) => f.variable).join(" ");
