import { PageView, pageMetadata } from "@/components/PageView";
import { isLang } from "@/lib/i18n";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  return isLang(lang) ? pageMetadata(lang, "home") : {};
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <PageView lang={lang} slug="home" />;
}
