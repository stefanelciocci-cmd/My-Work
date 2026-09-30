"use client";

// Adapted from React Bits Pro navigation-12: floating glass pill with a layout-animated active
// indicator and an expanding mobile menu. Here it follows the section in view and shows scroll progress.
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, type Variants } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/content";
import { EASE } from "./motion";
import { scrollToId } from "./smooth-scroll";

const menuStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};
const menuItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Navigation() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  // The section closest to the upper third of the viewport is the active one.
  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    const onTop = () => window.scrollY < 200 && setActive(null);
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative flex h-14 items-center justify-between gap-3 overflow-hidden rounded-full border border-border bg-background/70 pl-5 pr-2 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          aria-label="Primary"
        >
          <a href="#top" onClick={go("top")} className={`rounded-full font-display text-lg font-bold tracking-tight text-foreground ${focusRing}`}>
            SC<span className="text-primary">.</span>
          </a>

          <div className="hidden items-center lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={go(link.id)}
                aria-current={active === link.id ? "true" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${focusRing} ${
                  active === link.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === link.id && (
                  <motion.span layoutId="nav-active" className="absolute inset-0 rounded-full bg-secondary" transition={{ duration: 0.35, ease: EASE }} />
                )}
                <span className="relative">{link.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href="#contact"
              onClick={go("contact")}
              className={`hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-[filter] duration-200 hover:brightness-110 sm:inline-flex ${focusRing}`}
            >
              Hire me
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors duration-200 hover:bg-secondary lg:hidden ${focusRing}`}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <motion.span
            aria-hidden
            style={{ scaleX: progress }}
            className="absolute inset-x-6 bottom-0 h-px origin-left bg-linear-to-r from-primary to-accent"
          />
        </motion.nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden lg:hidden"
            >
              <motion.nav
                initial="hidden"
                animate="visible"
                variants={menuStagger}
                className="mt-2 rounded-3xl border border-border bg-background/90 p-2 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.7)] backdrop-blur-xl"
                aria-label="Mobile"
              >
                {navLinks.map((link) => (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    variants={menuItem}
                    onClick={go(link.id)}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium transition-colors duration-200 ${focusRing} ${
                      active === link.id ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60"
                    }`}
                  >
                    {link.label}
                    {active === link.id && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  </motion.a>
                ))}
                <motion.div variants={menuItem} className="mt-2 border-t border-border px-2 pb-2 pt-3">
                  <a
                    href="#contact"
                    onClick={go("contact")}
                    className={`flex items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground ${focusRing}`}
                  >
                    Hire me
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
