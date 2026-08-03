import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { prefersReducedMotion, scrollToSection } from "@/lib/scroll";

/**
 * Scrolls to the element referenced by `location.hash` on route change,
 * or to the top when no hash is present. Works with Lenis smooth scroll.
 */
export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (hash) {
      const id = hash.replace("#", "");
      requestAnimationFrame(() => {
        const element = document.getElementById(id);
        if (element) {
          scrollToSection(`#${id}`);
        } else {
          window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion() ? "auto" : "smooth",
          });
        }
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    }
  }, [pathname, hash]);

  return null;
}
