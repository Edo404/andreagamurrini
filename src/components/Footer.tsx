import Link from "next/link";
import { pagePath, type Lang } from "@/lib/i18n";
import { NAV_SLUGS, UI, navHref } from "@/data/ui";
import { LISTEN, SOCIAL, WIKIPEDIA } from "@/data/catalog";
import { Wordmark } from "./Header";
import { ArrowIcon } from "./icons";
import { WaveEdge } from "./ui";

export function Footer({ lang }: { lang: Lang }) {
  const t = UI[lang];
  return (
    <footer className="site-footer">
      {/* sale dal fondo scuro della sezione Stampa (o della pagina) al blu del footer */}
      <WaveEdge fill="var(--footer-bg)" className="footer-wave" />
      <div className="shell footer-inner">
        <Link href={pagePath(lang, "contact")} className="footer-ticket">
          <span className="footer-ticket-cta">
            {t.contactCta}
            <ArrowIcon />
          </span>
          <span className="footer-ticket-lead">{t.contactLead}</span>
        </Link>

        <div className="footer-grid">
          <div className="footer-brand">
            <Wordmark />
            <p className="motto">{t.motto}</p>
          </div>
          <nav aria-label={t.menu}>
            <ul>
              {NAV_SLUGS.map((s) => (
                <li key={s}>
                  <Link href={navHref(lang, s)}>{t.nav[s]}</Link>
                </li>
              ))}
              <li>
                <Link href={pagePath(lang, "events")}>{t.nav.events}</Link>
              </li>
            </ul>
          </nav>
          <ul>
            {LISTEN.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.name}
                </a>
              </li>
            ))}
            <li>
              <a href={WIKIPEDIA} target="_blank" rel="noopener noreferrer">
                Wikipedia
              </a>
            </li>
          </ul>
          <ul>
            {SOCIAL.filter((s) => !LISTEN.some((l) => l.name === s.name)).map(
              (s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.name}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="footer-base">
          <span>© {new Date().getFullYear()} Andrea Gamurrini</span>
          <span>{t.rights}</span>
        </div>
      </div>
    </footer>
  );
}
