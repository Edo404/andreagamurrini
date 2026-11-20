import { Barlow, Cormorant_Garamond, Jost, Jura, Trirong } from "next/font/google";

// Sostituti liberi dei font usati da Wix:
// DIN Next Light → Barlow 300, Futura Light/Book → Jost 300/400. Jura, Trirong e Cormorant sono gli stessi.
export const din = Barlow({ subsets: ["latin"], weight: ["300", "400", "700"], style: ["normal", "italic"], variable: "--font-din", display: "swap" });
export const futura = Jost({ subsets: ["latin"], weight: ["300", "400", "700"], style: ["normal", "italic"], variable: "--font-futura", display: "swap" });
export const jura = Jura({ subsets: ["latin"], weight: ["400"], variable: "--font-jura", display: "swap" });
export const trirong = Trirong({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-trirong", display: "swap" });
export const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["600"], variable: "--font-cormorant", display: "swap" });

export const fontVariables = [din, futura, jura, trirong, cormorant].map((f) => f.variable).join(" ");
