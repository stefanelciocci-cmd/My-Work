"use client";

import { Navigation } from "@/components/portfolio/navigation";
import { HeroSection } from "@/components/portfolio/hero-section";
import { MindSection } from "@/components/portfolio/mind-section";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { RecommendationsSection } from "@/components/portfolio/recommendations-section";
import { GameSection } from "@/components/portfolio/game-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { Footer } from "@/components/portfolio/footer";
import { useSmoothScroll } from "@/hooks/use-parallax";

export default function Portfolio() {
  // Enable smooth scrolling
  useSmoothScroll();
  
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <MindSection />
      <SkillsSection />
      <ProjectsSection />
      <RecommendationsSection />
      <GameSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
