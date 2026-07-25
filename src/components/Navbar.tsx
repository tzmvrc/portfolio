import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/#home", label: "Home", id: "home" },
  { to: "/#projects", label: "Projects", id: "projects" },
  { to: "/about-me", label: "About Me", id: "whoami" },
  { to: "/#contact", label: "Contact", id: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/about-me") {
      setActive("whoami");
      const onScroll = () => setScrolled(window.scrollY > 40);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    const sectionIds = ["home", "about", "skills", "projects", "experience", "contact"];
    const navMap: Record<string, string> = {
      home: "home",
      about: "whoami",
      skills: "whoami",
      projects: "projects",
      experience: "whoami",
      contact: "contact",
    };
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActive(navMap[id] ?? id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`hidden md:block fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-4xl px-4">
        <nav
          className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
            scrolled ? "glass-strong" : "glass"
          }`}
        >
          <Link to="/#home" className="flex items-center gap-2 font-display font-bold tracking-tight">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
            <span className="text-gradient">Marc Aspa</span>
          </Link>
          <ul className="flex items-center gap-1 text-sm">
            {links.map((l) => (
              <li key={l.id}>
                <Link
                  to={l.to}
                  className={`relative px-3.5 py-1.5 rounded-full transition-colors ${
                    active === l.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary/15 border border-primary/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/#contact"
            className="inline-flex items-center text-sm font-medium rounded-full px-4 py-1.5 bg-primary/15 border border-primary/30 hover:bg-primary/25 transition-colors"
          >
            Let's talk
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
