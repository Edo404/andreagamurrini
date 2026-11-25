import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { pagePath, type Lang } from "@/lib/i18n";
import { PARTNERS, UI } from "@/data/ui";
import { LOGOS, PHOTOS, SOCIAL, WIKIPEDIA } from "@/data/catalog";
import texts from "@/data/texts.json";
import events from "@/data/events.json";
import { Halftone, PageHero, Title, Vinyl } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";

const cleanQuote = (q: string) => q.replace(/^[“"”]+|[“"”]+$/g, "");

/** Le recensioni come ritagli di giornale incollati sul cartone. */
function Quotes({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const [first, ...rest] = t.music.quotes.split(" ");
  return (
    <section className="reviews" aria-labelledby="quotes-title">
      <div className="shell">
        <Title id="quotes-title" soft={first} hard={rest.join(" ")} />
        <div className="reviews-wall">
          {texts.quotes[lang].map((q, i) => (
            <figure key={i} className="review">
              <blockquote>{cleanQuote(q.quote)}</blockquote>
              <figcaption>{q.source}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= Storia: il libretto interno ================= */
export function Story({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const paras = texts.bio[lang].filter((p) => !/wikipedia/i.test(p));
  const [first, ...rest] = paras;
  // prima frase come titolo, il resto del paragrafo sotto
  const cut = first.search(/[.!?](\s|$)/);
  const headline = cut > 0 ? first.slice(0, cut + 1) : first;
  const after = cut > 0 ? first.slice(cut + 1).trim() : "";
  // le foto si alternano dentro il racconto, stampate a un inchiostro
  const breaks = new Map([
    [
      Math.floor(rest.length * 0.28),
      { ...PHOTOS.live, alt: t.alt.live, ink: "red" as const },
    ],
    [
      Math.floor(rest.length * 0.62),
      { ...PHOTOS.ivy, alt: t.alt.ivy, ink: "black" as const },
    ],
  ]);
  return (
    <article className="story">
      <header className="story-hero">
        <Halftone
          className="story-hero-photo"
          src={PHOTOS.leaves.src}
          alt={t.alt.leaves}
          w={PHOTOS.leaves.w}
          h={PHOTOS.leaves.h}
          priority
        />
        <div className="shell story-hero-text">
          <h1 className="title title-1">{headline}</h1>
          {after && <p className="lead">{after}</p>}
        </div>
      </header>
      <div className="shell story-body">
        <aside className="story-aside">
          <Vinyl className="story-vinyl" />
          <p className="story-aside-name">Andrea Gamurrini</p>
          <p>{t.role}</p>
          <a
            className="btn btn-ghost"
            href={WIKIPEDIA}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.story.wikipedia}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </aside>
        <div className="prose">
          {rest.map((p, i) => {
            const img = breaks.get(i);
            const short = p.length < 90;
            return (
              <Fragment key={i}>
                {img && (
                  <Halftone
                    className="prose-figure"
                    src={img.src}
                    alt={img.alt}
                    w={img.w}
                    h={img.h}
                    ink={img.ink}
                  />
                )}
                {short ? (
                  <p className="pull">{p}</p>
                ) : (
                  <p className={i === 0 ? "dropcap" : undefined}>{p}</p>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
      <Quotes lang={lang} />
    </article>
  );
}

/* ================= Archivio live: le date stampate sul retro della maglietta del tour ================= */
export function Archive({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const years = [...new Set(events.map((e) => e.date.slice(0, 4)))];
  const fmt = new Intl.DateTimeFormat(lang, {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  });
  const label = {
    live: t.archive.live,
    radio: t.archive.radio,
    release: t.archive.release,
  } as const;
  return (
    <>
      <PageHero
        soft={t.heads.events.soft}
        hard={t.heads.events.hard}
        lead={t.archive.lead}
      />
      <section className="shell archive">
        {years.map((y) => (
          <section key={y} className="archive-year" aria-labelledby={`y-${y}`}>
            <h2 id={`y-${y}`} className="archive-y">
              {y}
            </h2>
            <ol className="archive-list">
              {events
                .filter((e) => e.date.startsWith(y))
                .map((e, i) => (
                  <li key={i} className={`ev ev-${e.type}`}>
                    <time dateTime={e.date} className="ev-date">
                      {fmt.format(new Date(e.date))}
                    </time>
                    <span className="ev-tag">
                      {label[e.type as keyof typeof label]}
                    </span>
                    <div className="ev-body">
                      <p className="ev-title">
                        {e.href ? (
                          <a
                            href={e.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {e.title}
                          </a>
                        ) : (
                          e.title
                        )}
                      </p>
                      {e.note && e.note !== e.title && (
                        <p className="ev-note">{e.note}</p>
                      )}
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

/* ================= White Coal (sezione della home): le etichette dei due marchi e i crediti dei partner ================= */
export function Studio({ lang }: { lang: Lang }) {
  const t = UI[lang];
  return (
    <section id="white-coal" className="studio" aria-labelledby="studio-title">
      <div className="shell studio-inner">
        <header className="studio-head">
          <Title
            id="studio-title"
            soft={t.heads["white-coal"].soft}
            hard={t.heads["white-coal"].hard}
          />
          <p className="lead">{t.studio.lead}</p>
        </header>
        <div className="studio-labels">
          <figure id="productions" className="studio-label">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGOS.productions}
              alt="White Coal Productions"
              width={550}
              height={510}
              loading="lazy"
            />
            <figcaption>{t.studio.productions}</figcaption>
          </figure>
          <figure id="records" className="studio-label studio-label-alt">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGOS.records}
              alt="White Coal Records"
              width={600}
              height={550}
              loading="lazy"
            />
            <figcaption>{t.studio.records}</figcaption>
          </figure>
        </div>
        <div className="studio-text">
          {texts.whiteCoal[lang].map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="partners">
          <Title as="h3" hard={t.studio.partners} size={3} />
          <ul className="partners-list">
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
      </div>
    </section>
  );
}

/* ================= Contatti (sezione della home, prima del footer): il retro della copertina ================= */
export function Contact({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const labels = texts.contact[lang];
  const words = t.contactCta.split(" ");
  return (
    <section
      id="contact"
      className="contact-page"
      aria-labelledby="contact-title"
    >
      <div className="contact-side">
        <Title
          id="contact-title"
          soft={words.slice(0, -1).join(" ")}
          hard={words.slice(-1)[0]}
          size={1}
        />
        <p className="lead">{t.contact.lead}</p>
        <h3 className="contact-elsewhere">{t.contact.elsewhere}</h3>
        <ul className="contact-social">
          {SOCIAL.map((s) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.name}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="contact-form-wrap">
        <ContactForm labels={labels} lang={lang} />
      </div>
    </section>
  );
}

export function NotFoundView({ lang }: { lang: Lang }) {
  const t = UI[lang].notFound;
  return (
    <section className="not-found shell">
      <Vinyl className="nf-vinyl" />
      <h1 className="title title-1">{t.title}</h1>
      <p className="lead">{t.lead}</p>
      <Link className="btn btn-red" href={pagePath(lang, "home")}>
        {t.back}
        <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </section>
  );
}
