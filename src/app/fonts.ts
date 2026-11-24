import { Archivo } from "next/font/google";

// Una sola famiglia variabile, come le copertine live anni '70 stampate in un solo carattere:
// larga e nera per i titoli (asse wdth al massimo), a larghezza normale per tutto ciò che si legge.
export const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const fontVariables = archivo.variable;
