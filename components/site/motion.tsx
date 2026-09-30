"use client";

// The page's single motion vocabulary: one easing, one reveal, one section header.
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades content up once it scrolls into view. Collapses to an opacity fade for reduced motion. */
export function Reveal({
  index = 0,
  className,
  children,
  ...rest
}: HTMLMotionProps<"div"> & { index?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE, delay: Math.min(index, 5) * 0.06 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-primary", className)}>
      <span className="h-px w-6 bg-primary/60" aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  className,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className={cn("flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 text-balance text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">{title}</h2>
        {lead && <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">{lead}</p>}
      </div>
      {children}
    </Reveal>
  );
}

/** Shared section wrapper: one rhythm and one container width for the whole page. */
export function Section({
  id,
  recessed,
  className,
  children,
}: {
  id?: string;
  recessed?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32", recessed && "bg-card", className)}>
      <div className="mx-auto w-full max-w-[1200px]">{children}</div>
    </section>
  );
}
