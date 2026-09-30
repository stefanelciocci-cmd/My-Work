"use client";

// Adapted from React Bits Pro contact-8: statement and checklist beside a dark form panel.
// The form posts to /api/contact (Resend).
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Clock, Linkedin, Loader2, Mail, MapPin, Send } from "lucide-react";
import { contact, profile } from "@/lib/content";
import { EASE, Reveal, Section, SectionHeader } from "./motion";

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

const field =
  "w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20";

export function Contact() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus({ state: "sending" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Failed to send message");
      form.reset();
      setStatus({ state: "sent" });
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong" });
    }
  };

  const details = [
    { Icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { Icon: MapPin, label: "Location", value: profile.location },
    { Icon: Clock, label: "Availability", value: "Open to opportunities" },
  ];

  return (
    <Section id="contact" recessed>
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader
            eyebrow="Get in touch"
            title="Let's build something together"
            lead="Have a project in mind, a question, or just want to connect? I'm always open to new projects and ideas."
          />

          <Reveal index={1}>
            <ul className="mt-8 flex flex-col gap-3">
              {contact.promises.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-foreground/90 sm:text-base">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal index={2}>
            <dl className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {details.map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl border border-border bg-background/50 p-4">
                  <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <div className="min-w-0">
                    <dt className="text-xs text-muted-foreground">{label}</dt>
                    <dd className="truncate text-sm font-medium text-foreground">
                      {href ? (
                        <a href={href} className="hover:text-primary">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-border bg-background/50 p-4 transition-colors hover:border-accent/50"
              >
                <Linkedin className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                <span className="text-sm font-medium text-foreground">Connect on LinkedIn</span>
                <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
              </a>
            </dl>
          </Reveal>
        </div>

        <Reveal index={1} className="relative overflow-hidden rounded-[2rem] border border-border bg-background p-6 sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            {status.state === "sent" ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex min-h-[420px] flex-col items-center justify-center text-center"
                role="status"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-primary/15 text-primary">
                  <Send className="h-7 w-7" aria-hidden />
                </span>
                <h3 className="mt-6 text-2xl font-medium text-foreground">Message sent!</h3>
                <p className="mt-2 max-w-xs text-muted-foreground">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                <button
                  type="button"
                  onClick={() => setStatus({ state: "idle" })}
                  className="mt-8 cursor-pointer rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex flex-col gap-4"
              >
                <h3 className="text-lg font-medium text-foreground sm:text-xl">Tell me about your project</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                    Name
                    <input name="name" required maxLength={100} autoComplete="name" placeholder="Your name" className={field} />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                    Email
                    <input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="you@company.com" className={field} />
                  </label>
                </div>
                <label className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                  Message
                  <textarea name="message" required maxLength={5000} rows={6} placeholder="What are you building?" className={`${field} resize-none`} />
                </label>
                {/* Honeypot: hidden from people, filled in by most bots. */}
                <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

                {status.state === "error" && (
                  <p role="alert" className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-red-300">
                    {status.message}
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={status.state === "sending"}
                  className="mt-2 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-[filter] hover:brightness-110 disabled:cursor-default disabled:opacity-70"
                >
                  {status.state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
                  {status.state === "sending" ? "Sending…" : "Send message"}
                </motion.button>
                <p className="text-center text-xs text-muted-foreground">Your details are only used to reply to you.</p>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </Section>
  );
}
