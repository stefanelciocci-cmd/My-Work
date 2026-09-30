"use client";

// Adapted from React Bits Pro footer-1: brand column, outlined link cards and an edge-to-edge
// wordmark, here set in type so it scales with the container.
import { motion, type Variants } from "motion/react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { navLinks, profile } from "@/lib/content";
import { scrollToId } from "./smooth-scroll";

const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const item: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export function Footer() {
  const cards = [
    {
      title: "Navigate",
      links: navLinks.map((l) => ({ text: l.label, id: l.id })),
    },
    {
      title: "Elsewhere",
      links: [
        { text: "LinkedIn", href: profile.linkedin, external: true },
        { text: "Email", href: `mailto:${profile.email}` },
      ],
    },
  ];

  return (
    <footer className="relative w-full overflow-hidden px-4 pb-8 pt-16 sm:px-6 sm:pt-20 lg:px-8">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto w-full max-w-[1200px]"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr]">
          <motion.div variants={item} className="mb-8 flex flex-col justify-between gap-6 md:mb-0 md:pr-10">
            <span className="font-display text-2xl font-bold tracking-tight text-foreground">
              SC<span className="text-primary">.</span>
            </span>
            <p className="max-w-xs text-lg font-medium tracking-tight text-foreground">
              Building things that work, are easy to understand, and built to last.
            </p>
            <p className="text-sm text-muted-foreground">
              {profile.role} · {profile.location}
            </p>
          </motion.div>

          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              variants={item}
              className={`min-h-[240px] border border-border p-6 transition-colors hover:bg-card sm:p-8 ${index > 0 ? "-mt-px md:-ml-px md:mt-0" : ""}`}
            >
              <h4 className="mb-6 text-sm font-medium text-muted-foreground">{card.title}</h4>
              <ul className="space-y-3">
                {card.links.map((link) => (
                  <li key={link.text}>
                    {"id" in link ? (
                      <a
                        href={`#${link.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToId(link.id);
                        }}
                        className="text-base text-foreground/80 transition-colors hover:text-primary"
                      >
                        {link.text}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="inline-flex items-center gap-1 text-base text-foreground/80 transition-colors hover:text-primary"
                      >
                        {link.text}
                        {link.external && <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} className="relative mt-10 [container-type:inline-size]" aria-hidden>
          <p className="select-none whitespace-nowrap text-center font-display text-[17.5cqw] font-bold leading-[0.8] tracking-tighter text-transparent [-webkit-text-stroke:1px_var(--border)] bg-linear-to-b from-card to-transparent bg-clip-text">
            {profile.lastName.toUpperCase()}
          </p>
        </motion.div>

        <motion.div variants={item} className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <button
            type="button"
            onClick={() => scrollToId("top")}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            Back to top
            <ArrowUp className="h-4 w-4" aria-hidden />
          </button>
        </motion.div>
      </motion.div>
    </footer>
  );
}
