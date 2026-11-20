import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LANGS, SITE_URL, isLang } from "@/lib/i18n";
import { fontVariables } from "../fonts";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "dr.gam",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#110f0e",
  colorScheme: "dark",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={lang} className={fontVariables}>
      <body>
        <div className="grain" aria-hidden="true" />
        <Header lang={lang} />
        <main id="main">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
