import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Home, Sparkles, User, Mail } from "lucide-react";

const items = [
  { id: "home", label: "Home", icon: Home, to: "/#home" },
  { id: "projects", label: "Projects", icon: Sparkles, to: "/#projects" },
  { id: "whoami", label: "About", icon: User, to: "/about-me" },
  { id: "contact", label: "Contact", icon: Mail, to: "/#contact" },
];

export function MobileDock() {
  const [active, setActive] = useState("home");
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY || y < 100);
      setLastY(y);

      if (pathname === "/") {
        const map: Record<string, string> = {
          home: "home",
          about: "whoami",
          skills: "whoami",
          projects: "projects",
          experience: "whoami",
          contact: "contact",
        };
        const ids = ["home", "about", "skills", "projects", "experience", "contact"];
        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (r.top <= 160 && r.bottom >= 160) {
            setActive(map[id] ?? id);
            break;
          }
        }
      } else if (pathname === "/about-me") {
        setActive("whoami");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY, pathname]);

  useEffect(() => {
    if (pathname === "/about-me") setActive("whoami");
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="md:hidden fixed bottom-4 inset-x-0 z-50 px-6 pointer-events-none"
        >
          <div className="pointer-events-auto mx-auto max-w-sm">
            <div className="absolute inset-x-8 -bottom-2 h-12 rounded-full bg-primary/30 blur-2xl" />
            <ul className="relative flex items-center justify-between gap-1 glass-strong rounded-full px-2 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              {items.map((it) => {
                const isActive = active === it.id;
                const Icon = it.icon;
                return (
                  <li key={it.id} className="flex-1">
                    <Link
                      to={it.to}
                      className="relative flex flex-col items-center justify-center py-2 px-1 rounded-full"
                      onClick={() => setActive(it.id)}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="dock-pill"
                          className="absolute inset-0 rounded-full bg-primary/20 border border-primary/40 shadow-[0_0_20px_var(--primary)]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative flex flex-col items-center gap-1">
                        <Icon
                          className={`h-[18px] w-[18px] transition-colors ${
                            isActive ? "text-primary-glow" : "text-muted-foreground"
                          }`}
                        />
                        <span
                          className={`text-[10px] font-medium tracking-wide transition-colors ${
                            isActive ? "text-foreground" : "text-muted-foreground/70"
                          }`}
                        >
                          {it.label}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
