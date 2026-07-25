import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the element referenced by `location.hash` on route change,
 * or to the top when no hash is present. Works with Lenis smooth scroll.
 */
export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      // Defer so the target section is mounted.
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [pathname, hash]);

  return null;
}
