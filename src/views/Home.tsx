import Link from "next/link";
import { pagePath, type Lang } from "@/lib/i18n";
import { UI } from "@/data/ui";
import { LISTEN, PHOTOS, PRESS, RELEASES, VIDEOS } from "@/data/catalog";
import texts from "@/data/texts.json";
import gallery from "@/data/gallery.json";
import { Wordmark } from "@/components/Header";
import { ArrowIcon, PlayIcon } from "@/components/icons";
import {
  Sign,
  Sleeve,
  SpinBadge,
  Title,
  Wave,
  WaveEdge,
} from "@/components/ui";
import { YouTube } from "@/components/YouTube";
import { Expandable } from "@/components/Expandable";
import { Gallery } from "@/components/Gallery";

/** Citazione lunga → estratto di circa tre righe, tagliato su una parola. */
function excerpt(q: string, max = 150) {
  const clean = q.replace(/^[“"”]+|[“"”]+$/g, "").replace(/…+|\.{3,}/g, "…");
  if (clean.length <= max) return clean;
  return (
    clean.slice(0, clean.lastIndexOf(" ", max)).replace(/[,;:]$/, "") + "…"
  );
}

export function Home({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const live = RELEASES[0];
  const quote = texts.quotes[lang][0];
  const bio = texts.bio[lang];
  const [featured, ...moreVideos] = VIDEOS;

  // musica: prima i singoli più recenti, poi l'album d'esordio e le edizioni fisiche
  const music = [
    ...RELEASES.filter((r) => r.kind === "single"),
    ...RELEASES.filter((r) => r.kind === "album" && r !== live),
    ...RELEASES.filter((r) => r.kind === "cd"),
  ];

  return (
    <>
      {/* ---------- muro dipinto: insegna, sole con il ritratto, biglietto dell'ultima uscita ---------- */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title" className="hero-sign">
              <Wordmark />
            </h1>
            <p className="hero-role">{t.role}</p>

            <article className="ticket" aria-labelledby="ticket-title">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="ticket-cover"
                src={live.cover}
                alt={`${live.title}, cover`}
                width={600}
                height={600}
              />
              <div className="ticket-body">
                <h2 id="ticket-title" className="ticket-title">
                  {live.title}
                </h2>
                <p className="ticket-meta">
                  {t.outNow} · {live.year}
                </p>
                <p className="ticket-desc">{t.liveInRome.desc}</p>
                <div className="ticket-actions">
                  <a
                    className="pill pill-sun"
                    href={live.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PlayIcon />
                    {t.liveInRome.listen}
                  </a>
                  <a className="pill pill-ghost" href="#videos">
                    {t.liveInRome.watch}
                  </a>
                </div>
              </div>
            </article>
          </div>

          <figure className="hero-sun">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTOS.rocks.src}
              alt={t.alt.rocks}
              width={PHOTOS.rocks.w}
              height={PHOTOS.rocks.h}
              fetchPriority="high"
            />
          </figure>
          <div className="hero-badge">
            <SpinBadge text={t.motto} />
          </div>
        </div>
        <div className="hero-stripes" aria-hidden="true">
          <Wave className="stripe-sun" />
          <Wave className="stripe-bloom" />
          <Wave className="stripe-wash" />
        </div>
      </section>

      {/* ---------- tavola d'insegna con i numeri della bio ---------- */}
      <section className="board" aria-label="dr.gam">
        <ul className="board-list">
          {t.facts.map((f, i) => (
            <li key={i}>
              <b>{f.n}</b> <span>{f.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- musica: la cassa dei dischi ---------- */}
      <section id="music" className="crate" aria-labelledby="music-title">
        <WaveEdge fill="var(--sea-800)" />
        <div className="crate-body">
          <div className="crate-inner shell">
            <Sign
              id="music-title"
              tone={t.heads.records.soft}
              hard={t.heads.records.hard}
            />
            <Expandable
              className="crate-grid"
              initial={6}
              moreLabel={t.more}
              lessLabel={t.less}
              buttonClassName="pill pill-sun"
              items={music.map((r, i) => (
                <article key={i} className="record">
                  <Sleeve
                    cover={r.cover}
                    title={r.title}
                    href={r.href}
                    stamp={r.soldOut ? t.music.soldOut : undefined}
                  />
                  <div className="record-tag">
                    <h3 className="record-title">{r.title}</h3>
                    <p className="record-meta">
                      {[
                        r.kind === "single"
                          ? t.music.single
                          : r.kind === "album"
                            ? t.music.album
                            : "CD",
                        r.year,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    {r.edition && (
                      <p className="record-edition">{r.edition[lang]}</p>
                    )}
                  </div>
                </article>
              ))}
            />
            <ul className="listen-row" aria-label={t.liveInRome.listen}>
              {LISTEN.map((l) => (
                <li key={l.name}>
                  <a
                    className="pill pill-line"
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.name}
                    <ArrowIcon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <WaveEdge fill="var(--sea-900)" className="edge-from-800" />
      </section>

      {/* ---------- video: il cinema all'aperto ---------- */}
      <section
        id="videos"
        className="cinema shell"
        aria-labelledby="videos-title"
      >
        <div className="cinema-head">
          <Sign
            id="videos-title"
            tone={t.heads.videos.soft}
            hard={t.heads.videos.hard}
          />
          <Wave className="cinema-wave" />
        </div>
        <div className="cinema-screen">
          <YouTube id={featured.id} title={featured.title} lang={lang} large />
        </div>
        <Expandable
          className="cinema-grid"
          initial={6}
          moreLabel={t.more}
          lessLabel={t.less}
          buttonClassName="pill pill-sun"
          items={moreVideos.map((v) => (
            <YouTube key={v.id} id={v.id} title={v.title} lang={lang} />
          ))}
        />
      </section>

      {/* ---------- citazione: il muro rosa ---------- */}
      <section className="pinkwall" aria-label={t.music.quotes}>
        <blockquote className="pinkwall-quote">
          <p>{excerpt(quote.quote)}</p>
          <footer>{quote.source}</footer>
        </blockquote>
      </section>

      {/* ---------- storia: la cartolina ---------- */}
      <section
        className="postcard-wrap shell"
        aria-labelledby="story-teaser-title"
      >
        <article className="postcard">
          <figure className="postcard-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTOS.ivy.src}
              alt={t.alt.ivy}
              width={PHOTOS.ivy.w}
              height={PHOTOS.ivy.h}
              loading="lazy"
            />
          </figure>
          <div className="postcard-text">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="postcard-stamp"
              src="/media/logo.webp"
              alt=""
              width={84}
              height={84}
              loading="lazy"
            />
            <h2 id="story-teaser-title" className="postcard-title">
              {t.motto}
            </h2>
            <p>{bio[1]}</p>
            <Link href={pagePath(lang, "bio")} className="pill pill-ink">
              {t.storyCta}
              <ArrowIcon />
            </Link>
          </div>
        </article>
      </section>

      {/* ---------- galleria: le foto appese ---------- */}
      <section
        id="gallery"
        className="photowall"
        aria-labelledby="gallery-title"
      >
        <div className="shell photowall-inner">
          <Sign
            id="gallery-title"
            tone={t.heads.gallery.soft}
            hard={t.heads.gallery.hard}
          />
          <Gallery images={gallery} lang={lang} initial={6} />
        </div>
        {/* l'onda scura porta dentro la sezione Stampa, che ha il suo fondo congelato */}
        <WaveEdge fill="var(--press-ground)" className="to-press" />
      </section>

      {/* ---------- stampa: CONGELATA (src/app/press.css), non modificare ---------- */}
      <section
        id="press"
        className="press-frozen"
        aria-labelledby="press-title"
      >
        <Title
          id="press-title"
          {...t.heads.stampa}
          className="title-l section-title"
        />
        <Expandable
          className="press-grid"
          initial={9}
          moreLabel={t.more}
          lessLabel={t.less}
          items={PRESS.map((p, i) => (
            <a
              key={i}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="press-tile"
              title={
                p.outlet === "Press clipping" ? t.press.clippings : p.outlet
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.logo}
                alt={
                  p.outlet === "Press clipping" ? t.press.clippings : p.outlet
                }
                width={p.w}
                height={p.h}
                loading="lazy"
              />
            </a>
          ))}
        />
      </section>
    </>
  );
}
