import Link from "next/link";
import { Fragment } from "react";
import { pagePath, type Lang } from "@/lib/i18n";
import { PARTNERS, UI } from "@/data/ui";
import { LOGOS, PHOTOS, SOCIAL, WIKIPEDIA } from "@/data/catalog";
import texts from "@/data/texts.json";
import events from "@/data/events.json";
import { ArrowIcon } from "@/components/icons";
import { PageHero, Sign, Wave, WaveEdge } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";

const cleanQuote = (q: string) => q.replace(/^[“"”]+|[“"”]+$/g, "");

/** Citazioni della stampa come biglietti appesi al muro. */
function Quotes({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const [first, ...rest] = t.music.quotes.split(" ");
  return (
    <section className="notes" aria-labelledby="quotes-title">
      <WaveEdge fill="var(--sea-800)" />
      <div className="notes-body">
        <div className="notes-inner shell">
          <Sign id="quotes-title" tone={first} hard={rest.join(" ")} />
          <div className="notes-wall">
            {texts.quotes[lang].map((q, i) => (
              <figure key={i} className="note">
                <blockquote>{cleanQuote(q.quote)}</blockquote>
                <figcaption>{q.source}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= Storia: lettura lunga in duotono ================= */
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
    [Math.floor(rest.length * 0.28), { ...PHOTOS.live, alt: t.alt.live }],
    [Math.floor(rest.length * 0.62), { ...PHOTOS.ivy, alt: t.alt.ivy }],
  ]);
  return (
    <article className="story">
      <header className="story-hero">
        <div className="story-hero-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTOS.leaves.src}
            alt={t.alt.leaves}
            width={PHOTOS.leaves.w}
            height={PHOTOS.leaves.h}
          />
        </div>
        <div className="shell story-hero-text">
          <h1 className="sign sign-1">{headline}</h1>
          {after && <p className="lead">{after}</p>}
        </div>
        <Wave className="story-hero-wave" />
      </header>
      <div className="shell story-body">
        <aside className="story-aside">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/logo.webp"
            alt=""
            width={96}
            height={96}
            loading="lazy"
          />
          <p className="story-aside-name">Andrea Gamurrini</p>
          <p className="muted">{t.role}</p>
          <a
            className="pill pill-line"
            href={WIKIPEDIA}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.story.wikipedia}
            <ArrowIcon />
          </a>
        </aside>
        <div className="prose">
          {rest.map((p, i) => {
            const img = breaks.get(i);
            const short = p.length < 90;
            return (
              <Fragment key={i}>
                {img && (
                  <figure className="prose-figure">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.alt}
                      width={img.w}
                      height={img.h}
                      loading="lazy"
                    />
                  </figure>
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

/* ================= Archivio live: tabellone con gli anni dipinti ================= */
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
        tone={t.heads.events.soft}
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

/* ================= White Coal: due soli e gli adesivi dei partner ================= */
export function Studio({ lang }: { lang: Lang }) {
  const t = UI[lang];
  return (
    <>
      <PageHero
        tone={t.heads["white-coal"].soft}
        hard={t.heads["white-coal"].hard}
        lead={t.studio.lead}
      />
      <section className="shell studio">
        <div className="studio-logos">
          <figure id="productions" className="studio-logo">
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
          <figure id="records" className="studio-logo studio-logo-alt">
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
        <div className="studio-board">
          {texts.whiteCoal[lang].map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="partners">
          <Sign as="h2" hard={t.studio.partners} size={3} />
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
      </section>
    </>
  );
}

/* ================= Contatti: il biglietto ================= */
export function Contact({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const labels = texts.contact[lang];
  const words = t.contactCta.split(" ");
  return (
    <section className="contact-page shell">
      <div className="contact-intro">
        <Sign
          as="h1"
          tone={words.slice(0, -1).join(" ")}
          hard={words.slice(-1)[0]}
          size={1}
        />
        <p className="lead">{t.contact.lead}</p>
        <h2 className="contact-elsewhere">{t.contact.elsewhere}</h2>
        <ul className="contact-social">
          {SOCIAL.map((s) => (
            <li key={s.name}>
              <a
                className="pill pill-line"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.name}
                <ArrowIcon />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="contact-ticket">
        <ContactForm labels={labels} lang={lang} />
      </div>
    </section>
  );
}

export function NotFoundView({ lang }: { lang: Lang }) {
  const t = UI[lang].notFound;
  return (
    <section className="not-found shell">
      <p className="nf-sun" aria-hidden="true">
        404
      </p>
      <h1 className="sign sign-1">{t.title}</h1>
      <p className="lead">{t.lead}</p>
      <Link className="pill pill-sun" href={pagePath(lang, "home")}>
        {t.back}
        <ArrowIcon />
      </Link>
    </section>
  );
}
