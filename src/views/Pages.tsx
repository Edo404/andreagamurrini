import Link from "next/link";
import { Fragment } from "react";
import { pagePath, type Lang } from "@/lib/i18n";
import { PARTNERS, UI } from "@/data/ui";
import { LISTEN, LOGOS, PHOTOS, PRESS, RELEASES, SOCIAL, VIDEOS, WIKIPEDIA } from "@/data/catalog";
import texts from "@/data/texts.json";
import events from "@/data/events.json";
import gallery from "@/data/gallery.json";
import { Kicker, PageHero, Sleeve, Title } from "@/components/ui";
import { YouTube } from "@/components/YouTube";
import { Gallery } from "@/components/Gallery";
import { ContactForm } from "@/components/ContactForm";

const cleanQuote = (q: string) => q.replace(/^[“"”]+|[“"”]+$/g, "");

/* ================= Musica ================= */
export function Music({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const albums = RELEASES.filter((r) => r.kind === "album");
  const singles = RELEASES.filter((r) => r.kind === "single");
  const cds = RELEASES.filter((r) => r.kind === "cd");
  return (
    <>
      <PageHero num="01" kicker={t.nav.records} {...t.heads.records} />

      <section className="wrap albums" aria-labelledby="albums-title">
        <Kicker>
          <span id="albums-title">{t.music.albums}</span>
        </Kicker>
        <div className="albums-grid">
          {albums.map((a, i) => (
            <article key={a.title} className={`album reveal${i === 0 ? " album-first" : ""}`}>
              <Sleeve cover={a.cover} title={a.title} href={a.href} size="lg" priority={i === 0} />
              <div className="album-meta">
                <span className="num">{a.year}</span>
                <h3 className="title title-m">{a.title}</h3>
                {a.href && (
                  <a className="link-arrow" href={a.href} target="_blank" rel="noopener noreferrer">
                    {t.music.listen} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap singles" aria-labelledby="singles-title">
        <Kicker>
          <span id="singles-title">{t.music.singles}</span>
        </Kicker>
        <ol className="singles-grid">
          {singles.map((s, i) => (
            <li key={s.title} className="single reveal" style={{ "--d": i % 5 } as React.CSSProperties}>
              <Sleeve cover={s.cover} title={s.title} href={s.href} />
              <span className="single-title">{s.title}</span>
              {s.year && <span className="num">{s.year}</span>}
            </li>
          ))}
        </ol>
        <ul className="listen-row">
          {LISTEN.map((l) => (
            <li key={l.name}>
              <a className="btn" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.name} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap physical" aria-labelledby="physical-title">
        <Kicker>
          <span id="physical-title">{t.music.physical}</span>
        </Kicker>
        <ol className="physical-list">
          {cds.map((c, i) => (
            <li key={i} className="reveal">
              <Sleeve cover={c.cover} title={c.title} stamp={c.soldOut ? t.music.soldOut : undefined} />
              <div>
                <h3 className="title title-s">{c.title}</h3>
                <p className="muted">
                  {[c.year, c.edition?.[lang]].filter(Boolean).join(" · ")}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Quotes lang={lang} />
    </>
  );
}

function Quotes({ lang }: { lang: Lang }) {
  const t = UI[lang];
  return (
    <section className="wrap quotes" aria-labelledby="quotes-title">
      <Title id="quotes-title" soft={t.music.quotes.split(" ")[0]} hard={t.music.quotes.split(" ").slice(1).join(" ")} className="title-l" />
      <div className="quotes-wall">
        {texts.quotes[lang].map((q, i) => (
          <figure key={i} className="quote reveal">
            <blockquote>{cleanQuote(q.quote)}</blockquote>
            <figcaption>{q.source}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ================= Video ================= */
export function Videos({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const [featured, ...rest] = VIDEOS;
  return (
    <>
      <PageHero num="02" kicker={t.nav.videos} {...t.heads.videos} lead={t.videos.lead} />
      <section className="wrap videos-page">
        <div className="video-featured reveal">
          <YouTube id={featured.id} title={featured.title} lang={lang} large index={1} />
        </div>
        <ol className="videos-grid">
          {rest.map((v, i) => (
            <li key={v.id} className="reveal">
              <YouTube id={v.id} title={v.title} lang={lang} index={i + 2} />
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

/* ================= Storia ================= */
export function Story({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const paras = texts.bio[lang].filter((p) => !/wikipedia/i.test(p));
  const [first, ...rest] = paras;
  // prima frase come titolo, il resto del paragrafo sotto
  const cut = first.search(/[.!?](\s|$)/);
  const headline = cut > 0 ? first.slice(0, cut + 1) : first;
  const after = cut > 0 ? first.slice(cut + 1).trim() : "";
  // le immagini si alternano dentro il racconto
  const breaks = new Map([
    [Math.floor(rest.length * 0.28), PHOTOS.live],
    [Math.floor(rest.length * 0.62), PHOTOS.ivy],
  ]);
  return (
    <article className="story">
      <header className="story-hero">
        <div className="story-hero-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PHOTOS.leaves.src} alt="dr.gam" width={PHOTOS.leaves.w} height={PHOTOS.leaves.h} fetchPriority="high" />
        </div>
        <div className="wrap story-hero-text">
          <Kicker num="03">{t.story.title}</Kicker>
          <h1 className="title title-xl">
            <em>{headline}</em>
          </h1>
          {after && <p className="lead">{after}</p>}
        </div>
      </header>
      <div className="wrap story-body">
        <aside className="story-aside">
          <p className="num">Andrea Gamurrini</p>
          <p className="muted">{t.role}</p>
          <a className="link-arrow" href={WIKIPEDIA} target="_blank" rel="noopener noreferrer">
            {t.story.wikipedia} <span aria-hidden="true">↗</span>
          </a>
        </aside>
        <div className="prose">
          {rest.map((p, i) => {
            const img = breaks.get(i);
            const short = p.length < 90;
            return (
              <Fragment key={i}>
                {img && (
                  <figure className="prose-figure reveal">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} alt="dr.gam" width={img.w} height={img.h} loading="lazy" />
                  </figure>
                )}
                {short ? <p className="pull">{p}</p> : <p className={i === 0 ? "dropcap" : undefined}>{p}</p>}
              </Fragment>
            );
          })}
        </div>
      </div>
    </article>
  );
}

/* ================= Galleria ================= */
export function GalleryPage({ lang }: { lang: Lang }) {
  const t = UI[lang];
  return (
    <>
      <PageHero num="04" kicker={t.nav.gallery} {...t.heads.gallery} lead={t.gallery.lead} />
      <section className="wrap">
        <Gallery images={gallery} lang={lang} />
      </section>
    </>
  );
}

/* ================= Stampa ================= */
export function Press({ lang }: { lang: Lang }) {
  const t = UI[lang];
  return (
    <>
      <PageHero num="05" kicker={t.nav.stampa} {...t.heads.stampa} lead={t.press.lead} />
      <section className="wrap">
        <ul className="press-grid">
          {PRESS.map((p, i) => (
            <li key={i} className="reveal">
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="press-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.logo} alt={p.outlet} width={p.w} height={p.h} loading="lazy" />
                <span className="press-name">
                  {p.outlet === "Press clipping" ? t.press.clippings : p.outlet} <span aria-hidden="true">↗</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <Quotes lang={lang} />
    </>
  );
}

/* ================= Archivio live ================= */
export function Archive({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const years = [...new Set(events.map((e) => e.date.slice(0, 4)))];
  const fmt = new Intl.DateTimeFormat(lang, { day: "2-digit", month: "short", timeZone: "UTC" });
  const label = { live: t.archive.live, radio: t.archive.radio, release: t.archive.release } as const;
  return (
    <>
      <PageHero kicker={t.nav.events} {...t.heads.events} lead={t.archive.lead} />
      <section className="wrap archive">
        {years.map((y) => (
          <section key={y} className="archive-year" aria-labelledby={`y-${y}`}>
            <h2 id={`y-${y}`} className="archive-y">
              {y}
            </h2>
            <ol>
              {events
                .filter((e) => e.date.startsWith(y))
                .map((e, i) => (
                  <li key={i} className={`ev ev-${e.type}`}>
                    <time dateTime={e.date} className="num">
                      {fmt.format(new Date(e.date))}
                    </time>
                    <span className="ev-tag">{label[e.type as keyof typeof label]}</span>
                    <div className="ev-body">
                      <p className="ev-title">
                        {e.href ? (
                          <a href={e.href} target="_blank" rel="noopener noreferrer">
                            {e.title}
                          </a>
                        ) : (
                          e.title
                        )}
                      </p>
                      {e.note && e.note !== e.title && <p className="muted">{e.note}</p>}
                    </div>
                  </li>
                ))}
            </ol>
          </section>
        ))}
      </section>
    </>
  );
}

/* ================= White Coal ================= */
export function Studio({ lang }: { lang: Lang }) {
  const t = UI[lang];
  return (
    <>
      <PageHero num="06" kicker={t.nav["white-coal"]} {...t.heads["white-coal"]} lead={t.studio.lead} />
      <section className="wrap studio">
        <div className="studio-logos">
          <figure id="productions" className="studio-logo reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGOS.productions} alt="White Coal Productions" width={550} height={510} className="invert" />
            <figcaption className="num">{t.studio.productions}</figcaption>
          </figure>
          <figure id="records" className="studio-logo reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGOS.records} alt="White Coal Records" width={600} height={550} />
            <figcaption className="num">{t.studio.records}</figcaption>
          </figure>
        </div>
        <div className="studio-text">
          {texts.whiteCoal[lang].map((p, i) => (
            <p key={i} className="lead">
              {p}
            </p>
          ))}
        </div>
        <div className="partners">
          <Kicker>{t.studio.partners}</Kicker>
          <ul>
            {PARTNERS.map((p) => (
              <li key={p.name}>
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noopener noreferrer">
                    {p.name}
                  </a>
                ) : (
                  <span>{p.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

/* ================= Contatti ================= */
export function Contact({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const labels = texts.contact[lang];
  return (
    <section className="contact-page wrap">
      <div className="contact-intro">
        <Kicker num="07">{t.contact.title}</Kicker>
        <h1 className="title title-xl">
          <em>{t.contactCta.split(" ").slice(0, -1).join(" ")}</em> {t.contactCta.split(" ").slice(-1)}
        </h1>
        <p className="lead">{t.contact.lead}</p>
        <Kicker>{t.contact.elsewhere}</Kicker>
        <ul className="contact-social">
          {SOCIAL.map((s) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.name} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ContactForm labels={labels} lang={lang} />
    </section>
  );
}

export function NotFoundView({ lang }: { lang: Lang }) {
  const t = UI[lang].notFound;
  return (
    <section className="not-found wrap">
      <p className="nf-num" aria-hidden="true">
        404
      </p>
      <h1 className="title title-xl">
        <em>{t.title.split(" ")[0]}</em> {t.title.split(" ").slice(1).join(" ")}
      </h1>
      <p className="lead">{t.lead}</p>
      <Link className="btn btn-solid" href={pagePath(lang, "home")}>
        {t.back}
      </Link>
    </section>
  );
}
