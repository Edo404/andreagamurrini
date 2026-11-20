import type { ReactNode } from "react";

/** Titolo in due voci: la parte `soft` in serif corsivo (sentimento), il resto in grotesk (ragione). */
export function Title({
  as: Tag = "h2",
  soft,
  hard,
  className = "",
  id,
}: {
  as?: "h1" | "h2" | "h3";
  soft?: string;
  hard: string;
  className?: string;
  id?: string;
}) {
  return (
    <Tag className={`title ${className}`} id={id}>
      {soft && <em>{soft} </em>}
      {hard}
    </Tag>
  );
}

export function Kicker({ children, num }: { children: ReactNode; num?: string }) {
  return (
    <p className="kicker">
      {num && <span className="kicker-num">{num}</span>}
      {children}
    </p>
  );
}

/** Timbro circolare che gira: testo su cerchio con il logo al centro. */
export function SpinBadge({ text, size = 168 }: { text: string; size?: number }) {
  const label = `${text} · ${text} · `;
  return (
    <div className="spin-badge" style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href="#badge-circle" textLength="488" lengthAdjust="spacing">
            {label}
          </textPath>
        </text>
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/logo.webp" alt="Andrea Gamurrini" width={84} height={84} />
    </div>
  );
}

/** Copertina con il vinile che esce dalla busta. */
export function Sleeve({
  cover,
  title,
  href,
  size = "md",
  stamp,
  priority = false,
}: {
  cover: string;
  title: string;
  href?: string;
  size?: "md" | "lg";
  stamp?: string;
  priority?: boolean;
}) {
  const inner = (
    <>
      <span className="vinyl" aria-hidden="true">
        <span className="vinyl-label" style={{ backgroundImage: `url(${cover})` }} />
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
    <a className={`sleeve sleeve-${size}`} href={href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <div className={`sleeve sleeve-${size}`}>{inner}</div>
  );
}

export function PageHero({ kicker, soft, hard, lead, num }: { kicker?: string; soft?: string; hard: string; lead?: string; num?: string }) {
  return (
    <header className="page-hero wrap">
      {kicker && <Kicker num={num}>{kicker}</Kicker>}
      <Title as="h1" soft={soft} hard={hard} className="title-xl" />
      {lead && <p className="lead">{lead}</p>}
    </header>
  );
}
