"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Folder } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { useMouseParallax } from "@/hooks/use-parallax";

const projects = [
  {
    title: "Ozas - Multi-Tenant Platform",
    description:
      "Sole developer of a multi-tenant platform serving 30+ shopping centres across Eastern Europe. Built with Next.js and Strapi CMS for seamless content management.",
    tags: ["Next.js", "Strapi", "Multi-tenant"],
    image: "/images/coding-desk.jpg",
    liveUrl: "https://ozas.lt",
    githubUrl: null,
    featured: true,
    color: "#f9a875",
  },
  {
    title: "The Population Project",
    description:
      "Full-stack role across a website, data scraper, and file management dashboard with AI capabilities.",
    tags: ["Next.js", "Redis", "OpenAI"],
    image: "/images/population-project.png",
    liveUrl: "https://thepopulationproject.org/",
    githubUrl: null,
    featured: true,
    color: "#7dd3a8",
  },
  {
    title: "Sensodyne AI Tool",
    description:
      "AI-powered misinformation detection tool monitoring dental health content on TikTok, Instagram & YouTube. Built with Express.js, Redis, and OpenAI integration.",
    tags: ["Express.js", "Redis", "OpenAI", "Social APIs"],
    image: "/images/creative-head.jpg",
    liveUrl: null,
    githubUrl: null,
    featured: false,
    color: "#f9a875",
  },
  {
    title: "SOW Generator",
    description:
      "AI tool that auto-generates structured Statements of Work from project descriptions.",
    tags: ["Next.js", "OpenAI", "TypeScript"],
    image: "/images/creative-head.jpg",
    liveUrl: null,
    githubUrl: null,
    featured: false,
    color: "#7dd3a8",
  },
  {
    title: "Bot Management Dashboard",
    description:
      "Led frontend development of a full-scale dashboard enabling users to connect and orchestrate bots across multiple platforms with automated responses.",
    tags: ["React.js", "Dashboard", "Automation"],
    image: "/images/coding-desk.jpg",
    liveUrl: null,
    githubUrl: null,
    featured: false,
    color: "#c4a1ff",
  },
  {
    title: "Lipa & Subscribfy",
    description:
      "Sole developer on two SaaS presentational websites with CMS, email notifications & SEO optimization.",
    tags: ["Strapi", "Next.js", "SEO"],
    image: "/images/creative-head.jpg",
    liveUrl: null,
    githubUrl: null,
    featured: false,
    color: "#e8d4b8",
  },
];

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useMouseParallax(0.015);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="md:py-32 py-16 relative overflow-hidden" id="projects">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.78 0.14 45 / 0.06) 0%, transparent 70%)",
            y,
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
            className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Portfolio
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Featured{" "}
            <span className="relative inline-block">
              <span className="text-primary">Projects</span>
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
            A selection of my recent work. Each project represents unique
            challenges and creative solutions.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {projects
            .filter((p) => p.featured)
            .map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                style={{
                  x: mousePos.x * (index === 0 ? 1 : -1) * 0.5,
                  y: mousePos.y * 0.3,
                }}
                className="group"
              >
                <motion.div
                  className="relative bg-card/50 backdrop-blur-sm border border-border rounded-3xl overflow-hidden h-full"
                  whileHover={{ 
                    borderColor: project.color,
                    boxShadow: `0 0 60px ${project.color}15`
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Image */}
                  <div className="relative h-48 sm:h-60 lg:h-72 overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${project.image})` }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                    
                    {/* Floating badge */}
                    <motion.div 
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                      style={{ 
                        backgroundColor: `${project.color}20`,
                        color: project.color,
                        borderColor: `${project.color}40`
                      }}
                    >
                      Featured
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="relative p-5 sm:p-6 lg:p-8 -mt-12 sm:-mt-16">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-secondary/50 text-sm text-foreground rounded-full border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6">
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 font-medium transition-colors duration-300"
                          style={{ color: project.color }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </Link>
                      )}
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                        >
                          <Github className="w-4 h-4" />
                          Source
                        </Link>
                      )}
                      {!project.liveUrl && !project.githubUrl && (
                        <span className="text-muted-foreground text-sm">Private Project</span>
                      )}
                    </div>
                  </div>

                 
                </motion.div>
              </motion.div>
            ))}
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-muted-foreground mb-6 flex items-center gap-2">
            <Folder className="w-5 h-5" />
            Other Projects
          </h3>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
          {projects
            .filter((p) => !p.featured)
            .map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group"
              >
                <motion.div
                  className="p-6 bg-card/30 backdrop-blur-sm border border-border rounded-2xl h-full"
                  whileHover={{ 
                    borderColor: project.color,
                    boxShadow: `0 0 30px ${project.color}10`
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${project.color}15` }}
                    >
                      <Folder className="w-5 h-5" style={{ color: project.color }} />
                    </div>
                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary/50"
                        >
                          <Github className="w-5 h-5" />
                        </Link>
                      )}
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary/50"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </Link>
                      )}
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium"
                        style={{ color: project.color }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
        </div>


      </div>
    </section>
  );
}
