"use client";

// Memory game: match the pairs of icons. Cards flip in 3D with Motion; the best score is kept
// in this browser.
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Braces, Bug, Cloud, Cpu, Database, GitBranch, RotateCcw, Server, Terminal, Timer, Trophy, Zap, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE, Reveal, Section, SectionHeader } from "./motion";

const ICONS: { name: string; Icon: LucideIcon; warm: boolean }[] = [
  { name: "Code", Icon: Braces, warm: true },
  { name: "Terminal", Icon: Terminal, warm: false },
  { name: "Git branch", Icon: GitBranch, warm: true },
  { name: "Bug", Icon: Bug, warm: false },
  { name: "CPU", Icon: Cpu, warm: true },
  { name: "Server", Icon: Server, warm: false },
  { name: "Database", Icon: Database, warm: true },
  { name: "Cloud", Icon: Cloud, warm: false },
];

type Card = { key: number; pair: number };
const BEST_KEY = "portfolio.memory.best";

function shuffled(): Card[] {
  const cards = [...ICONS, ...ICONS].map((_, i) => ({ key: i, pair: i % ICONS.length }));
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export function Play() {
  const reduced = useReducedMotion();
  const [cards, setCards] = useState<Card[]>([]);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [best, setBest] = useState<number | null>(null);
  const lock = useRef(false);
  // Source of truth for the face-up cards, so quick successive clicks never read stale state.
  const openRef = useRef<number[]>([]);
  const won = cards.length > 0 && matched.size === ICONS.length;

  const reset = useCallback(() => {
    setCards(shuffled());
    setOpen([]);
    openRef.current = [];
    setMatched(new Set());
    setMoves(0);
    setSeconds(0);
    setStarted(false);
    lock.current = false;
  }, []);

  // Shuffle on the client only, so server and client render the same markup.
  useEffect(() => {
    reset();
    try {
      const saved = Number(localStorage.getItem(BEST_KEY));
      if (saved > 0) setBest(saved);
    } catch {
      // storage unavailable
    }
  }, [reset]);

  useEffect(() => {
    if (!started || won) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [started, won]);

  useEffect(() => {
    if (!won) return;
    const score = moves + Math.floor(seconds / 2);
    if (best === null || score < best) {
      setBest(score);
      try {
        localStorage.setItem(BEST_KEY, String(score));
      } catch {
        // storage unavailable
      }
    }
    // Only when the game is won.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [won]);

  const flip = (card: Card) => {
    if (lock.current || openRef.current.includes(card.key) || matched.has(card.pair)) return;
    if (!started) setStarted(true);
    const next = [...openRef.current, card.key];
    openRef.current = next;
    setOpen(next);
    if (next.length < 2) return;

    setMoves((m) => m + 1);
    lock.current = true;
    const [a, b] = next.map((k) => cards.find((c) => c.key === k)!);
    const isPair = a.pair === b.pair;
    setTimeout(
      () => {
        if (isPair) setMatched((set) => new Set(set).add(a.pair));
        openRef.current = [];
        setOpen([]);
        lock.current = false;
      },
      isPair ? 450 : 900,
    );
  };

  const stat = (Icon: LucideIcon, label: string, value: string) => (
    <div className="flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm">
      <Icon className="h-4 w-4 text-primary" aria-hidden />
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono font-medium text-foreground">{value}</span>
    </div>
  );

  return (
    <Section id="play">
      <SectionHeader
        eyebrow="Take a break"
        title="Memory game"
        lead="Match the pairs of dev tools. Fewer moves and less time mean a lower, better score."
      >
        <button
          type="button"
          onClick={reset}
          className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Shuffle
        </button>
      </SectionHeader>

      <Reveal index={1} className="mt-10 flex flex-wrap gap-2 lg:mt-12">
        {stat(Zap, "Moves", String(moves))}
        {stat(Timer, "Time", formatTime(seconds))}
        {stat(Trophy, "Best", best === null ? "—" : String(best))}
      </Reveal>

      <Reveal index={2} className="relative mt-6">
        <div className="mx-auto grid max-w-xl grid-cols-4 gap-2.5 sm:gap-3.5" role="grid" aria-label="Memory cards">
          {cards.map((card) => {
            const { Icon, name, warm } = ICONS[card.pair];
            const faceUp = open.includes(card.key) || matched.has(card.pair);
            const isMatched = matched.has(card.pair);
            return (
              <button
                key={card.key}
                type="button"
                role="gridcell"
                onClick={() => flip(card)}
                aria-label={faceUp ? name : "Hidden card"}
                disabled={isMatched}
                className="aspect-square cursor-pointer [perspective:800px] disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
              >
                <motion.span
                  className="relative block h-full w-full [transform-style:preserve-3d]"
                  initial={false}
                  animate={{ rotateY: faceUp ? 180 : 0, scale: isMatched && !reduced ? [1, 1.06, 1] : 1 }}
                  transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
                >
                  <span className="absolute inset-0 grid place-items-center rounded-2xl border border-border bg-card [backface-visibility:hidden]">
                    <span className="font-mono text-base font-medium text-muted-foreground/40">{"</>"}</span>
                  </span>
                  <span
                    className={cn(
                      "absolute inset-0 grid place-items-center rounded-2xl border [backface-visibility:hidden] [transform:rotateY(180deg)]",
                      warm ? "border-primary/40 bg-primary/10 text-primary" : "border-accent/40 bg-accent/10 text-accent",
                      isMatched && "opacity-60",
                    )}
                  >
                    <Icon className="h-7 w-7 sm:h-9 sm:w-9" aria-hidden />
                  </span>
                </motion.span>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {won && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 grid place-items-center rounded-3xl bg-background/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: reduced ? 1 : 0.9, y: reduced ? 0 : 12 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="mx-4 max-w-sm rounded-3xl border border-border bg-card p-8 text-center shadow-2xl"
                role="status"
              >
                <Trophy className="mx-auto h-10 w-10 text-primary" aria-hidden />
                <h3 className="mt-4 text-2xl font-medium text-foreground">Nicely done!</h3>
                <p className="mt-2 text-muted-foreground">
                  {moves} moves in {formatTime(seconds)}. Score {moves + Math.floor(seconds / 2)}.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:brightness-110"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden />
                  Play again
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>
    </Section>
  );
}
