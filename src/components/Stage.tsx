import { createElement, type CSSProperties } from "react";
import type { PageData, PageElement, Rect } from "@/lib/content";
import { buildRenderTree, type RenderNode } from "@/lib/layout";
import type { Lang } from "@/lib/i18n";
import { YouTube } from "./YouTube";
import { Gallery } from "./Gallery";
import { galleryHeight } from "@/lib/gallery";
import { EventsList } from "./EventsList";
import { ContactForm } from "./ContactForm";
import { PushLayout } from "./PushLayout";

type Origin = { x: number; y: number };

const pos = (r: Rect, origin: Origin, order: number): CSSProperties =>
  ({
    "--x": r.x - origin.x,
    "--y": r.y - origin.y,
    "--w": r.w,
    "--h": r.h,
    "--o": order,
  }) as CSSProperties;

const pct = (r: Rect, g: Rect): CSSProperties => ({
  left: `${((r.x - g.x) / g.w) * 100}%`,
  top: `${((r.y - g.y) / g.h) * 100}%`,
  width: `${(r.w / g.w) * 100}%`,
  height: `${(r.h / g.h) * 100}%`,
});

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

function ElementView({ el, lang }: { el: PageElement; lang: Lang }) {
  switch (el.type) {
    case "text":
      return (
        <div className="rt">
          {el.paragraphs.map((p, i) =>
            createElement(p.tag === "li" ? "p" : p.tag, {
              key: i,
              // "normal" dipende dal font: con i sostituti sarebbe più alto di Futura/DIN su Wix (~1.33)
              style: { ...p.style, lineHeight: p.style.lineHeight === "normal" ? 1.33 : p.style.lineHeight } as CSSProperties,
              dangerouslySetInnerHTML: { __html: p.html },
            }),
          )}
        </div>
      );
    case "image": {
      const img = (
        // eslint-disable-next-line @next/next/no-img-element -- immagini già ottimizzate in /public/media
        <img
          src={el.src}
          alt={el.alt}
          width={el.w}
          height={el.h}
          loading="lazy"
          decoding="async"
          style={{ objectFit: (el.fit as CSSProperties["objectFit"]) ?? "cover", borderRadius: el.radius }}
        />
      );
      if (!el.href) return img;
      return (
        <a href={el.href} {...(isExternal(el.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {img}
        </a>
      );
    }
    case "video":
      return <YouTube id={el.youtubeId} title={el.title} lang={lang} />;
    case "box":
      return (
        <div
          className="box"
          style={{ background: el.bg, borderRadius: el.radius, boxShadow: el.shadow, border: el.border }}
        />
      );
    case "gallery":
      return <Gallery images={el.images} width={el.w} lang={lang} />;
    case "events":
      return <EventsList items={el.items} />;
    case "contactForm":
      return <ContactForm labels={el.labels} lang={lang} />;
  }
}

function NodeView({ node, origin, lang }: { node: RenderNode; origin: Origin; lang: Lang }) {
  if (node.kind === "single") {
    return (
      <div className={`el el-${node.el.type}`} style={pos(node.rect, origin, node.order)}>
        <ElementView el={node.el} lang={lang} />
      </div>
    );
  }
  if (node.kind === "panel") {
    const b = node.box;
    // Con un solo testo/lista dentro, il pannello cresce insieme al contenuto: i font sostitutivi
    // non hanno le stesse metriche di quelli Wix e il testo non deve uscire dal riquadro.
    const flowing = node.children.filter(
      (c) => c.kind === "single" && (c.el.type === "text" || c.el.type === "events"),
    );
    const grow = flowing.length === 1 ? flowing[0] : undefined;
    const border = parseFloat(b.border ?? "0") || 0;
    const growStyle = grow
      ? ({
          "--pad-top": Math.max(0, grow.rect.y - b.y - border),
          "--pad-bottom": Math.max(0, b.y + b.h - (grow.rect.y + grow.rect.h) - border),
        } as CSSProperties)
      : undefined;
    return (
      <div
        className={`el el-panel${grow ? " grow" : ""}`}
        style={{
          ...pos(node.rect, origin, node.order),
          ...growStyle,
          ...({ "--bw": border } as CSSProperties),
          background: b.bg,
          borderRadius: b.radius,
          boxShadow: b.shadow,
          border: b.border,
        }}
      >
        {node.children.map((c, i) => (
          <div key={i} className={`contents${c === grow ? " grow-child" : ""}`}>
            <NodeView node={c} origin={{ x: b.x, y: b.y }} lang={lang} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="el el-group" style={pos(node.rect, origin, node.order)}>
      {node.els.map((e, i) => (
        <div key={i} className={`gchild el-${e.type}`} style={pct(e, node.rect)}>
          <ElementView el={e} lang={lang} />
        </div>
      ))}
    </div>
  );
}

export function Stage({ page }: { page: PageData }) {
  const tree = buildRenderTree(page.elements);
  // la galleria è impaginata in modo deterministico: la pagina deve contenerla tutta
  const gallery = page.elements.find((e) => e.type === "gallery");
  const height = gallery
    ? Math.max(page.stageHeight, gallery.y + galleryHeight(gallery.images, gallery.w) + 60)
    : page.stageHeight;

  return (
    <div className="stage" style={{ "--stage-h": height } as CSSProperties}>
      {tree.map((n, i) => (
        <NodeView key={i} node={n} origin={{ x: 0, y: 0 }} lang={page.lang} />
      ))}
      <PushLayout />
    </div>
  );
}
