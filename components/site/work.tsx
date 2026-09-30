"use client";

// Adapted from React Bits Pro showcase-7: editorial project index with a sticky, crossfading
// preview panel. Live products show a real screenshot in a browser frame; private ones show a terminal session.
import { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { ArrowUpRight, Lock } from "lucide-react";
import { projects, type Project } from "@/lib/content";
import { EASE, Reveal, Section, SectionHeader } from "./motion";

const listVariants: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const rowVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function Cover({ project }: { project: Project }) {
  if (project.image) {
    const host = project.liveUrl ? new URL(project.liveUrl).host.replace(/^www\./, "") : "";
    return (
      <div className="absolute inset-0 flex flex-col bg-[#0d0d0d] px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-14">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
          <div className="flex items-center gap-3 border-b border-border px-3 py-2">
            <div className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
            </div>
            <span className="flex-1 truncate rounded-md bg-secondary px-2.5 py-0.5 text-center font-mono text-[11px] text-muted-foreground">{host}</span>
          </div>
          <div className="relative min-h-0 flex-1">
            <Image
              src={project.image}
              alt={`${project.title} homepage`}
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover object-top"
              draggable={false}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 flex flex-col bg-[#0d0d0d] px-5 pb-16 pt-14 font-mono text-[13px] leading-7 sm:px-8 sm:pb-20 sm:pt-16 sm:text-sm">
      <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{project.kind}</span>
      <p className="mt-3 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">{project.title}</p>
      <div className="mt-auto space-y-0.5">
        {project.terminal?.map((line, i) => (
          <p
            key={i}
            className={
              line.startsWith("$") ? "text-foreground" : line.startsWith("✓") ? "text-primary" : "text-muted-foreground"
            }
          >
            {line.startsWith("$") ? (
              <>
                <span className="text-primary">~</span> {line}
              </>
            ) : (
              line
            )}
          </p>
        ))}
      </div>
    </div>
  );
}

export function Work() {
  const [active, setActive] = useState(0);
  const total = String(projects.length).padStart(2, "0");
  const current = projects[active];

  return (
    <Section id="work">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <SectionHeader
            eyebrow="Selected work"
            title="Products I've shipped, end to end"
            lead="From multi-tenant platforms to AI tooling. Hover a project to preview it."
          />

          <Reveal index={1} className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[2rem] border border-border bg-card">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={false}
                animate={{ opacity: active === index ? 1 : 0, scale: active === index ? 1 : 1.06 }}
                transition={{ duration: 0.55, ease: EASE }}
                aria-hidden={active !== index}
                className="absolute inset-0"
              >
                <Cover project={project} />
              </motion.div>
            ))}
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 bg-linear-to-t from-background/90 via-background/40 to-transparent px-5 pb-5 pt-16 sm:px-6 sm:pb-6">
              {current.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-background/60 px-2.5 py-1 text-xs text-foreground/90 backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
            <span className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 font-mono text-[11px] tracking-[0.12em] text-foreground backdrop-blur-sm">
              {String(active + 1).padStart(2, "0")} / {total}
            </span>
          </Reveal>
        </div>

        <motion.ol
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="border-t border-border"
        >
          {projects.map((project, index) => {
            const isActive = active === index;
            const body = (
              <>
                <span className={`pt-1.5 font-mono text-xs tracking-[0.12em] transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">{project.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {project.kind} · {project.tags.slice(0, 3).join(" · ")}
                  </p>
                  <p className="mt-3 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">{project.summary}</p>
                </div>
                {project.liveUrl ? (
                  <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <motion.span variants={{ hover: { x: 2, y: -2 } }} transition={{ duration: 0.2 }} className="grid place-items-center">
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </motion.span>
                  </span>
                ) : (
                  <span className="mt-2 inline-flex shrink-0 items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
                    <Lock className="h-3 w-3" aria-hidden />
                    Private
                  </span>
                )}
              </>
            );
            const rowClass =
              "group grid grid-cols-[auto_1fr_auto] items-start gap-5 border-b border-border py-7 outline-none focus-visible:bg-secondary/40 sm:gap-8 sm:py-9";
            return (
              <motion.li key={project.title} variants={rowVariants}>
                {project.liveUrl ? (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover="hover"
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className={rowClass}
                  >
                    {body}
                  </motion.a>
                ) : (
                  <div
                    tabIndex={0}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                    className={rowClass}
                  >
                    {body}
                  </div>
                )}
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </Section>
  );
}
