import { notFound } from "next/navigation";
import { LANGS, isLang, type Lang } from "@/lib/i18n";
import { SUBPAGE_SLUGS, isPageSlug, pageMetadata } from "@/lib/meta";
import { Archive, Contact, GalleryPage, Music, Press, Story, Studio, Videos } from "@/views/Pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => SUBPAGE_SLUGS.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang, slug } = await params;
  return isLang(lang) && isPageSlug(slug) ? pageMetadata(lang, slug) : {};
}

const VIEWS: Record<string, (p: { lang: Lang }) => React.ReactNode> = {
  records: Music,
  videos: Videos,
  bio: Story,
  gallery: GalleryPage,
  stampa: Press,
  events: Archive,
  "white-coal": Studio,
  contact: Contact,
};

export default async function SubPage({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang, slug } = await params;
  const View = VIEWS[slug];
  if (!isLang(lang) || !View) notFound();
  return <View lang={lang} />;
}
