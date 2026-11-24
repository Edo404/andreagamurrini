import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LANGS, SITE_URL, isLang } from "@/lib/i18n";
import { artistGraph } from "@/lib/jsonld";
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
  themeColor: "#ecebe6",
  colorScheme: "light",
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={lang} className={fontVariables}>
      <body>
        <script
          type="application/ld+json"
          // JSON statico generato dai dati del sito; "<" escapato per non chiudere lo script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(artistGraph(lang)).replace(/</g, "\\u003c"),
          }}
        />
        <div className="grain" aria-hidden="true" />
        <Header lang={lang} />
        <main id="main">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
