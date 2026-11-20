"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LANGS, pagePath, type Lang } from "@/lib/i18n";
import { NAV_SLUGS, UI, navHref } from "@/data/ui";
import { SOCIAL } from "@/data/catalog";

function currentSlug(pathname: string) {
  const rest = pathname.replace(/^\/(it|es)(?=\/|$)/, "").replace(/^\//, "");
  return rest.split("/")[0] || "home";
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`} aria-label="dr.gam">
      <em>dr.</em>gam
    </span>
  );
}

export function Header({ lang }: { lang: Lang }) {
  const pathname = usePathname() ?? "/";
  const slug = currentSlug(pathname);
  const t = UI[lang];
  // il menu resta aperto solo sulla pagina in cui è stato aperto
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <a className="skip" href="#main">
        {t.skip}
      </a>
      <div className="bar">
        <Link href={pagePath(lang, "home")} className="brand" aria-label="dr.gam, home">
          <Wordmark />
        </Link>

        <nav className="nav-inline" aria-label={t.menu}>
          {NAV_SLUGS.map((s) => (
            <Link key={s} href={navHref(lang, s)} aria-current={s === slug ? "page" : undefined}>
              {t.nav[s]}
            </Link>
          ))}
        </nav>

        <div className="langs" role="group" aria-label={t.language}>
          {LANGS.map((l) => (
            <Link key={l} href={pagePath(l, slug)} hrefLang={l} lang={l} aria-current={l === lang ? "true" : undefined}>
              {l}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="menu-overlay"
          onClick={() => setOpenOn(open ? null : pathname)}
        >
          <span className="menu-btn-label">{open ? t.close : t.menu}</span>
          <span className="menu-btn-icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>

      <div id="menu-overlay" className="menu-overlay" hidden={!open}>
        <nav aria-label={t.menu}>
          <ol>
            {(["home", ...NAV_SLUGS] as const).map((s, i) => (
              <li key={s} style={{ "--i": i } as React.CSSProperties}>
                <Link href={navHref(lang, s)} aria-current={s === slug ? "page" : undefined} onClick={() => setOpenOn(null)}>
                  <span className="num">{String(i).padStart(2, "0")}</span>
                  {t.nav[s]}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="menu-foot">
          <div className="langs langs-lg">
            {LANGS.map((l) => (
              <Link key={l} href={pagePath(l, slug)} hrefLang={l} lang={l} aria-current={l === lang ? "true" : undefined}>
                {l}
              </Link>
            ))}
          </div>
          <ul className="menu-social">
            {SOCIAL.slice(0, 5).map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
