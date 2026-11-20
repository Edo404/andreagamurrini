import type { EventsElement } from "@/lib/content";

export function EventsList({ items }: { items: EventsElement["items"] }) {
  return (
    <ol className="events">
      {items.map((ev, i) => (
        <li key={i}>
          <p className="ev-date">{ev.date}</p>
          <p className="ev-title">
            {ev.titleHref ? (
              <a href={ev.titleHref} target="_blank" rel="noopener noreferrer">
                {ev.title}
              </a>
            ) : (
              ev.title
            )}
          </p>
          {ev.lines.map((l, j) => (
            <p
              key={j}
              className="ev-line"
              style={{ color: l.color, fontStyle: l.italic ? "italic" : undefined, fontWeight: l.bold ? 700 : undefined }}
            >
              {l.href ? (
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.text}
                </a>
              ) : (
                l.text
              )}
            </p>
          ))}
        </li>
      ))}
    </ol>
  );
}
