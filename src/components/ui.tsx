/**
 * Titolo della sezione Stampa (congelata, vedi src/app/press.css): non usarlo altrove.
 * Le altre sezioni usano <Sign>.
 */
export function Title({
  soft,
  hard,
  className = "",
  id,
}: {
  soft?: string;
  hard: string;
  className?: string;
  id?: string;
}) {
  return (
    <h2 className={`title ${className}`} id={id}>
      {soft && <em>{soft} </em>}
      {hard}
    </h2>
  );
}

/** Titolo dipinto come un'insegna: `tone` è la parte in giallo sole, `hard` in bianco calce. */
export function Sign({
  as: Tag = "h2",
  tone,
  hard,
  size = 2,
  id,
  className = "",
}: {
  as?: "h1" | "h2" | "h3";
  tone?: string;
  hard: string;
  size?: 1 | 2 | 3;
  id?: string;
  className?: string;
}) {
  return (
    <Tag className={`sign sign-${size} ${className}`} id={id}>
      {tone && <span className="sign-tone">{tone} </span>}
      {hard}
    </Tag>
  );
}

// onda: 12 creste su 1440 unità, la stessa forma per linee e bordi
const WAVE =
  "M0 20 " +
  Array.from(
    { length: 12 },
    (_, i) =>
      `Q ${i * 120 + 30} ${i % 2 ? 36 : 4} ${i * 120 + 60} 20 T ${i * 120 + 120} 20`,
  ).join(" ");

/** Pennellata a onda (suono e mare). Si disegna da sola quando entra nello schermo. */
export function Wave({
  className = "",
  draw = true,
}: {
  className?: string;
  draw?: boolean;
}) {
  const svg = (
    <svg
      className={`wave ${draw ? "" : className}`}
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={WAVE} />
    </svg>
  );
  // la pennellata entra da sinistra: solo transform, dentro un contenitore che la ritaglia
  return draw ? (
    <span className={`wave-draw ${className}`} aria-hidden="true">
      {svg}
    </span>
  ) : (
    svg
  );
}

/** Bordo a onda pieno tra due fondi: `fill` è il colore della sezione che inizia. */
export function WaveEdge({
  fill,
  className = "",
  flip = false,
}: {
  fill: string;
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      className={`wave-edge ${flip ? "wave-edge-flip" : ""} ${className}`}
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      style={{ color: fill }}
    >
      <path d={`${WAVE} V 40 H 0 Z`} fill="currentColor" />
    </svg>
  );
}

/** Timbro che gira: il logo tondo di dr.gam con il motto intorno, come un adesivo. */
export function SpinBadge({
  text,
  size = 168,
}: {
  text: string;
  size?: number;
}) {
  const label = `${text} · ${text} · `;
  return (
    <div className="spin-badge" style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path
            id="badge-circle"
            d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
          />
        </defs>
        <text>
          <textPath
            href="#badge-circle"
            textLength="488"
            lengthAdjust="spacing"
          >
            {label}
          </textPath>
        </text>
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/logo.webp"
        alt="Andrea Gamurrini"
        width={84}
        height={84}
      />
    </div>
  );
}

/** Copertina con il vinile che esce dalla busta. */
export function Sleeve({
  cover,
  title,
  href,
  stamp,
  priority = false,
}: {
  cover: string;
  title: string;
  href?: string;
  stamp?: string;
  priority?: boolean;
}) {
  const inner = (
    <>
      <span className="vinyl" aria-hidden="true">
        <span
          className="vinyl-label"
          style={{ backgroundImage: `url(${cover})` }}
        />
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="sleeve-cover"
        src={cover}
        alt={title}
        width={600}
        height={600}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
      {stamp && (
        <span className="stamp" aria-hidden="true">
          {stamp}
        </span>
      )}
    </>
  );
  return href ? (
    <a className="sleeve" href={href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <div className="sleeve">{inner}</div>
  );
}

/** Testata delle pagine interne: un'insegna su una fascia di colore con l'onda sotto. */
export function PageHero({
  tone,
  hard,
  lead,
}: {
  tone?: string;
  hard: string;
  lead?: string;
}) {
  return (
    <header className="page-hero">
      <div className="shell page-hero-inner">
        <Sign as="h1" tone={tone} hard={hard} size={1} />
        {lead && <p className="lead">{lead}</p>}
      </div>
      <Wave className="page-hero-wave" />
    </header>
  );
}
