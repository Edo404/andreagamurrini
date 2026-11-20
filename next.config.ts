import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Le immagini sono già ridimensionate e convertite in WebP in /public/media:
  // niente ottimizzazione a runtime (su Cloudflare richiederebbe il binding Images).
  images: { unoptimized: true },
  trailingSlash: false,
  async redirects() {
    return [
      // L'inglese vive alla radice, come su Wix: /en/... non deve esistere come URL pubblico
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
      // musica, video, galleria e stampa ora sono sezioni della home
      ...[
        ["records", "music"],
        ["videos", "videos"],
        ["gallery", "gallery"],
        ["stampa", "press"],
      ].flatMap(([slug, anchor]) => [
        { source: `/${slug}`, destination: `/#${anchor}`, permanent: true },
        { source: `/:lang(it|es)/${slug}`, destination: `/:lang#${anchor}`, permanent: true },
      ]),
      // le due pagine White Coal di Wix ora sono una sola
      { source: "/white-coal-records", destination: "/white-coal#records", permanent: true },
      { source: "/:lang(it|es)/white-coal-records", destination: "/:lang/white-coal#records", permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        // URL inglesi senza prefisso → route interne /en/...
        { source: "/", destination: "/en" },
        // tutto ciò che non inizia con /it, /es, /en, /api, /media o /_next (anche percorsi inesistenti,
        // così il 404 usa il layout del sito)
        {
          source: "/:path((?!(?:it|es|en|api|media|_next)(?:/|$))[^.]+)",
          destination: "/en/:path",
        },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;

// Abilita i binding Cloudflare durante `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
