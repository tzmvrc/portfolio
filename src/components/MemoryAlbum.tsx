import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import type { MouseEvent } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

// --- Import your local images here ---
// Replace these with your actual image paths
import memory1 from "./assets/ai.jpg";
import memory2 from "./assets/coffee2.jpg";
import memory3 from "./assets/coffee.jpg";
import memory4 from "./assets/mountain.jpg";
import memory5 from "./assets/game.jpg";
import memory6 from "./assets/beach.jpg";
import memory7 from "./assets/intern.jpg";
import memory8 from "./assets/nature.jpg";
import memory9 from "./assets/learn.jpg";

type Memory = {
  year: string;
  title: string;
  caption: string;
  note?: string;
  image: string;
  gradient: string;
  rotate: number;
  span?: "tall" | "wide" | "square";
};

const memories: Memory[] = [
  {
    year: "2023",
    title: "First AI",
    caption: "The moment my studies became interesting",
    note: "where it all began",
    image: memory1,
    gradient: "from-violet-500/40 via-fuchsia-500/30 to-purple-700/40",
    rotate: -3,
    span: "tall",
  },
  {
    year: "2024",
    title: "Hangout and breath",
    caption: "Headphones off, hear the world",
    image: memory2,
    gradient: "from-indigo-500/40 via-purple-500/30 to-violet-700/40",
    rotate: 2,
  },
  {
    year: "2025",
    title: "Coffee + commits",
    caption: "Pour-over, then push to main",
    note: "fuel ☕",
    image: memory3,
    gradient: "from-amber-500/30 via-rose-500/30 to-purple-600/40",
    rotate: -2,
    span: "square",
  },
  {
    year: "2022",
    title: "Day reset",
    caption: "Work done. Game in",
    image: memory5,
    gradient: "from-cyan-500/30 via-blue-500/30 to-indigo-700/40",
    rotate: 4,
    span: "wide",
  },
  {
    year: "2026",
    title: "Mountain reset",
    caption: "Logged off. Looked up.",
    note: "Unwind. Freedom.",
    image: memory4,
    gradient: "from-fuchsia-500/40 via-violet-500/30 to-purple-700/40",
    rotate: -4,
    span: "tall",
  },
  {
    year: "2025",
    title: "Of course, Beach",
    caption: "Swim to forgot all the bugs",
    image: memory6,
    gradient: "from-emerald-500/30 via-teal-500/30 to-purple-600/40",
    rotate: 3,
  },
  {
    year: "2026",
    title: "R&D internship",
    caption: "Real teams, real tickets, real growth",
    note: "level up 📈",
    image: memory7,
    gradient: "from-purple-500/40 via-pink-500/30 to-violet-700/40",
    rotate: -2,
    span: "square",
  },
  {
    year: "2025",
    title: "Frame the moment",
    caption: "Golden hour, no filter",
    image: memory8,
    gradient: "from-orange-500/30 via-rose-500/30 to-purple-600/40",
    rotate: 5,
  },
  {
    year: "2026",
    title: "Never stop learning",
    caption: "Curiosity is the first step toward growth. Keep learning, keep growing.",
    note: "explore · create · repeat",
    image: memory9,
    gradient: "from-violet-500/40 via-indigo-500/30 to-purple-700/40",
    rotate: -3,
    span: "wide",
  },
];

const notes = [
  { text: "keep building ✨", x: "12%", top: "8%", rotate: -6 },
  { text: "dream > fear", x: "78%", top: "32%", rotate: 5 },
  { text: "404 sleep not found", x: "8%", top: "62%", rotate: -4 },
  { text: "from ideas to reality →", x: "82%", top: "78%", rotate: 4 },
];

