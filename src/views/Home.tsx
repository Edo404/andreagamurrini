import Link from "next/link";
import { ArrowRight, ArrowUpRight, Play } from "@phosphor-icons/react/dist/ssr";
import { pagePath, type Lang } from "@/lib/i18n";
import { UI } from "@/data/ui";
import { LISTEN, PHOTOS, PRESS, RELEASES, VIDEOS } from "@/data/catalog";
import texts from "@/data/texts.json";
import gallery from "@/data/gallery.json";
import { Wordmark } from "@/components/Header";
import { Halftone, Title, Vinyl } from "@/components/ui";
import { YouTube } from "@/components/YouTube";
import { Expandable } from "@/components/Expandable";
import { Gallery } from "@/components/Gallery";
import { Contact, Studio } from "@/views/Pages";

/** Citazione lunga → estratto: si ferma dove si ferma la frase dell'autore (… o ;), mai a metà. */
function excerpt(q: string, max = 230) {
  const clean = q
    .split("\n")[0]
    .replace(/^[“"”]+|[“"”]+$/g, "")
    .replace(/…+|\.{3,}/g, "…");
  const stop = clean.search(/…|;/);
  if (stop > 60 && stop <= max) return clean.slice(0, stop).trim() + "…";
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

  // lato A: i singoli; lato B: gli album e le edizioni fisiche
  const sideA = RELEASES.filter((r) => r.kind === "single");
  const sideB = [
    ...RELEASES.filter((r) => r.kind === "album" && r !== live),
    ...RELEASES.filter((r) => r.kind === "cd"),
  ];
  const kind = (k: string) =>
    k === "single" ? t.music.single : k === "album" ? t.music.album : "CD";

  const track = (r: (typeof RELEASES)[number]) => (
    <article className="track">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="track-cover"
        src={r.cover}
        alt={`${r.title}, cover`}
        width={600}
        height={600}
        loading="lazy"
        decoding="async"
      />
      <div className="track-text">
        <h3 className="track-title">
          {r.href ? (
            <a href={r.href} target="_blank" rel="noopener noreferrer">
              {r.title}
            </a>
          ) : (
            r.title
          )}
        </h3>
        <p className="track-meta">
          {[kind(r.kind), r.year].filter(Boolean).join(", ")}
          {r.edition && <>, {r.edition[lang]}</>}
        </p>
      </div>
      {r.soldOut && <span className="track-stamp">{t.music.soldOut}</span>}
      {r.href && (
        <ArrowUpRight className="track-go" size={22} aria-hidden="true" />
      )}
    </article>
  );

  return (
    <>
      {/* ---------- la copertina aperta: palco a sinistra, pannello rosso a destra ---------- */}
      <section className="gatefold" aria-labelledby="hero-title">
        <Halftone
          className="gf-photo"
          src={PHOTOS.live.src}
          alt={t.alt.live}
          w={PHOTOS.live.w}
          h={PHOTOS.live.h}
          priority
        />
        <div className="gf-panel">
          <h1 id="hero-title" className="gf-name">
            <Wordmark />
            <span className="gf-role">{t.role}</span>
          </h1>

          <article className="gf-record" aria-labelledby="record-title">
            <div className="gf-sleeve">
              <Vinyl className="gf-vinyl" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="gf-cover"
                src={live.cover}
                alt={`${live.title}, cover`}
                width={600}
                height={600}
              />
            </div>
            <div className="gf-record-text">
              <h2 id="record-title" className="gf-title">
                {live.title}
              </h2>
              <p className="gf-meta">
                {t.outNow}, {live.year}
              </p>
              <p className="gf-desc">{t.liveInRome.desc}</p>
              <div className="gf-actions">
                <a
                  className="btn btn-paper"
                  href={live.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Play weight="fill" size={18} aria-hidden="true" />
                  {t.liveInRome.listen}
                </a>
                <a className="link-line" href="#videos">
                  {t.liveInRome.watch}
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ---------- note di copertina: i fatti della bio, impaginati come i crediti ---------- */}
      <section className="liner shell" aria-label="dr.gam">
        <ul className="liner-facts">
          {t.facts.map((f, i) => (
            <li key={i}>
              <b>{f.n}</b> {f.label}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- musica: il retro della copertina, lato A e lato B ---------- */}
      <section id="music" className="tracklist" aria-labelledby="music-title">
        <div className="shell">
          <Title
            id="music-title"
            soft={t.heads.records.soft}
            hard={t.heads.records.hard}
          />
          <div className="sides">
            <section className="side" aria-label={`${t.music.single}`}>
              <p className="side-label" aria-hidden="true">
                A
              </p>
              <Expandable
                className="side-list"
                as="ol"
                initial={5}
                moreLabel={t.more}
                lessLabel={t.less}
                items={sideA.map((r, i) => (
                  <div key={i}>{track(r)}</div>
                ))}
              />
            </section>
            <section className="side" aria-label={t.music.album}>
              <p className="side-label" aria-hidden="true">
                B
              </p>
              <Expandable
                className="side-list"
                as="ol"
                initial={5}
                moreLabel={t.more}
                lessLabel={t.less}
                items={sideB.map((r, i) => (
                  <div key={i}>{track(r)}</div>
                ))}
              />
            </section>
          </div>
          <ul className="listen-row" aria-label={t.liveInRome.listen}>
            {LISTEN.map((l) => (
              <li key={l.name}>
                <a
                  className="btn btn-ghost"
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {l.name}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- video: il palco in blu, un grande schermo e la scaletta ---------- */}
      <section id="videos" className="stage" aria-labelledby="videos-title">
        <div className="shell stage-inner">
          <Title
            id="videos-title"
            soft={t.heads.videos.soft}
            hard={t.heads.videos.hard}
          />
          <div className="stage-grid">
            <div className="stage-screen">
              <YouTube
                id={featured.id}
                title={featured.title}
                lang={lang}
                large
              />
              <p className="stage-caption">{featured.title}</p>
            </div>
            <Expandable
              className="setlist"
              as="ol"
              initial={6}
              moreLabel={t.more}
              lessLabel={t.less}
              items={moreVideos.map((v) => (
                <YouTube key={v.id} id={v.id} title={v.title} lang={lang} row />
              ))}
            />
          </div>
        </div>
      </section>

      {/* ---------- manifesto: una frase della stampa a tutta pagina sul rosso ---------- */}
      <section className="manifesto" aria-label={t.music.quotes}>
        <blockquote className="shell manifesto-quote">
          <p>{excerpt(quote.quote)}</p>
          <footer>{quote.source}</footer>
        </blockquote>
      </section>

      {/* ---------- storia: la pagina del libretto ---------- */}
      <section className="booklet shell" aria-labelledby="story-teaser-title">
        <Halftone
          className="booklet-photo"
          src={PHOTOS.ivy.src}
          alt={t.alt.ivy}
          w={PHOTOS.ivy.w}
          h={PHOTOS.ivy.h}
          ink="black"
        />
        <div className="booklet-text">
          <h2 id="story-teaser-title" className="title title-2">
            {t.motto}
          </h2>
          <p>{bio[1]}</p>
          <Link href={pagePath(lang, "bio")} className="btn btn-red">
            {t.storyCta}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ---------- galleria: il foglio dei provini ---------- */}
      <section
        id="gallery"
        className="contact-sheet"
        aria-labelledby="gallery-title"
      >
        <div className="shell">
          <Title
            id="gallery-title"
            soft={t.heads.gallery.soft}
            hard={t.heads.gallery.hard}
          />
          <Gallery images={gallery} lang={lang} initial={8} />
        </div>
      </section>

      {/* ---------- stampa: i ritagli incollati ---------- */}
      <section id="press" className="clippings" aria-labelledby="press-title">
        <div className="shell">
          <Title
            id="press-title"
            soft={t.heads.stampa.soft}
            hard={t.heads.stampa.hard}
          />
          <Expandable
            className="clip-wall"
            initial={9}
            moreLabel={t.more}
            lessLabel={t.less}
            items={PRESS.map((p, i) => {
              const name =
                p.outlet === "Press clipping" ? t.press.clippings : p.outlet;
              return (
                <a
                  key={i}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clip"
                  title={name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.logo}
                    alt={name}
                    width={p.w}
                    height={p.h}
                    loading="lazy"
                  />
                </a>
              );
            })}
          />
        </div>
      </section>

      {/* ---------- in fondo: lo studio e l'etichetta, poi il retro della copertina per scrivere ---------- */}
      <Studio lang={lang} />
      <Contact lang={lang} />
    </>
  );
}
