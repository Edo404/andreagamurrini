import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { pagePath, type Lang } from "@/lib/i18n";
import { NAV_SLUGS, UI, navHref } from "@/data/ui";
import { LISTEN, SOCIAL, WIKIPEDIA } from "@/data/catalog";
import { Wordmark } from "./Header";

/** Il retro della copertina: l'invito a scrivere e i crediti. */
export function Footer({ lang }: { lang: Lang }) {
  const t = UI[lang];
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <Link href={navHref(lang, "contact")} className="footer-cta">
          <span className="footer-cta-title">
            {t.contactCta}
            <ArrowRight size="0.8em" aria-hidden="true" />
          </span>
          <span className="footer-cta-lead">{t.contactLead}</span>
        </Link>

        <div className="footer-credits">
          <div className="footer-brand">
            <Wordmark />
            <p>{t.motto}</p>
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