export function MemoryAlbum() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const [active, setActive] = useState<Memory | null>(null);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [active]);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Ambient gradient */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[120px] pointer-events-none"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-primary-glow">
            Memory album
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl font-bold tracking-tight text-gradient">
            My journey, so far
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-muted-foreground">
            A scrapbook of moments — code, coffee, mountains, and milestones.
            Tap a polaroid to take a closer look.
          </p>
        </motion.div>

        {/* Handwritten floating notes */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          {notes.map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.7, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.15 }}
              style={{ left: n.x, top: n.top, rotate: n.rotate }}
              className="absolute font-display italic text-primary-glow/70 text-sm tracking-wide">
              {n.text}
            </motion.div>
          ))}
        </div>

        {/* Masonry-ish polaroid grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 relative">
          {memories.map((m, i) => (
            <Polaroid
              key={i}
              memory={m}
              index={i}
              onClick={() => setActive(m)}
            />
          ))}
        </div>

        {/* Timeline footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 flex items-center justify-center gap-3 text-xs tracking-[0.3em] uppercase text-muted-foreground/70">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
          <span>2022 — present</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
        </motion.div>
      </div>

      {/* Lightbox – rendered via portal for true isolation */}
      {active &&
        createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-background/80 backdrop-blur-xl p-4 cursor-zoom-out"
            style={{ overscrollBehavior: "none" }}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}>
            <motion.div
              initial={{ scale: 0.85, opacity: 0, rotate: active.rotate }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-white/95 dark:bg-zinc-100 rounded-md shadow-[0_30px_80px_-10px_var(--primary)] p-4">
              {/* <button
                onClick={() => setActive(null)}
                className="absolute -top-3 -right-3 h-9 w-9 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-lg hover:scale-110 transition">
                <X className="h-4 w-4" />
              </button> */}
              <div
                className={`aspect-square rounded-sm bg-gradient-to-br ${active.gradient} flex items-center justify-center overflow-hidden`}>
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-5 pb-3 px-2 text-zinc-800">
                <div className="text-[10px] tracking-[0.3em] uppercase text-zinc-500">
                  {active.year}
                </div>
                <div className="mt-1 font-display text-xl font-bold">
                  {active.title}
                </div>
                <div className="mt-1 text-sm text-zinc-600 italic">
                  {active.caption}
                </div>
              </div>
            </motion.div>
          </motion.div>,
          document.body,
        )}
    </section>
  );
}

function Polaroid({
  memory,
  index,
  onClick,
}: {
  memory: Memory;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 8 });
  };

  const reset = () => setTilt({ x: 0, y: 0 });

  const aspect =
    memory.span === "tall"
      ? "aspect-[3/4]"
      : memory.span === "wide"
        ? "aspect-[4/3]"
        : "aspect-square";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotate: memory.rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: memory.rotate }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: (index % 6) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) rotate(${memory.rotate}deg)`,
        transition: "transform 0.25s ease-out",
      }}
      className="break-inside-avoid mb-6 group cursor-zoom-in">
      <div className="bg-white/95 dark:bg-zinc-100 rounded-sm p-3 shadow-[0_15px_40px_-10px_rgba(124,58,237,0.4)] hover:shadow-[0_25px_60px_-10px_var(--primary)] transition-shadow duration-500">
        <div
          className={`${aspect} relative rounded-sm bg-gradient-to-br ${memory.gradient} overflow-hidden`}>
          <img
            src={memory.image}
            alt={memory.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <div className="absolute top-2 left-2 text-[9px] tracking-[0.25em] uppercase text-white/80 bg-black/30 backdrop-blur px-1.5 py-0.5 rounded">
            {memory.year}
          </div>
        </div>
        <div className="pt-3 pb-1 px-1 text-zinc-800">
          <div className="font-display text-sm font-bold leading-tight">
            {memory.title}
          </div>
          <div className="text-[11px] text-zinc-600 italic mt-0.5">
            {memory.caption}
          </div>
          {memory.note && (
            <div className="text-[10px] text-primary mt-1.5 font-display italic">
              — {memory.note}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
