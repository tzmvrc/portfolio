import { useEffect } from "react";
import Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/scroll";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      orientation: "vertical",
    });

    window.__lenis = lenis;
    window.history.scrollRestoration = "manual";

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      if (window.__lenis === lenis) {
        delete window.__lenis;
      }
      lenis.destroy();
    };
  }, []);

  return null;
}
