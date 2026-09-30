"use client";

// Editor window that types out a small TypeScript "profile" with syntax colours, then runs it
// in a terminal strip. Replaces the old illustration video in the hero.
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/lib/content";
import { cn } from "@/lib/utils";

type Kind = "kw" | "var" | "key" | "str" | "bool" | "fn" | "punct" | "comment" | "plain";
type Token = [string, Kind];

const COLORS: Record<Kind, string> = {
  kw: "text-primary",
  var: "text-foreground",
  key: "text-foreground/85",
  str: "text-[#d9f99d]",
  bool: "text-primary",
  fn: "text-foreground font-semibold",
  punct: "text-muted-foreground",
  comment: "text-muted-foreground/70 italic",
  plain: "text-foreground",
};

const str = (s: string): Token => [`"${s}"`, "str"];

const LINES: Token[][] = [
  [["// what I bring to your team", "comment"]],
  [["const ", "kw"], ["stefan", "var"], [" = {", "punct"]],
  [["  role", "key"], [": ", "punct"], str(profile.role), [",", "punct"]],
  [["  location", "key"], [": ", "punct"], str("Timișoara, RO"), [",", "punct"]],
  [["  experience", "key"], [": ", "punct"], str("5+ years"), [",", "punct"]],
  [["  stack", "key"], [": [", "punct"], str("Next.js"), [", ", "punct"], str("Node.js"), [", ", "punct"], str("TypeScript"), ["],", "punct"]],
  [["  focus", "key"], [": [", "punct"], str("AI tooling"), [", ", "punct"], str("SaaS"), ["],", "punct"]],
  [["  available", "key"], [": ", "punct"], ["true", "bool"], [",", "punct"]],
  [["};", "punct"]],
  [["", "plain"]],
  [["export default ", "kw"], ["ship", "fn"], ["(", "punct"], ["stefan", "var"], [");", "punct"]],
];

const TOTAL = LINES.reduce((n, line) => n + line.reduce((m, [t]) => m + t.length, 0) + 1, 0);
const CHARS_PER_SECOND = 55;

export function CodeWindow({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const done = reduced || typed >= TOTAL;

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let start = 0;
    const delay = 700;
    const tick = (now: number) => {
      if (!start) start = now;
      const n = Math.floor(Math.max(0, now - start - delay) / (1000 / CHARS_PER_SECOND));
      setTyped(Math.min(n, TOTAL));
      if (n < TOTAL) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  // Walk the tokens and keep only as many characters as have been "typed".
  let budget = reduced ? TOTAL : typed;
  let cursorLine = -1;
  const rendered = LINES.map((line, li) => {
    const parts: React.ReactNode[] = [];
    for (const [text, kind] of line) {
      if (budget <= 0) break;
      const slice = text.slice(0, budget);
      budget -= slice.length;
      parts.push(
        <span key={parts.length} className={COLORS[kind]}>
          {slice}
        </span>,
      );
    }
    if (budget > 0) budget -= 1; // newline
    else if (cursorLine === -1) cursorLine = li;
    return parts;
  });
  if (cursorLine === -1) cursorLine = LINES.length - 1;

  return (
    <div className={cn("overflow-hidden rounded-[2rem] border border-border bg-[#0d0d0d] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]", className)}>
      <div className="flex items-center gap-3 border-b border-border bg-card/80 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
        </div>
        <div className="flex items-center gap-1 text-xs">
          <span className="rounded-md bg-secondary px-2.5 py-1 font-mono text-foreground">stefan.ts</span>
          <span className="px-2.5 py-1 font-mono text-muted-foreground">projects.ts</span>
        </div>
      </div>

      <pre className="overflow-hidden px-5 py-5 font-mono text-[13px] leading-6 sm:text-sm sm:leading-7" aria-label="stefan.ts: a short TypeScript profile">
        {rendered.map((parts, li) => (
          <div key={li} className="flex min-h-6 sm:min-h-7">
            <span className="w-7 shrink-0 select-none pr-3 text-right text-muted-foreground/40" aria-hidden>
              {li + 1}
            </span>
            <code className="whitespace-pre">
              {parts}
              {li === cursorLine && (
                <motion.span
                  aria-hidden
                  className="ml-px inline-block h-4 w-[7px] translate-y-[3px] bg-primary"
                  animate={reduced ? undefined : { opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              )}
            </code>
          </div>
        ))}
      </pre>

      <div className="border-t border-border bg-card/60 px-5 py-3 font-mono text-xs sm:text-[13px]">
        <p className="text-muted-foreground">
          <span className="text-primary">~/portfolio</span> $ npm run ship
        </p>
        <motion.p
          initial={false}
          animate={{ opacity: done ? 1 : 0, y: done ? 0 : 4 }}
          transition={{ duration: 0.4 }}
          className="mt-1 text-foreground"
        >
          <span className="text-primary">✓</span> compiled, tested and deployed to production
        </motion.p>
      </div>
    </div>
  );
}
