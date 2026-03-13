"use client";

import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-16 border-t border-border relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-32 rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.78 0.14 45 / 0.05) 0%, transparent 70%)" }}
        />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Crafted with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-primary fill-primary" />
            </motion.div>
            <span>by</span>
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors font-semibold"
            >
              Stefan Ciocirlan
            </Link>
          </div>

          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors duration-300">
              Privacy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors duration-300">
              Terms
            </Link>
            <span className="text-foreground font-mono">&copy; {currentYear}</span>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3, borderColor: "#f9a875" }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border transition-all duration-300 text-muted-foreground hover:text-primary"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
