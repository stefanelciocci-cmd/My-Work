"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { RotateCcw, Trophy, Sparkles, Zap, Timer, Gamepad2, Code2, Database, Rocket, Music, Lightbulb, Star, Brain, Coffee, type LucideIcon } from "lucide-react";
import { useMouseParallax } from "@/hooks/use-parallax";

// Tech icons for the memory game using Lucide icons
const techIcons = [
  { id: 1, Icon: Code2, name: "Code", color: "#f9a875" },
  { id: 2, Icon: Database, name: "Database", color: "#7dd3a8" },
  { id: 3, Icon: Rocket, name: "Rocket", color: "#f9a875" },
  { id: 4, Icon: Music, name: "Music", color: "#7dd3a8" },
  { id: 5, Icon: Lightbulb, name: "Ideas", color: "#f9a875" },
  { id: 6, Icon: Star, name: "Star", color: "#7dd3a8" },
  { id: 7, Icon: Brain, name: "AI", color: "#f9a875" },
  { id: 8, Icon: Coffee, name: "Coffee", color: "#e8d4b8" },
];

interface Card {
  id: number;
  Icon: LucideIcon;
  name: string;
  color: string;
  uniqueId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function GameSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useMouseParallax(0.02);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const initializeGame = useCallback(() => {
    const duplicatedCards = [...techIcons, ...techIcons].map((card, index) => ({
      ...card,
      uniqueId: index,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(shuffleArray(duplicatedCards));
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameWon(false);
    setGameStarted(false);
    setTimer(0);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameWon) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameWon]);

  useEffect(() => {
    if (matches === techIcons.length) {
      setGameWon(true);
      const score = moves + Math.floor(timer / 2);
      if (bestScore === null || score < bestScore) {
        setBestScore(score);
      }
    }
  }, [matches, moves, timer, bestScore]);

  const handleCardClick = (uniqueId: number) => {
    if (!gameStarted) setGameStarted(true);

    const card = cards.find((c) => c.uniqueId === uniqueId);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) {
      return;
    }

    const newCards = cards.map((c) =>
      c.uniqueId === uniqueId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);
    setFlippedCards([...flippedCards, uniqueId]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = flippedCards;
      const firstCard = cards.find((c) => c.uniqueId === first);
      const secondCard = cards.find((c) => c.uniqueId === second);

      if (firstCard && secondCard && firstCard.id === secondCard.id) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.uniqueId === first || c.uniqueId === second
                ? { ...c, isMatched: true }
                : c
            )
          );
          setMatches((prev) => prev + 1);
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.uniqueId === first || c.uniqueId === second
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden" id="game">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.78 0.14 45 / 0.08) 0%, transparent 70%)",
            y,
            x: mousePos.x * 2,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.72 0.12 165 / 0.06) 0%, transparent 70%)",
            x: -mousePos.x * 3,
            y: -mousePos.y * 3,
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Gamepad2 className="w-4 h-4" />
            <span className="text-sm font-medium">Take a Break</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Memory{" "}
            <span className="relative inline-block">
              <span className="text-primary">Game</span>
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Match the tech icons! Test your memory while exploring the
            technologies I work with.
          </p>
        </motion.div>

        {/* Game Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10"
        >
          {[
            { icon: Zap, label: "Moves", value: moves, color: "#f9a875" },
            { icon: Timer, label: "Time", value: formatTime(timer), color: "#7dd3a8" },
            { icon: Trophy, label: "Matches", value: `${matches}/${techIcons.length}`, color: "#f9a875" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex items-center gap-3 px-5 py-3 bg-card/50 backdrop-blur-sm border border-border rounded-2xl"
              whileHover={{ borderColor: stat.color, boxShadow: `0 0 20px ${stat.color}15` }}
            >
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              <span className="text-muted-foreground text-sm">{stat.label}:</span>
              <span className="font-bold text-foreground font-mono">{stat.value}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Game Board */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
          style={{
            x: mousePos.x * 0.3,
            y: mousePos.y * 0.3,
          }}
        >
          <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 p-4 sm:p-6 md:p-8 bg-card/30 backdrop-blur-sm border border-border rounded-2xl sm:rounded-3xl">
            {cards.map((card) => (
              <motion.button
                key={card.uniqueId}
                onClick={() => handleCardClick(card.uniqueId)}
                className="relative aspect-square rounded-xl sm:rounded-2xl text-sm sm:text-xl md:text-2xl font-bold cursor-pointer perspective-1000"
                whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <AnimatePresence mode="wait">
                  {card.isFlipped || card.isMatched ? (
                    <motion.div
                      key="front"
                      initial={{ rotateY: 180, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: -180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 rounded-xl sm:rounded-2xl flex items-center justify-center border-2"
                      style={{ 
                        backgroundColor: `${card.color}15`,
                        borderColor: card.color,
                        opacity: card.isMatched ? 0.5 : 1,
                      }}
                    >
                      <card.Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" style={{ color: card.color }} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="back"
                      initial={{ rotateY: -180, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: 180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-secondary/50 border-2 border-border rounded-xl sm:rounded-2xl flex items-center justify-center hover:border-primary/50 transition-colors"
                    >
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary/40" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Reset Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <motion.button
            onClick={initializeGame}
            whileHover={{ scale: 1.05, borderColor: "#f9a875" }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 bg-card/50 backdrop-blur-sm border border-border rounded-2xl transition-all duration-300 text-foreground hover:text-primary"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Game
          </motion.button>
        </motion.div>

        {/* Best Score */}
        {bestScore !== null && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-4 text-sm text-muted-foreground"
          >
            Best Score: <span className="text-primary font-mono">{bestScore}</span> points
          </motion.p>
        )}

        {/* Win Modal */}
        <AnimatePresence>
          {gameWon && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/90 backdrop-blur-md flex items-center justify-center z-50"
              onClick={initializeGame}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                className="bg-card/80 backdrop-blur-sm border border-border rounded-3xl p-10 text-center max-w-md mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                >
                  <Trophy className="w-10 h-10 text-primary" />
                </motion.div>
                <h3 className="text-3xl font-bold mb-3 text-foreground">Congratulations!</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  You completed the game in <span className="text-primary font-mono">{moves}</span> moves 
                  and <span className="text-accent font-mono">{formatTime(timer)}</span>!
                </p>
                <motion.button
                  onClick={initializeGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold transition-all duration-300"
                >
                  Play Again
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
