import Link from "next/link";
import { pagePath, type Lang } from "@/lib/i18n";
import { UI } from "@/data/ui";
import { LISTEN, PHOTOS, PRESS, RELEASES, VIDEOS } from "@/data/catalog";
import texts from "@/data/texts.json";
import gallery from "@/data/gallery.json";
import { Wordmark } from "@/components/Header";
import { Kicker, Marquee, Sleeve, SpinBadge, Title } from "@/components/ui";
import { YouTube } from "@/components/YouTube";
import { Expandable } from "@/components/Expandable";
import { Gallery } from "@/components/Gallery";

/** Citazione lunga → estratto di circa due righe, tagliato su una parola. */
function excerpt(q: string, max = 150) {
  const clean = q.replace(/^[“"”]+|[“"”]+$/g, "").replace(/…+|\.{3,}/g, "…");
  if (clean.length <= max) return clean;
  return clean.slice(0, clean.lastIndexOf(" ", max)).replace(/[,;:]$/, "") + "…";
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
      {/* ---------- apertura ---------- */}
      <section className="hero" aria-label="dr.gam">
        <div className="hero-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PHOTOS.portrait.src} alt="dr.gam" width={PHOTOS.portrait.w} height={PHOTOS.portrait.h} fetchPriority="high" />
        </div>
        <div className="hero-top wrap">
          <p className="hero-role">{t.role}</p>
          <p className="hero-name">Andrea Gamurrini</p>
        </div>
        <div className="hero-badge">
          <SpinBadge text={t.motto} />
        </div>
        <h1 className="hero-mark">
          <Wordmark />
        </h1>
      </section>

      {/* ---------- ultima uscita ---------- */}
      <section className="out-now wrap" aria-labelledby="out-now-title">
        <div className="out-now-sleeve reveal">
          <Sleeve cover={live.cover} title={live.title} href={live.href} size="lg" priority />
        </div>
        <div className="out-now-text reveal">
          <Kicker>
            {t.outNow} · {t.liveInRome.kicker}
          </Kicker>
          <Title id="out-now-title" soft="Live" hard="in Rome" className="title-xl" />
          <p className="lead">{t.liveInRome.desc}</p>
          <div className="actions">
            <a className="btn btn-solid" href={live.href} target="_blank" rel="noopener noreferrer">
              {t.liveInRome.listen}
            </a>
            <a className="btn" href="#videos">
              {t.liveInRome.watch}
            </a>
          </div>
        </div>
      </section>

      <Marquee
        speed={36}
        items={t.genres.map((g, i) => (
          <span key={g} className={i % 2 ? "mq-outline" : "mq-solid"}>
            {g}
          </span>
        ))}
      />

      {/* ---------- numeri ---------- */}
      <section className="facts wrap" aria-label="dr.gam">
        {t.facts.map((f, i) => (
          <div key={i} className="fact reveal">
            <span className="fact-n">{f.n}</span>
            <span className="fact-l">{f.label}</span>
          </div>
        ))}
      </section>

      {/* ---------- musica ---------- */}
      <section id="music" className="home-section wrap" aria-labelledby="music-title">
        <Title id="music-title" {...t.heads.records} className="title-l section-title" />
        <Expandable
          className="music-grid"
          initial={6}
          moreLabel={t.more}
          lessLabel={t.less}
          items={music.map((r, i) => (
            <article key={i} className="release reveal">
              <Sleeve cover={r.cover} title={r.title} href={r.href} stamp={r.soldOut ? t.music.soldOut : undefined} />
              <div className="release-meta">
                <h3 className="release-title">{r.title}</h3>
                <p className="num">
                  {[r.kind === "single" ? t.music.single : r.kind === "album" ? t.music.album : "CD", r.year].filter(Boolean).join(" · ")}
                </p>
                {r.edition && <p className="muted release-edition">{r.edition[lang]}</p>}
              </div>
            </article>
          ))}
        />
        <ul className="listen-row">
          {LISTEN.map((l) => (
            <li key={l.name}>
              <a className="link-arrow" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.name} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- video ---------- */}
      <section id="videos" className="home-section wrap" aria-labelledby="videos-title">
        <Title id="videos-title" {...t.heads.videos} className="title-l section-title" />
        <div className="video-featured reveal">
          <YouTube id={featured.id} title={featured.title} lang={lang} large />
        </div>
        <Expandable
          className="videos-grid"
          initial={6}
          moreLabel={t.more}
          lessLabel={t.less}
          items={moreVideos.map((v) => (
            <YouTube key={v.id} id={v.id} title={v.title} lang={lang} />
          ))}
        />
      </section>

      {/* ---------- citazione ---------- */}
      <section className="big-quote wrap reveal" aria-label={t.music.quotes}>
        <blockquote>
          <p>“{excerpt(quote.quote)}”</p>
          <footer>{quote.source}</footer>
        </blockquote>
      </section>

      {/* ---------- storia ---------- */}
      <section className="story-teaser wrap" aria-labelledby="story-teaser-title">
        <figure className="story-teaser-img reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PHOTOS.rocks.src} alt="dr.gam" width={PHOTOS.rocks.w} height={PHOTOS.rocks.h} loading="lazy" />
        </figure>
        <div className="story-teaser-text reveal">
          <h2 id="story-teaser-title" className="title title-l">
            <em>{t.motto}</em>
          </h2>
          <p className="lead">{bio[1]}</p>
          <Link href={pagePath(lang, "bio")} className="btn">
            {t.storyCta} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ---------- galleria ---------- */}
      <section id="gallery" className="home-section wrap" aria-labelledby="gallery-title">
        <Title id="gallery-title" {...t.heads.gallery} className="title-l section-title" />
        <Gallery images={gallery} lang={lang} initial={6} />
      </section>

      {/* ---------- stampa ---------- */}
      <section id="press" className="home-section wrap" aria-labelledby="press-title">
        <Title id="press-title" {...t.heads.stampa} className="title-l section-title" />
        <Expandable
          className="press-grid"
          initial={9}
          moreLabel={t.more}
          lessLabel={t.less}
          items={PRESS.map((p, i) => (
            <a key={i} href={p.href} target="_blank" rel="noopener noreferrer" className="press-tile" title={p.outlet === "Press clipping" ? t.press.clippings : p.outlet}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.logo} alt={p.outlet === "Press clipping" ? t.press.clippings : p.outlet} width={p.w} height={p.h} loading="lazy" />
            </a>
          ))}
        />
      </section>
    </>
  );
}
