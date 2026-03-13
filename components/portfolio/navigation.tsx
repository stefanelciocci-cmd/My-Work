"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "#mind", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#game", label: "Play" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = navLinks.map(link => link.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-accent"
          style={{ width: progressWidth }}
        />
        
        <nav className="container mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative group"
          >
            <motion.span 
              className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary"
              whileHover={{ scale: 1.05 }}
            >
              SC<span className="text-primary">.</span>
            </motion.span>
            <motion.span
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-full transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-xl ${
                  activeSection === link.href.slice(1)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </Link>
            ))}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="ml-4 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-primary/20"
              >
                <Sparkles className="w-4 h-4" />
                Hire Me
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border text-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 bg-background/95 backdrop-blur-xl z-40 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 p-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`text-3xl font-bold transition-colors duration-300 ${
                      activeSection === link.href.slice(1)
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-4"
              >
                <Link
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "#contact")}
                  className="px-10 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Hire Me
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
