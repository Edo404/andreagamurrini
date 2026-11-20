import { Bricolage_Grotesque, DM_Mono, Instrument_Serif } from "next/font/google";

// "dr" e "gam": sentimento e ragione. Il serif corsivo è il cuore, il grotesk la testa.
export const grotesk = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
  axes: ["wdth", "opsz"],
});
export const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
export const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const fontVariables = [grotesk, serif, mono].map((f) => f.variable).join(" ");
