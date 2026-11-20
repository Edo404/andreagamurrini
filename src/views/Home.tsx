import Link from "next/link";
import { pagePath, type Lang } from "@/lib/i18n";
import { UI } from "@/data/ui";
import { PHOTOS, PRESS, RELEASES, VIDEOS } from "@/data/catalog";
import texts from "@/data/texts.json";
import { Wordmark } from "@/components/Header";
import { Kicker, Marquee, Sleeve, SpinBadge, Title } from "@/components/ui";
import { YouTube } from "@/components/YouTube";

export function Home({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const live = RELEASES[0];
  const quote = texts.quotes[lang][0];
  const bio = texts.bio[lang];
  const [featured, ...more] = VIDEOS;

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
          <Kicker num="01">
            {t.outNow} · {t.liveInRome.kicker}
          </Kicker>
          <Title id="out-now-title" soft="Live" hard="in Rome" className="title-xl" />
          <p className="lead">{t.liveInRome.desc}</p>
          <div className="actions">
            <a className="btn btn-solid" href={live.href} target="_blank" rel="noopener noreferrer">
              {t.liveInRome.listen}
            </a>
            <a className="btn" href={`https://www.youtube.com/watch?v=${featured.id}`} target="_blank" rel="noopener noreferrer">
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
      <section className="facts wrap" aria-label="dr.gam in numbers">
        {t.facts.map((f, i) => (
          <div key={i} className="fact reveal">
            <span className="fact-n">{f.n}</span>
            <span className="fact-l">{f.label}</span>
          </div>
        ))}
      </section>

      {/* ---------- video ---------- */}
      <section className="home-videos wrap" aria-labelledby="home-videos-title">
        <div className="section-head">
          <Kicker num="02">{t.latestVideos}</Kicker>
          <Link href={pagePath(lang, "videos")} className="link-arrow">
            {t.allVideos} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <h2 id="home-videos-title" className="sr-only">
          {t.latestVideos}
        </h2>
        <div className="home-videos-grid">
          <div className="video-featured reveal">
            <YouTube id={featured.id} title={featured.title} lang={lang} large />
          </div>
          <ol className="video-list">
            {more.slice(0, 4).map((v, i) => (
              <li key={v.id} className="reveal">
                <YouTube id={v.id} title={v.title} lang={lang} compact index={i + 2} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- citazione ---------- */}
      <section className="big-quote wrap reveal" aria-label={t.music.quotes}>
        <blockquote>
          <p>“{quote.quote.replace(/^[“"”]+|[“"”]+$/g, "")}”</p>
          <footer>— {quote.source}</footer>
        </blockquote>
      </section>

      {/* ---------- storia ---------- */}
      <section className="story-teaser wrap" aria-labelledby="story-teaser-title">
        <figure className="story-teaser-img reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PHOTOS.rocks.src} alt="dr.gam" width={PHOTOS.rocks.w} height={PHOTOS.rocks.h} loading="lazy" />
        </figure>
        <div className="story-teaser-text reveal">
          <Kicker num="03">{t.storyKicker}</Kicker>
          <h2 id="story-teaser-title" className="title title-l">
            <em>{t.motto}</em>
          </h2>
          <p className="lead">{bio[1]}</p>
          <p>{bio[2]}</p>
          <Link href={pagePath(lang, "bio")} className="btn">
            {t.storyCta} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ---------- stampa ---------- */}
      <section className="press-strip" aria-labelledby="press-strip-title">
        <div className="section-head wrap">
          <Kicker num="04">
            <span id="press-strip-title">{t.pressKicker}</span>
          </Kicker>
          <Link href={pagePath(lang, "stampa")} className="link-arrow">
            {t.pressCta} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <Marquee
          speed={70}
          reverse
          items={PRESS.filter((p) => p.outlet !== "Press clipping")
            .slice(0, 18)
            .map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p.logo + p.href} src={p.logo} alt={p.outlet} width={p.w} height={p.h} loading="lazy" className="press-logo" />
            ))}
        />
      </section>
    </>
  );
}
