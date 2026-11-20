import type { BoxElement, PageElement, Rect } from "./content";

/**
 * Prepara gli elementi di una pagina per il rendering:
 * - desktop: ogni nodo è posizionato in assoluto sulla griglia di 980px, come su Wix;
 * - mobile: i nodi scorrono in colonna nell'ordine di lettura (y, poi x).
 *
 * Tipi di nodo:
 * - single: un elemento da solo;
 * - panel: un box colorato con dentro testi/immagini; su mobile diventa un riquadro in cui i figli scorrono;
 * - group: immagini/video/box sovrapposti (es. bollino "SOLD OUT" sulla copertina), scalati insieme su mobile.
 */
export type RenderNode =
  | { kind: "single"; el: PageElement; rect: Rect; order: number }
  | { kind: "panel"; box: BoxElement; children: RenderNode[]; rect: Rect; order: number }
  | { kind: "group"; els: PageElement[]; rect: Rect; order: number };

const overlap = (a: Rect, b: Rect, min = 2) =>
  Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) > min &&
  Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) > min;

/** `inner` sta (quasi tutto) dentro `outer`: almeno l'80% della sua area è coperta. */
const contains = (outer: Rect, inner: Rect) => {
  const w = Math.min(outer.x + outer.w, inner.x + inner.w) - Math.max(outer.x, inner.x);
  const h = Math.min(outer.y + outer.h, inner.y + inner.h) - Math.max(outer.y, inner.y);
  return w > 0 && h > 0 && (w * h) / Math.max(1, inner.w * inner.h) >= 0.8;
};

const union = (rs: Rect[]): Rect => {
  const x = Math.min(...rs.map((r) => r.x));
  const y = Math.min(...rs.map((r) => r.y));
  return { x, y, w: Math.max(...rs.map((r) => r.x + r.w)) - x, h: Math.max(...rs.map((r) => r.y + r.h)) - y };
};

const isFlowing = (e: PageElement) =>
  e.type === "text" || e.type === "events" || e.type === "gallery" || e.type === "contactForm";

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
type Draft = DistributiveOmit<RenderNode, "order">;

function arrange(elements: PageElement[]): Draft[] {
  // pannelli: box che contengono almeno un testo o una lista
  const panels = elements.filter(
    (b): b is BoxElement => b.type === "box" && elements.some((e) => isFlowing(e) && contains(b, e)),
  );
  const claimed = new Set<PageElement>(panels);
  const panelChildren = new Map<BoxElement, PageElement[]>();
  for (const p of panels) {
    const kids = elements.filter((e) => !claimed.has(e) && e !== p && contains(p, e));
    kids.forEach((k) => claimed.add(k));
    panelChildren.set(p, kids);
  }

  const rest = elements.filter((e) => !claimed.has(e));
  const groupable = rest.filter((e) => !isFlowing(e));
  const parent = new Map<PageElement, PageElement>(groupable.map((e) => [e, e]));
  const find = (e: PageElement): PageElement => (parent.get(e) === e ? e : find(parent.get(e)!));
  for (let i = 0; i < groupable.length; i++)
    for (let j = i + 1; j < groupable.length; j++)
      if (overlap(groupable[i], groupable[j])) parent.set(find(groupable[i]), find(groupable[j]));
  const groups = new Map<PageElement, PageElement[]>();
  for (const e of groupable) groups.set(find(e), [...(groups.get(find(e)) ?? []), e]);

  const drafts: Draft[] = [];
  for (const p of panels) drafts.push({ kind: "panel", box: p, rect: p, children: sortTree(arrange(panelChildren.get(p)!)) });
  for (const e of rest.filter(isFlowing)) drafts.push({ kind: "single", el: e, rect: e });
  for (const els of groups.values()) {
    if (els.length === 1) drafts.push({ kind: "single", el: els[0], rect: els[0] });
    else
      drafts.push({
        kind: "group",
        // l'ordine nel DOM decide la sovrapposizione: box sotto, poi immagini/video
        els: [...els].sort((a, b) => (a.type === "box" ? 0 : 1) - (b.type === "box" ? 0 : 1)),
        rect: union(els),
      });
  }
  return drafts;
}

function sortTree(drafts: Draft[]): RenderNode[] {
  // ordine di lettura (mobile): per riga, poi da sinistra
  const reading = [...drafts].sort((a, b) => a.rect.y - b.rect.y || a.rect.x - b.rect.x);
  const order = new Map(reading.map((n, i) => [n, i]));
  // ordine di disegno (desktop): pannelli e box sotto
  const depth = (n: Draft) => (n.kind === "panel" || (n.kind === "single" && n.el.type === "box") ? 0 : 1);
  return [...drafts]
    .sort((a, b) => depth(a) - depth(b) || a.rect.y - b.rect.y || a.rect.x - b.rect.x)
    .map((n) => ({ ...n, order: order.get(n)! }) as RenderNode);
}

export function buildRenderTree(elements: PageElement[]): RenderNode[] {
  return sortTree(arrange(elements));
}
