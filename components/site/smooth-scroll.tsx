"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";

type LenisLike = { raf: (t: number) => void; scrollTo: (target: HTMLElement | number, opts?: { offset?: number }) => void; destroy: () => void };
let lenis: LenisLike | null = null;

/** Scrolls to a section, through Lenis when it is running. */
export function scrollToId(id: string) {
  const el = id === "top" ? 0 : document.getElementById(id);
  if (el === null) return;
  if (lenis) lenis.scrollTo(el, { offset: typeof el === "number" ? 0 : -24 });
  else if (typeof el === "number") window.scrollTo({ top: 0, behavior: "smooth" });
  else el.scrollIntoView({ behavior: "smooth" });
  if (id !== "top") history.replaceState(null, "", `#${id}`);
}

/** Smooth wheel scrolling (Lenis), skipped when the visitor prefers reduced motion. */
export function SmoothScroll() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let cancelled = false;
    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.1, smoothWheel: true }) as unknown as LenisLike;
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, [reduced]);
  return null;
}
