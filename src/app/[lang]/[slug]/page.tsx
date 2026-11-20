import { notFound } from "next/navigation";
import { PageView, pageMetadata } from "@/components/PageView";
import { SUBPAGE_SLUGS } from "@/lib/content";
import { LANGS, isLang } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => SUBPAGE_SLUGS.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang, slug } = await params;
  return isLang(lang) ? pageMetadata(lang, slug) : {};
}

export default async function SubPage({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang, slug } = await params;
  if (!isLang(lang) || !SUBPAGE_SLUGS.includes(slug)) notFound();
  return <PageView lang={lang} slug={slug} />;
}
