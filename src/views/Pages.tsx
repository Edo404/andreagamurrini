import Link from "next/link";
import { Fragment } from "react";
import { pagePath, type Lang } from "@/lib/i18n";
import { PARTNERS, UI } from "@/data/ui";
import { LOGOS, PHOTOS, SOCIAL, WIKIPEDIA } from "@/data/catalog";
import texts from "@/data/texts.json";
import events from "@/data/events.json";
import { Kicker, PageHero, Title } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";

const cleanQuote = (q: string) => q.replace(/^[“"”]+|[“"”]+$/g, "");

function Quotes({ lang }: { lang: Lang }) {
  const t = UI[lang];
  return (
    <section className="wrap quotes" aria-labelledby="quotes-title">
      <Title id="quotes-title" soft={t.music.quotes.split(" ")[0]} hard={t.music.quotes.split(" ").slice(1).join(" ")} className="title-l section-title" />
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
          <Kicker>{t.story.title}</Kicker>
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
      <Quotes lang={lang} />
    </article>
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
      <PageHero kicker={t.nav["white-coal"]} {...t.heads["white-coal"]} lead={t.studio.lead} />
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
        <Kicker>{t.contact.title}</Kicker>
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
