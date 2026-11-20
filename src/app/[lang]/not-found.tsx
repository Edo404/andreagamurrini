import { NotFoundView } from "@/views/Pages";

// La 404 non riceve la lingua: si mostra in inglese (lingua principale del sito).
export default function NotFound() {
  return <NotFoundView lang="en" />;
}
