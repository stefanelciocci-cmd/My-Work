"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMouseParallax } from "@/hooks/use-parallax";

const skills = [
  {
    category: "Frontend",
    color: "#f9a875",
    items: ["Next.js", "React.js", "TypeScript", "TailwindCSS", "HTML/CSS"],
  },
  {
    category: "Backend",
    color: "#7dd3a8",
    items: ["Node.js", "Express.js", "Strapi CMS"],
  },
  {
    category: "Tools & Infra",
    color: "#e8d4b8",
    items: ["Redis", "OpenAI API", "Stripe", "Docker", "Jira", "Git"],
  },
  {
    category: "Soft Skills",
    color: "#c4a1ff",
    items: ["Solo ownership", "Client delivery", "Agile teamwork"],
  },
];

const techStack = [
  { name: "Next.js", color: "#f9a875" },
  { name: "React.js", color: "#e8d4b8" },
  { name: "TypeScript", color: "#7dd3a8" },
  { name: "TailwindCSS", color: "#7dd3a8" },
  { name: "Node.js", color: "#f9a875" },
  { name: "Express.js", color: "#7dd3a8" },
  { name: "Strapi CMS", color: "#e8d4b8" },
  { name: "Redis", color: "#f9a875" },
  { name: "OpenAI API", color: "#7dd3a8" },
  { name: "Stripe", color: "#e8d4b8" },
  { name: "Docker", color: "#f9a875" },
  { name: "Git", color: "#7dd3a8" },
  { name: "Jira", color: "#e8d4b8" },
];

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useMouseParallax(0.02);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden" id="skills">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.78 0.14 45 / 0.05) 0%, transparent 70%)",
            y: y1,
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-1/3 h-1/3 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.72 0.12 165 / 0.05) 0%, transparent 70%)",
            y: y2,
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
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
            Technical Expertise
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            My{" "}
            <span className="relative inline-block">
              <span className="text-primary">Skills</span>
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
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid - without progress bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: categoryIndex * 0.15, duration: 0.6 }}
              style={{
                x: mousePos.x * (categoryIndex - 1) * 0.5,
                y: mousePos.y * 0.3,
              }}
              className="group"
            >
              <motion.div
                className="bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 h-full"
                whileHover={{ 
                  borderColor: category.color,
                  boxShadow: `0 0 40px ${category.color}15`
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 
                  className="text-xl font-bold mb-6 flex items-center gap-3"
                  style={{ color: category.color }}
                >
                  <span 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.items.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2,
                        duration: 0.4
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: `${category.color}20`,
                      }}
                      className="px-4 py-2 bg-secondary/50 rounded-xl text-foreground font-medium text-sm border border-transparent cursor-default"
                      style={{
                        borderColor: `${category.color}30`,
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Scrolling Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="overflow-hidden py-6">
            <motion.div 
              className="flex gap-4"
              animate={{ x: [0, -1200] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[...techStack, ...techStack, ...techStack].map((tech, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 px-6 py-3 bg-card/50 backdrop-blur-sm rounded-2xl font-medium border border-border"
                  style={{ 
                    color: tech.color,
                    borderColor: `${tech.color}30`
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: tech.color,
                    boxShadow: `0 0 20px ${tech.color}20`
                  }}
                >
                  {tech.name}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
