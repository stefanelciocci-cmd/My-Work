"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Quote, Linkedin } from "lucide-react";
import Link from "next/link";
import { useMouseParallax } from "@/hooks/use-parallax";

const recommendations = [
  {
    name: "Valentin Constanda",
    role: "Helping businesses Just Get Paid",
    relationship: "Managed Stefan directly",
    quote: "Stefan is an amazing team player and a talented software engineer. His best full-stack development qualities were on display creating the CMS + Website system now used by 46 malls throughout Eastern Europe, whilst his constant (good quality!) jokes were a pleasure in all of our calls.",
    linkedin: "https://linkedin.com/in/valentinconstanda",
    initials: "VC",
  },
  {
    name: "Ignas Maziliauskas",
    role: "Legal Representative",
    relationship: "Civitta",
    quote: "Stefan demonstrated exceptional adaptability to complex technical requirements and a talent for optimising development processes. His meticulous approach, analytical mindset, punctuality, and openness made him a key factor in maintaining stability and continuous performance across multiple projects.",
    linkedin: "https://linkedin.com/in/ignas-maziliauskas",
    initials: "IM",
  },
];

export function RecommendationsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useMouseParallax(0.015);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} id="recommendations" className="relative py-32 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.78 0.14 45 / 0.06) 0%, transparent 70%)",
            x: mousePos.x * 2,
            y: mousePos.y * 2,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.72 0.12 165 / 0.05) 0%, transparent 70%)",
            x: -mousePos.x * 1.5,
            y: -mousePos.y * 1.5,
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Testimonials
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            {"What others "}
            <span className="relative inline-block">
              <span className="text-accent">say</span>
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Kind words from people I have had the pleasure of working with.
          </p>
        </motion.div>

        {/* Recommendations grid */}
        <motion.div style={{ y }} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="group relative"
            >
              <motion.div
                className="relative h-full bg-card/60 backdrop-blur-md border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 overflow-hidden"
                whileHover={{
                  borderColor: index === 0 ? "rgba(249, 168, 117, 0.5)" : "rgba(125, 211, 168, 0.5)",
                  boxShadow: index === 0 
                    ? "0 20px 60px -15px rgba(249, 168, 117, 0.2)" 
                    : "0 20px 60px -15px rgba(125, 211, 168, 0.2)",
                }}
                transition={{ duration: 0.3 }}
                style={{
                  x: mousePos.x * (index === 0 ? 0.1 : -0.1),
                  y: mousePos.y * (index === 0 ? 0.1 : -0.1),
                }}
              >
                {/* Quote icon background */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="w-24 h-24" style={{ color: index === 0 ? "#f9a875" : "#7dd3a8" }} />
                </div>

                {/* Gradient accent */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: index === 0 
                      ? "radial-gradient(ellipse at top right, rgba(249, 168, 117, 0.08) 0%, transparent 60%)"
                      : "radial-gradient(ellipse at top right, rgba(125, 211, 168, 0.08) 0%, transparent 60%)",
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Quote */}
                  <blockquote className="text-foreground/90 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 italic">
                    &ldquo;{rec.quote}&rdquo;
                  </blockquote>

                  {/* Author info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div 
                        className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg"
                        style={{ 
                          backgroundColor: index === 0 ? "rgba(249, 168, 117, 0.2)" : "rgba(125, 211, 168, 0.2)",
                          color: index === 0 ? "#f9a875" : "#7dd3a8",
                        }}
                      >
                        {rec.initials}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{rec.name}</h4>
                        <p className="text-muted-foreground text-sm">{rec.role}</p>
                        <p className="text-muted-foreground/60 text-xs mt-0.5">{rec.relationship}</p>
                      </div>
                    </div>

                    {/* LinkedIn link */}
                    <Link
                      href={rec.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 hover:bg-secondary transition-all duration-300 group/link"
                    >
                      <Linkedin className="w-5 h-5 text-muted-foreground group-hover/link:text-primary transition-colors" />
                    </Link>
                  </div>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 rounded-b-3xl"
                  style={{ backgroundColor: index === 0 ? "#f9a875" : "#7dd3a8" }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
