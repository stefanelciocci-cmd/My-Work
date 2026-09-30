"use client";

// Adapted from React Bits Pro social-proof-15: spotlight quote with an author rail, timed progress
// and crossfade rotation. Rotation pauses on hover or focus and when reduced motion is preferred.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Linkedin } from "lucide-react";
import { recommendations } from "@/lib/content";
import { cn } from "@/lib/utils";
import { EASE, Reveal, Section, SectionHeader } from "./motion";

const ROTATE_MS = 9000;

function Initials({ text, index, size = "md" }: { text: string; index: number; size?: "md" | "lg" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-display font-semibold",
        size === "lg" ? "h-12 w-12 text-base" : "h-10 w-10 text-sm",
        index % 2 === 0 ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent",
      )}
    >
      {text}
    </span>
  );
}

export function Testimonials() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const pausedRef = useRef(false);
  const rec = recommendations[active];

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let elapsed = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const delta = now - last;
      last = now;
      if (!pausedRef.current) {
        elapsed += delta;
        const value = Math.min(elapsed / ROTATE_MS, 1);
        if (value >= 1) {
          setProgress(0);
          setActive((current) => (current + 1) % recommendations.length);
          return;
        }
        setProgress(value);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, reduced]);

  const show = (index: number) => {
    setProgress(0);
    setActive((index + recommendations.length) % recommendations.length);
  };

  const arrow =
    "grid h-11 w-11 cursor-pointer place-items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <Section id="testimonials" recessed>
      <SectionHeader eyebrow="Kind words" title="What people I've worked with say">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => show(active - 1)} aria-label="Previous recommendation" className={cn(arrow, "border border-border text-foreground hover:bg-secondary")}>
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => show(active + 1)} aria-label="Next recommendation" className={cn(arrow, "bg-primary text-primary-foreground hover:brightness-110")}>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </SectionHeader>

      <div className="mt-10 border-t border-border lg:mt-12" />

      <div
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onFocusCapture={() => (pausedRef.current = true)}
        onBlurCapture={() => (pausedRef.current = false)}
        className="mt-10 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-12 lg:gap-16"
      >
        <Reveal className="lg:col-span-8">
          <span aria-hidden className="block font-display text-7xl leading-none text-primary/30">
            &ldquo;
          </span>
          <div className="mt-2 grid min-h-[380px] sm:min-h-[320px]" aria-live="polite">
            <AnimatePresence initial={false}>
              <motion.figure
                key={active}
                initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -12 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="col-start-1 row-start-1"
              >
                <blockquote className="max-w-3xl text-pretty text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl lg:text-[1.75rem]">
                  {rec.quote}
                </blockquote>
                <figcaption className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
                  <div className="flex items-center gap-4">
                    <Initials text={rec.initials} index={active} size="lg" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{rec.name}</p>
                      <p className="text-sm text-muted-foreground">{rec.role}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">{rec.relationship}</span>
                  <a
                    href={rec.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
                  >
                    <Linkedin className="h-3.5 w-3.5" aria-hidden />
                    View on LinkedIn
                  </a>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal index={1} className="flex flex-col lg:col-span-4">
          {recommendations.map((entry, index) => {
            const isActive = index === active;
            return (
              <button
                key={entry.name}
                type="button"
                onClick={() => show(index)}
                aria-pressed={isActive}
                aria-label={`Show recommendation from ${entry.name}`}
                className="group cursor-pointer rounded-xl py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="flex items-center gap-4">
                  <Initials text={entry.initials} index={index} />
                  <span className="min-w-0 flex-1">
                    <span className={cn("block text-sm font-semibold transition-colors", isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground/80")}>
                      {entry.name}
                    </span>
                    <span className={cn("block text-xs transition-colors", isActive ? "text-muted-foreground" : "text-muted-foreground/60")}>{entry.relationship}</span>
                  </span>
                </span>
                <span className="mt-5 block h-px overflow-hidden rounded-full bg-border">
                  <span
                    className="block h-full w-full origin-left bg-linear-to-r from-primary to-accent"
                    style={{ transform: `scaleX(${isActive ? (reduced ? 1 : progress) : 0})` }}
                  />
                </span>
              </button>
            );
          })}
        </Reveal>
      </div>
    </Section>
  );
}
