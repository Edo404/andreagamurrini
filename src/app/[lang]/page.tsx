import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n";
import { pageMetadata } from "@/lib/meta";
import { Home } from "@/views/Home";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  return isLang(lang) ? pageMetadata(lang, "home") : {};
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <Home lang={lang} />;
}
