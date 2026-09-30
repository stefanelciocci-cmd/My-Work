import { About } from "@/components/site/about";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { Navigation } from "@/components/site/navigation";
import { Play } from "@/components/site/play";
import { Skills } from "@/components/site/skills";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { Testimonials } from "@/components/site/testimonials";
import { Work } from "@/components/site/work";

export default function Portfolio() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <SmoothScroll />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Work />
      <Testimonials />
      <Play />
      <Contact />
      <Footer />
    </main>
  );
}
