"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Linkedin, Volume2, VolumeX, Download } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useMouseParallax } from "@/hooks/use-parallax";

function CodingVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted={isMuted}
        playsInline
      >
        <source src="/coding_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

    
    </div>
  );
}

function GlowOrbs() {
  const mousePos = useMouseParallax(0.02);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.14 45 / 0.15) 0%, transparent 70%)",
          x: mousePos.x * 2,
          y: mousePos.y * 2,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.72 0.12 165 / 0.1) 0%, transparent 70%)",
          x: -mousePos.x * 3,
          y: -mousePos.y * 3,
        }}
        animate={{
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-1/3 h-1/3 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.14 45 / 0.08) 0%, transparent 70%)",
          x: mousePos.x,
          y: mousePos.y,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

function FloatingElements() {
  const elements = [
    { text: "const", color: "text-primary", delay: 0 },
    { text: "</>", color: "text-accent", delay: 0.5 },
    { text: "async", color: "text-primary", delay: 1 },
    { text: "=>", color: "text-muted-foreground", delay: 1.5 },
    { text: "{ }", color: "text-accent", delay: 2 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((el, i) => (
        <motion.span
          key={i}
          className={`absolute font-mono text-sm ${el.color} opacity-20`}
          style={{
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.15, 0.3, 0.15],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut",
          }}
        >
          {el.text}
        </motion.span>
      ))}
    </div>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      <GlowOrbs />
      <FloatingElements />

      <motion.div
        style={{ y, opacity, scale }}
        className="container mx-auto px-6 lg:px-12 relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-8 order-1 lg:order-1"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-sm font-medium tracking-wide">
                  Available for work
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-balance"
              >
                <span className="text-foreground">Hi, I&apos;m</span>
                <br />
                <span className="relative inline-block">
                  <span className="text-primary">Stefan</span>
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  />
                </span>{" "}
                <span className="text-foreground">Ciocirlan</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
              >
                Full-stack developer with 5+ years delivering end-to-end web solutions — 
                from AI-powered tools to multi-tenant SaaS platforms. I ship things that 
                work, are easy to understand, and built to last.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="#contact"
                className="group relative px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105"
              >
                <span className="relative z-10">Let&apos;s Talk</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Link>
              <Link
                href="#projects"
                className="group px-8 py-4 border border-border text-foreground font-semibold rounded-2xl hover:bg-card hover:border-primary/30 transition-all duration-300"
              >
                <span className="group-hover:text-primary transition-colors duration-300">
                  View Projects
                </span>
              </Link>
              <a
                href="/Stefan_Ciocirlan_CV.pdf"
                download="Stefan_Ciocirlan_CV.pdf"
                className="group flex items-center gap-2 px-8 py-4 border border-border text-foreground font-semibold rounded-2xl hover:bg-card hover:border-accent/30 transition-all duration-300"
              >
                <Download className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
                <span className="group-hover:text-accent transition-colors duration-300">
                  Download CV
                </span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex items-center gap-1"
            >
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/in/stefan-ciocirlan-a99b16205/", label: "LinkedIn" },
              ].map((social, i) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className="group p-3 rounded-xl hover:bg-card transition-all duration-300"
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </Link>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative order-2 lg:order-2 hidden md:block"
          >
            <div className="relative aspect-[4/3] lg:aspect-[4/3] max-w-2xl mx-auto">
              {/* Video container with border-driven depth (no big drop shadow) */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-border/50 bg-card/10 shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_0_0_1px_rgba(0,0,0,0.35),0_0_48px_-28px_rgba(0,0,0,0.65)]">
                <CodingVideo />
              </div>
              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-primary/50 rounded-tl-xl" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-accent/50 rounded-tr-xl" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-accent/50 rounded-bl-xl" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-primary/50 rounded-br-xl" />
              {/* Floating labels */}
              <motion.div
                className="absolute -top-6 right-8 px-4 py-2 bg-card/90 backdrop-blur-md border border-primary/30 rounded-xl shadow-lg hidden md:block"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <code className="text-xs text-primary font-mono">
                  {"// lofi beats to code to"}
                </code>
              </motion.div>
              <motion.div
                className="absolute -bottom-6 left-8 px-4 py-2 bg-card/90 backdrop-blur-md border border-accent/30 rounded-xl shadow-lg hidden md:block"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-xs text-accent font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  coding in progress...
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-3 text-muted-foreground"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
