"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LANGS, LANG_INFO, UI, pagePath, type Lang } from "@/lib/i18n";
import { Flag } from "./Flag";

type NavItem = { label: string; slug: string };

function currentSlug(pathname: string) {
  const rest = pathname.replace(/^\/(it|es)(?=\/|$)/, "").replace(/^\//, "");
  return rest.split("/")[0] || "home";
}

export function Header({ lang, nav }: { lang: Lang; nav: NavItem[] }) {
  const pathname = usePathname() ?? "/";
  const slug = currentSlug(pathname);
  const t = UI[lang];
  // I menu restano aperti solo sulla pagina in cui sono stati aperti: cambiando pagina si chiudono.
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
  const [langOpenOn, setLangOpenOn] = useState<string | null>(null);
  const menuOpen = menuOpenOn === pathname;
  const langOpen = langOpenOn === pathname;
  const setMenuOpen = (v: boolean | ((o: boolean) => boolean)) =>
    setMenuOpenOn((cur) => ((typeof v === "function" ? v(cur === pathname) : v) ? pathname : null));
  const setLangOpen = (v: boolean | ((o: boolean) => boolean)) =>
    setLangOpenOn((cur) => ((typeof v === "function" ? v(cur === pathname) : v) ? pathname : null));
  const langRef = useRef<HTMLDivElement>(null);

  // chiude i menu con Esc o cliccando fuori
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpenOn(null);
        setLangOpenOn(null);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpenOn(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <a className="skip" href="#main">
        {t.skip}
      </a>
      <div className="header-inner">
        <Link href={pagePath(lang, "home")} className="logo" aria-label="Andrea Gamurrini – dr.gam">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/logo.webp" alt="Andrea Gamurrini" width={100} height={100} />
        </Link>

        <nav className={`main-nav ${menuOpen ? "open" : ""}`} aria-label="Menu">
          <ul>
            {nav.map((item) => (
              <li key={item.slug} className={item.slug === slug ? "active" : undefined}>
                <Link href={pagePath(lang, item.slug)} aria-current={item.slug === slug ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lang" ref={langRef}>
          <button
            type="button"
            className="lang-btn"
            aria-haspopup="listbox"
            aria-expanded={langOpen}
            aria-label={`${t.language}: ${LANG_INFO[lang].name}`}
            onClick={() => setLangOpen((o) => !o)}
          >
            <Flag lang={lang} />
            <svg className="chev" viewBox="0 0 12 8" width="12" height="8" aria-hidden="true">
              <path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </button>
          {langOpen && (
            <ul className="lang-list" role="listbox" aria-label={t.language}>
              {LANGS.map((l) => (
                <li key={l} role="option" aria-selected={l === lang}>
                  <Link href={pagePath(l, slug)} hrefLang={l} lang={l}>
                    <Flag lang={l} />
                    <span>{LANG_INFO[l].name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          className="burger"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? t.close : t.menu}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
