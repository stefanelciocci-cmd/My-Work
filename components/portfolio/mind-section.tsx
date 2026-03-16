"use client";

import { motion, useScroll, useTransform, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useMouseParallax } from "@/hooks/use-parallax";
import {
  Code2,
  Database,
  Lightbulb,
  Rocket,
  Wine,
  Music,
  Gamepad2,
  BookOpen,
  Sparkles,
  Star,
  CircleDot,
  Brain,
} from "lucide-react";

// Define orbital rings with their planets (icons) - now with descriptions
// Radii will be scaled based on container size
const orbitsConfig = [
  {
    radiusPercent: 0.22, // percentage of container
    duration: 25,
    direction: 1,
    planets: [
      { Icon: Code2, label: "Coding", color: "#f9a875", angle: 0, description: "More than a skill - it's a lifestyle. Building elegant solutions one line at a time." },
      { Icon: Database, label: "Data", color: "#7dd3a8", angle: 120, description: "Optimizing slow interactions keeps my mind sharp - every millisecond matters." },
      { Icon: Brain, label: "AI", color: "#f9a875", angle: 240, description: "AI is the future. It makes us more free and efficient - a must to master." },
    ],
  },
  {
    radiusPercent: 0.34,
    duration: 40,
    direction: -1,
    planets: [
      { Icon: CircleDot, label: "Football", color: "#7dd3a8", angle: 30, description: "In my free time, running on the pitch clears my mind and recharges my spirit." },
      { Icon: Lightbulb, label: "Ideas", color: "#f9a875", angle: 120, description: "The best ideas come when you least expect them - creativity strikes like lightning." },
      { Icon: Rocket, label: "Momentum", color: "#7dd3a8", angle: 210, description: "No stress, just keep moving forward. Everything works out in the end." },
      { Icon: Wine, label: "Social", color: "#f9a875", angle: 300, description: "A spritz with friends, good conversations - socializing makes me smile." },
    ],
  },
  {
    radiusPercent: 0.46,
    duration: 55,
    direction: 1,
    planets: [
      { Icon: Music, label: "Music", color: "#7dd3a8", angle: 0, description: "Music is life. The perfect soundtrack turns coding into an experience." },
      { Icon: Gamepad2, label: "Gaming", color: "#f9a875", angle: 72, description: "Gaming with friends makes me feel alive - teamwork and fun combined." },
      { Icon: BookOpen, label: "Learning", color: "#7dd3a8", angle: 144, description: "I don't read books - I read code, documentation, and the latest in tech." },
      { Icon: Sparkles, label: "Magic", color: "#f9a875", angle: 216, description: "The spark that turns ordinary projects into extraordinary experiences." },
      { Icon: Star, label: "Calm", color: "#7dd3a8", angle: 288, description: "When stressed, count to three. Everything becomes easier with a clear mind." },
    ],
  },
];

