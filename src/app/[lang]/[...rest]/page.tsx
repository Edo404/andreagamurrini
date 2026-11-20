import { notFound } from "next/navigation";

// Qualsiasi percorso non previsto → 404 con header e footer del sito
export default function CatchAll() {
  notFound();
}
