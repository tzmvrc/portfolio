declare global {
  interface Window {
    __lenis?: {
      scrollTo: (
        target: string | number | HTMLElement,
        options?: {
          offset?: number;
          duration?: number;
          easing?: (t: number) => number;
        },
      ) => void;
      destroy: () => void;
      raf: (time: number) => void;
    };
  }
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function getScrollOffset() {
  if (typeof window === "undefined") return 96;
  return window.innerWidth < 768 ? 88 : 104;
}

export function getScrollTopForElement(
  element: HTMLElement,
  offset = getScrollOffset(),
) {
  const rect = element.getBoundingClientRect();
  const top = rect.top + window.scrollY;
  return Math.max(0, top - offset);
}

export function scrollToSection(
  target: string,
  options?: { offset?: number; behavior?: ScrollBehavior },
) {
  const id = target.replace(/^#/, "");
  const element = document.getElementById(id);

  if (!element) return false;

  const offset = options?.offset ?? getScrollOffset();
  const top = getScrollTopForElement(element, offset);

  if (prefersReducedMotion()) {
    window.scrollTo({ top, behavior: "auto" });
    return true;
  }

  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(element, {
      offset: -offset,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
    });
    return true;
  }

  window.scrollTo({ top, behavior: options?.behavior ?? "smooth" });
  return true;
}
