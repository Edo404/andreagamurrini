"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Mostra i primi `initial` elementi; il pulsante "Altri" apre il resto.
 * Gli elementi nascosti sono già nell'HTML (motori di ricerca, nessun caricamento extra).
 */
export function Expandable({
  items,
  initial,
  moreLabel,
  lessLabel,
  className,
  as: Tag = "ul",
  buttonClassName = "btn",
}: {
  items: ReactNode[];
  initial: number;
  moreLabel: string;
  lessLabel: string;
  className: string;
  as?: "ul" | "ol" | "div";
  /** "btn" è lo stile congelato della sezione Stampa; le altre sezioni passano "pill pill-sun". */
  buttonClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const hidden = items.length - initial;
  const Item = Tag === "div" ? "div" : "li";

  return (
    <>
      <Tag id={id} className={`${className}${open ? " is-open" : ""}`}>
        {items.map((it, i) => (
          <Item
            key={i}
            className={i >= initial ? "x-more" : undefined}
            hidden={i >= initial && !open}
            style={{ "--k": i - initial } as React.CSSProperties}
          >
            {it}
          </Item>
        ))}
      </Tag>
      {hidden > 0 && (
        <div className="x-toggle">
          <button
            type="button"
            className={buttonClassName}
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? lessLabel : `${moreLabel} (${hidden})`}
            <span className="x-icon" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
