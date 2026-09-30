"use client";

// Split layout adapted from React Bits Pro hero-1, over the GrainWave shader in the portfolio's
// lime palette. The name animates in with StaggeredText; the right side is a live code editor.
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Linkedin, MapPin } from "lucide-react";
import StaggeredText from "@/components/react-bits/staggered-text";
import { profile, stats } from "@/lib/content";
import { CodeWindow } from "./code-window";
import { EASE } from "./motion";
import { scrollToId } from "./smooth-scroll";

const GrainWave = dynamic(() => import("@/components/react-bits/grain-wave"), { ssr: false });

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? value : 0);
  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, { duration: 1.4, ease: EASE, onUpdate: (v) => setShown(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduced, value]);
  return (
    <span ref={ref} className="tabular-nums">
      {reduced ? value : shown}
      {suffix}
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE, delay },
  });

  return (
    <section ref={ref} id="top" className="relative overflow-hidden px-4 pb-16 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pb-20 lg:pt-40">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <GrainWave
          width="100%"
          height="100%"
          startColor="#c6f432"
          endColor="#f4f4f5"
          darkBackground="#0a0a0a"
          lightBackground="#0a0a0a"
          brightness={0.55}
          waveAmplitude={0.9}
          grainIntensity={0.08}
          speed={0.6}
          className="absolute inset-0 opacity-70"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/55 via-background/70 to-background" />
      </div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative mx-auto w-full max-w-[1200px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="flex flex-col gap-7">
            <motion.a
              {...fadeUp(0.1)}
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact");
              }}
              className="flex w-fit items-center gap-2.5 rounded-full border border-border bg-background/60 p-1 pr-4 backdrop-blur-sm transition-colors hover:border-primary/40"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                {profile.availability}
              </span>
              <span className="text-sm text-muted-foreground">{profile.role}</span>
            </motion.a>

            <h1 className="flex flex-col gap-1 font-display font-medium tracking-tight">
              <StaggeredText
                as="span"
                text="Hi, I'm"
                segmentBy="words"
                delay={80}
                duration={0.7}
                blur
                className="block text-2xl text-muted-foreground sm:text-3xl"
              />
              <StaggeredText
                as="span"
                text={`${profile.firstName}|${profile.lastName}`}
                separator="|"
                segmentBy="chars"
                delay={35}
                duration={0.8}
                blur
                className="block text-[3.25rem] leading-[1.02] text-foreground sm:text-6xl lg:text-7xl"
              />
            </h1>

            <motion.p {...fadeUp(0.5)} className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {profile.intro}
            </motion.p>

            <motion.div {...fadeUp(0.6)} className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("contact");
                }}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98] sm:text-base"
              >
                Let&apos;s talk
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </a>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("work");
                }}
                className="inline-flex items-center justify-center rounded-full border border-border bg-background/40 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-primary/40 hover:bg-secondary sm:text-base"
              >
                View my work
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.7)} className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-accent" aria-hidden />
                {profile.location}
              </span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <Linkedin className="h-4 w-4 text-accent" aria-hidden />
                LinkedIn
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="relative hidden md:block"
          >
            <CodeWindow />
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-primary/10 blur-3xl"
            />
          </motion.div>
        </div>

        <motion.dl
          {...fadeUp(0.8)}
          className="mt-16 grid grid-cols-1 divide-y divide-border rounded-3xl border border-border bg-background/50 backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:mt-20"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-4 px-6 py-5 sm:flex-col sm:gap-1 sm:py-6">
              <dt className="order-2 text-sm text-muted-foreground sm:order-none">{s.label}</dt>
              <dd className="order-1 font-display text-3xl font-medium tracking-tight text-foreground sm:order-none sm:text-4xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
