/**
 * Titolo di sezione stampato sulla copertina: `soft` a larghezza normale, `hard` largo e nero.
 * Stessa famiglia, due larghezze: l'enfasi viene dalla larghezza, non da un altro carattere.
 */
export function Title({
  as: Tag = "h2",
  soft,
  hard,
  size = 2,
  id,
  className = "",
}: {
  as?: "h1" | "h2" | "h3";
  soft?: string;
  hard: string;
  size?: 1 | 2 | 3;
  id?: string;
  className?: string;
}) {
  return (
    <Tag className={`title title-${size} ${className}`} id={id}>
      {soft && <span className="title-soft">{soft} </span>}
      {hard}
    </Tag>
  );
}

/** Il disco: vinile nero con il logo tondo di dr.gam come etichetta centrale. */
export function Vinyl({ className = "" }: { className?: string }) {
  return (
    <span className={`vinyl ${className}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="vinyl-label"
        src="/media/logo.webp"
        alt=""
        width={84}
        height={84}
      />
    </span>
  );
}

/** Foto stampata a un solo inchiostro (retino): `ink` sceglie il colore di stampa. */
export function Halftone({
  src,
  alt,
  w,
  h,
  ink = "blue",
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  ink?: "blue" | "red" | "black";
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`halftone ink-${ink} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={w}
        height={h}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </figure>
  );
}

/** Testata delle pagine interne: il pannello rosso della copertina, con la piega. */
export function PageHero({
  soft,
  hard,
  lead,
}: {
  soft?: string;
  hard: string;
  lead?: string;
}) {
  return (
    <header className="page-hero">
      <div className="shell page-hero-inner">
        <Title as="h1" soft={soft} hard={hard} size={1} />
        {lead && <p className="lead">{lead}</p>}
      </div>
    </header>
  );
}
