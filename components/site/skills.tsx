"use client";

// Skill groups as quiet cards, then the whole stack on a React Bits BendingMarquee that folds
// around the viewer.
import { motion } from "motion/react";
import BendingMarquee from "@/components/react-bits/bending-marquee";
import { skills, techStack } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal, Section, SectionHeader } from "./motion";

export function Skills() {
  return (
    <Section id="skills" recessed className="overflow-hidden">
      <SectionHeader
        eyebrow="Technical expertise"
        title="The tools I build with"
        lead="A focused stack I know deeply, picked for shipping reliable products fast."
      />

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {skills.map((group, i) => (
          <Reveal key={group.category} index={i} className="h-full">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="group flex h-full flex-col rounded-3xl border border-border bg-background/70 p-6 transition-colors duration-300 hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground sm:text-xl">{group.category}</h3>
                <span
                  aria-hidden
                  className={cn("h-2 w-2 rounded-full", group.tone === "primary" ? "bg-primary" : "bg-accent")}
                />
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-sm text-foreground/90 transition-colors duration-200 group-hover:border-primary/20"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <Reveal index={2} className="relative -mx-4 mt-16 h-[300px] sm:-mx-6 sm:h-[340px] lg:-mx-8 lg:mt-20">
        <BendingMarquee
          items={techStack}
          separator="✳︎"
          rows={3}
          panelWidth={560}
          panelHeight={320}
          fontSize={30}
          color="#fafafa"
          bandColor="#161616"
          speed={22}
          className="h-full w-full"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-card to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-card to-transparent" aria-hidden />
      </Reveal>
    </Section>
  );
}
