"use client";

// "What's in my head": the interests drop in as React Bits ParallaxPills and drift with the cursor;
// the story sharpens into view with BlurHighlight.
import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import BlurHighlight from "@/components/react-bits/blur-highlight";
import type { ParallaxPillItem } from "@/components/react-bits/parallax-pills";
import { about } from "@/lib/content";
import { Reveal, Section, SectionHeader } from "./motion";

// Pills pick a random entry tilt, so they render on the client only (no hydration mismatch).
const ParallaxPills = dynamic(() => import("@/components/react-bits/parallax-pills"), { ssr: false });

const LIME = { background: "#c6f432", color: "#0a0a0a" };
const WHITE = { background: "#f4f4f5", color: "#0a0a0a" };
const GRAPHITE = { background: "#232323", color: "#c6f432" };
const SMOKE = { background: "#2e2e2e", color: "#fafafa" };

// Two loose columns of pills, tilted a little so they read as tossed rather than laid out.
const layout: Omit<ParallaxPillItem, "label" | "background" | "color">[] = [
  { x: 28, y: 11, width: 36, rotate: -4 },
  { x: 72, y: 12, width: 30, rotate: 6 },
  { x: 25, y: 27, width: 30, rotate: 3 },
  { x: 69, y: 27, width: 40, rotate: -3 },
  { x: 30, y: 42, width: 32, rotate: -6 },
  { x: 72, y: 43, width: 34, rotate: 4 },
  { x: 29, y: 58, width: 42, rotate: 2 },
  { x: 73, y: 58, width: 30, rotate: -5 },
  { x: 27, y: 74, width: 36, rotate: -3 },
  { x: 69, y: 74, width: 40, rotate: 5 },
  { x: 31, y: 89, width: 30, rotate: 4 },
  { x: 72, y: 89, width: 30, rotate: -4 },
];
const tones = [LIME, WHITE, GRAPHITE, SMOKE, WHITE, LIME, SMOKE, GRAPHITE, LIME, WHITE, GRAPHITE, SMOKE];

const pills: ParallaxPillItem[] = about.interests.map((label, i) => ({ label, ...tones[i], ...layout[i] }));

const backgroundPills = [
  { background: "#171717", x: 6, y: 20, width: 18, rotate: 0 },
  { background: "#171717", x: 96, y: 34, width: 16, rotate: 0 },
  { background: "#171717", x: 4, y: 66, width: 20, rotate: 0 },
  { background: "#171717", x: 97, y: 80, width: 18, rotate: 0 },
];

const SMALL = "(max-width: 640px)";
function useSmallScreen() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(SMALL);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(SMALL).matches,
    () => false,
  );
}

export function About() {
  const small = useSmallScreen();
  return (
    <Section id="about">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader eyebrow={about.eyebrow} title={about.title} />
          <Reveal index={1} className="mt-8">
            <BlurHighlight
              highlightedBits={about.highlights}
              highlightColor="rgb(198 244 50 / 0.18)"
              highlightClassName="rounded-sm px-0.5 text-foreground"
              blurAmount={8}
              inactiveOpacity={0.25}
              viewportOptions={{ once: true, amount: 0.4 }}
              className="text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
            >
              {about.body}
            </BlurHighlight>
          </Reveal>
          <Reveal index={2} className="mt-10">
            <div className="max-w-md rounded-2xl border border-border bg-[#0d0d0d] px-4 py-3 font-mono text-[13px] leading-6">
              <p className="text-muted-foreground">
                <span className="text-primary">~</span> $ whoami
              </p>
              <p className="text-foreground">stefan · builds products end to end</p>
              <p className="mt-1 text-muted-foreground">
                <span className="text-primary">~</span> $ ls interests/ <span className="text-muted-foreground/60"># hover the pills →</span>
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal index={1} className="relative h-[460px] overflow-hidden rounded-[2rem] border border-border bg-card/60 sm:h-[520px]">
          <ParallaxPills
            pills={pills}
            backgroundPills={backgroundPills}
            width="100%"
            height="100%"
            pillHeight={small ? 42 : 50}
            fontSize={small ? 14 : 17}
            fontWeight={600}
            parallaxStrength={18}
            hingeChance={0.35}
          />
        </Reveal>
      </div>
    </Section>
  );
}
