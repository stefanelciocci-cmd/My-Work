"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface ParallaxOptions {
  speed?: number;
  direction?: "up" | "down";
  offset?: number;
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.5, direction = "up", offset = 0 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementTop = rect.top;
    const elementHeight = rect.height;

    // Calculate how far the element is from the center of the viewport
    const elementCenter = elementTop + elementHeight / 2;
    const viewportCenter = windowHeight / 2;
    const distanceFromCenter = elementCenter - viewportCenter;

    // Apply parallax
    const parallaxValue = distanceFromCenter * speed * (direction === "up" ? -1 : 1) + offset;
    setTransform(parallaxValue);

    // Calculate opacity based on visibility
    const visibility = 1 - Math.abs(distanceFromCenter) / windowHeight;
    setOpacity(Math.max(0.3, Math.min(1, visibility + 0.5)));
  }, [speed, direction, offset]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { ref, transform, opacity };
}

export function useMouseParallax(intensity: number = 0.05) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * intensity;
      const y = (e.clientY - window.innerHeight / 2) * intensity;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [intensity]);

  return position;
}

export function useSmoothScroll() {
  useEffect(() => {
    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => lenis.destroy();
    };

    initLenis();
  }, []);
}