function Planet({
  Icon,
  label,
  color,
  angle,
  description,
  radius,
  duration,
  direction,
  index,
  planetIndex,
}: {
  Icon: React.ElementType;
  label: string;
  color: string;
  angle: number;
  description: string;
  radius: number;
  duration: number;
  direction: number;
  index: number;
  planetIndex: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentAngle, setCurrentAngle] = useState(angle);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedAngleRef = useRef(angle);

  useEffect(() => {
    if (isHovered) {
      // Stop animation and store current angle
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      pausedAngleRef.current = currentAngle;
      return;
    }

    // Resume or start animation
    startTimeRef.current = null;
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - startTimeRef.current;
      const progress = (elapsed / (duration * 1000)) % 1;
      const newAngle = pausedAngleRef.current + (progress * 360 * direction);
      
      setCurrentAngle(newAngle % 360);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, duration, direction]);

  // Calculate position based on current angle
  const angleRad = (currentAngle * Math.PI) / 180;
  const x = Math.cos(angleRad) * radius;
  const y = Math.sin(angleRad) * radius;

  const handleInteractionStart = () => setIsHovered(true);
  const handleInteractionEnd = () => setIsHovered(false);

  return (
    <motion.div
      className={`absolute pointer-events-auto ${isHovered ? 'z-[9999]' : 'z-[100]'}`}
      style={{
        left: '50%',
        top: '50%',
        x,
        y,
      }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.2 + planetIndex * 0.1 + 0.4,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
      }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <motion.button
          type="button"
          className="p-2.5 sm:p-3 md:p-4 bg-card/95 backdrop-blur-md border border-border rounded-xl sm:rounded-2xl shadow-xl cursor-pointer relative"
          animate={{
            scale: isHovered ? 1.2 : 1,
            borderColor: isHovered ? color : undefined,
            boxShadow: isHovered ? `0 0 30px ${color}60` : undefined,
          }}
          transition={{ duration: 0.2 }}
          onMouseEnter={handleInteractionStart}
          onMouseLeave={handleInteractionEnd}
          onTouchStart={handleInteractionStart}
          onTouchEnd={handleInteractionEnd}
          onFocus={handleInteractionStart}
          onBlur={handleInteractionEnd}
        >
          {/* Glow effect behind icon */}
          <div
            className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-30 blur-md"
            style={{ backgroundColor: color }}
          />
          <Icon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 relative z-10" style={{ color }} />
        </motion.button>

        {/* Label shown on mobile when hovered/tapped */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-[10000] md:hidden"
          >
            <div 
              className="px-3 py-1.5 bg-card/95 backdrop-blur-xl border rounded-lg shadow-lg whitespace-nowrap text-xs font-medium"
              style={{ borderColor: color, color }}
            >
              {label}
            </div>
          </motion.div>
        )}

        {/* Full popup on desktop */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-[10000] w-56 hidden md:block pointer-events-none"
          >
            <div 
              className="bg-card/95 backdrop-blur-xl border-2 rounded-xl p-3 shadow-2xl"
              style={{ borderColor: color }}
            >
              {/* Arrow pointing up */}
              <div 
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-card border-l-2 border-t-2"
                style={{ borderColor: color }}
              />
              <div className="flex items-center gap-2 mb-1.5">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <h4 
                  className="font-bold text-sm"
                  style={{ color }}
                >
                  {label}
                </h4>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {description}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function OrbitRing({
  radius,
  duration,
  direction,
  planets,
  index,
}: {
  radius: number;
  duration: number;
  direction: number;
  planets: { Icon: React.ElementType; label: string; color: string; angle: number; description: string }[];
  index: number;
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        width: radius * 2,
        height: radius * 2,
      }}
    >
      {/* Orbit path (ring) - dashed circle */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: `2px dashed ${index === 0 ? 'rgba(249, 168, 117, 0.4)' : index === 1 ? 'rgba(125, 211, 168, 0.35)' : 'rgba(249, 168, 117, 0.25)'}`,
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.2, duration: 0.6, ease: "easeOut" }}
      />

      {/* Planets - each manages its own animation */}
      {planets.map((planet, planetIndex) => (
        <Planet
          key={planetIndex}
          {...planet}
          radius={radius}
          duration={duration}
          direction={direction}
          index={index}
          planetIndex={planetIndex}
        />
      ))}
    </div>
  );
}

export function MindSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitalRef = useRef<HTMLDivElement>(null);
  const mousePos = useMouseParallax(0.02);
  const [containerSize, setContainerSize] = useState(650);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // Track container size for responsive orbits
  useEffect(() => {
    const updateSize = () => {
      if (orbitalRef.current) {
        setContainerSize(orbitalRef.current.offsetWidth);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Calculate responsive orbits
  const orbits = orbitsConfig.map(orbit => ({
    ...orbit,
    radius: containerSize * orbit.radiusPercent,
  }));

  return (
    <section ref={containerRef} id="mind" className="relative py-32 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.78 0.14 45 / 0.08) 0%, transparent 70%)",
            x: mousePos.x * 2,
            y: mousePos.y * 2,
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

      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Creative Process
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            {"What's in my "}
            <span className="relative inline-block">
              <span className="text-primary">head</span>
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
            A glimpse into the creative chaos that fuels my passion for building
            beautiful, functional experiences.
          </p>
        </motion.div>

        {/* Orbital system container */}
        <div className="relative flex justify-center items-center min-h-[400px] md:min-h-[600px] lg:min-h-[700px]">
          <div ref={orbitalRef} className="relative w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] lg:w-[650px] lg:h-[650px]">
            {/* Orbit rings with planets */}
            {orbits.map((orbit, index) => (
              <OrbitRing 
                key={index} 
                radius={orbit.radius}
                duration={orbit.duration}
                direction={orbit.direction}
                planets={orbit.planets}
                index={index} 
              />
            ))}

            {/* Central head (the sun) */}
            <motion.div
              style={{ y, scale }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 z-30"
            >
              {/* Pulsing glow rings */}
              <motion.div
                className="absolute inset-0 bg-primary/30 rounded-full blur-3xl"
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 bg-accent/20 rounded-full blur-2xl"
                animate={{ scale: [1.2, 0.9, 1.2], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              />

              {/* Main image container */}
              <motion.div
                className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/50 shadow-2xl"
                style={{
                  x: mousePos.x * 0.3,
                  y: mousePos.y * 0.3,
                  boxShadow: "0 0 80px rgba(249, 168, 117, 0.35)",
                }}
              >
                <Image
                  src="/images/creative-head.jpg"
                  alt="Creative mind illustration"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative particles around the orbital system - slower animation */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/50"
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${15 + Math.random() * 70}%`,
              }}
              animate={{
                opacity: [0.2, 0.7, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
