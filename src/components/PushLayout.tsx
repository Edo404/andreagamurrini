"use client";

import { useEffect } from "react";

/**
 * Come Wix: se un pannello di testo diventa più alto del previsto (font sostitutivi, testo modificato),
 * gli elementi che stanno sotto vengono spinti in basso della stessa misura e la pagina si allunga.
 * Agisce solo sul layout desktop (elementi in posizione assoluta).
 */
export function PushLayout() {
  useEffect(() => {
    const stage = document.querySelector<HTMLElement>(".stage");
    if (!stage) return;

    const apply = () => {
      const nodes = [...stage.children] as HTMLElement[];
      nodes.forEach((n) => (n.style.translate = ""));
      stage.style.removeProperty("--push");
      if (getComputedStyle(nodes[0] ?? stage).position !== "absolute") return; // layout mobile

      const num = (el: HTMLElement, v: string) => parseFloat(getComputedStyle(el).getPropertyValue(v)) || 0;
      const growing = nodes
        .filter((n) => n.classList.contains("grow"))
        .map((n) => ({
          left: num(n, "--x"),
          right: num(n, "--x") + num(n, "--w"),
          bottom: num(n, "--y") + num(n, "--h"),
          delta: n.offsetHeight - num(n, "--h"),
        }))
        .filter((g) => g.delta > 0);
      if (!growing.length) return;

      let before = 0; // fondo del contenuto previsto
      let after = 0; // fondo reale dopo gli spostamenti
      for (const n of nodes) {
        const top = num(n, "--y");
        const bottom = top + num(n, "--h");
        before = Math.max(before, bottom);
        if (n.classList.contains("grow")) {
          after = Math.max(after, top + n.offsetHeight);
          continue;
        }
        const left = num(n, "--x");
        const right = left + num(n, "--w");
        // si spostano solo gli elementi sotto il pannello e nella stessa colonna
        const shift = growing
          .filter((g) => top >= g.bottom - 1 && left < g.right && right > g.left)
          .reduce((s, g) => s + g.delta, 0);
        if (shift) n.style.translate = `0 ${shift}px`;
        after = Math.max(after, bottom + shift);
      }
      stage.style.setProperty("--push", String(Math.max(0, after - before)));
    };

    apply();
    const ro = new ResizeObserver(apply);
    stage.querySelectorAll(".grow").forEach((g) => ro.observe(g));
    document.fonts?.ready.then(apply);
    window.addEventListener("resize", apply);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);

  return null;
}
