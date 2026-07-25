import { motion, AnimatePresence } from "framer-motion";
import { Link2, MousePointer } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

import cycle1 from "./assets/cycleco1.png";
import cycle2 from "./assets/cycleco2.png";
import cycle3 from "./assets/cycleco3.png";

import skid1 from "./assets/skid1.png";
import skid2 from "./assets/skid2.png";
import skid3 from "./assets/skid3.png";

import claw1 from "./assets/claw1.png";
import claw2 from "./assets/claw2.png";
import claw3 from "./assets/claw3.png";

import bms1 from "./assets/bms1.png";
import bms2 from "./assets/bms2.png";
import bms3 from "./assets/bms3.png";

import acad1 from "./assets/Acad1.png";
import acad2 from "./assets/Acad2.png";
import acad3 from "./assets/Acad3.png";

// Placeholder images (3 per project) – replace with your own
const SCREENSHOTS = [
  [acad1, acad2, acad3],
  [bms1, bms2, bms3],
  [claw1, claw2, claw3],
  [skid1, skid2, skid3],
  [cycle1, cycle2, cycle3],
];

const projects = [
  {
    title: "AI-Powered Academic Forum",
    description:
      "Full-stack forum with real-time discussions, Google OAuth, and AI moderation — content validation, summarization, comment verification & vote validation.",
    tags: ["React", "Express.js", "Socket.IO", "PostgreSQL", "AI"],
    role: "Undergraduate Research · 2026",
    accent: "from-violet-500/40 to-fuchsia-500/30",
    repo: "https://github.com/tzmvrc/Academiq",
    screenshots: SCREENSHOTS[0],
  },
  {
    title: "Barangay Management System",
    description:
      "Resident registration, certificate requests with downloadable PDFs, complaint reporting, and SMS notifications via ClickSend. Admin panel for approvals and records.",
    tags: ["React", "Tailwind", "Express.js", "MongoDB", "ClickSend"],
    role: "Freelance · 2025",
    accent: "from-indigo-500/40 to-violet-500/30",
    repo: "https://github.com/tzmvrc/BMS-646",
    screenshots: SCREENSHOTS[1],
  },
  {
    title: "OpenClaw Lark Automation",
    description:
      "AI bot that extracts Lark meeting transcripts, generates summaries and action items with GPT, and posts a formatted Lark document — one click.",
    tags: ["Python", "OpenClaw", "OpenAI", "Lark API"],
    role: "R&D Intern · 2026",
    accent: "from-purple-500/40 to-pink-500/30",
    repo: "https://github.com/tzmvrc/OpenClaw-Lark-For-Project-Management",
    screenshots: SCREENSHOTS[2],
  },
  {
    title: "SkidDept",
    description:
      "Figma-designed bike marketplace concept with verified-store purchases and a community feed. Focused on clear flows and intuitive navigation.",
    tags: ["Figma", "UI/UX", "Prototype"],
    role: "Academic · 2025",
    accent: "from-fuchsia-500/40 to-rose-500/30",
    repo: "https://www.figma.com/design/mC6BudnoGBGjOD3QHZGSuf/SkidDept?node-id=503-9538&t=5NejwnnYFliEB7iB-1",
    screenshots: SCREENSHOTS[3],
  },
  {
    title: "Cycle Co. — Rental System",
    description:
      "Java/Swing desktop app for a bike rental shop: customer ID capture, rental duration tracking, automatic fee calculation, and bike availability management.",
    tags: ["Java", "Swing", "SQL"],
    role: "Academic · 2024",
    accent: "from-violet-500/40 to-blue-500/30",
    repo: "https://drive.google.com/file/d/10TYFhw4vUEZrVHZy91W9EJVCijK9mfA3/view?usp=sharing",
    screenshots: SCREENSHOTS[4],
  },
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [previewOffset, setPreviewOffset] = useState({ x: 0, y: 0 });
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const getPrevIndex = () => {
    if (!selectedProject) return 0;
    return currentIndex === 0
      ? selectedProject.screenshots.length - 1
      : currentIndex - 1;
  };

  const getNextIndex = () => {
    if (!selectedProject) return 0;
    return currentIndex === selectedProject.screenshots.length - 1
      ? 0
      : currentIndex + 1;
  };

  const handleCardClick = (project: (typeof projects)[0], index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    setPreviewOffset({
      x: cardCenterX - window.innerWidth / 2,
      y: cardCenterY - window.innerHeight / 2,
    });
    setCurrentIndex(0);
    setSelectedProject(project);
  };

  const handleClosePreview = () => setSelectedProject(null);

  const goToPrevious = () => {
    if (!selectedProject) return;
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? selectedProject.screenshots.length - 1 : prev - 1,
    );
  };

  const goToNext = () => {
    if (!selectedProject) return;
    setDirection(1);
    setCurrentIndex((prev) =>
      prev === selectedProject.screenshots.length - 1 ? 0 : prev + 1,
    );
  };

  const goToImage = (index: number) => {
    if (!selectedProject) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Lock scroll when preview is open
  useEffect(() => {
    if (selectedProject) {
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
  }, [selectedProject]);

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClosePreview();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, currentIndex]);

  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work."
          description="A handful of things I've built recently — from AI tooling to full-stack platforms."
        />
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }} // ✅ FIXED: braces + no return
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              className="group relative glass rounded-3xl overflow-hidden hover:border-primary/40 transition-all hover:-translate-y-1 cursor-pointer"
              onClick={() => handleCardClick(p, i)}>
              <div
                className={`relative h-44 overflow-hidden bg-gradient-to-br ${p.accent}`}>
                <div className="absolute inset-0 bg-grid opacity-40" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="font-display text-6xl font-black text-white/15 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="absolute bottom-3 right-4 flex items-center gap-1.5 text-white/40 group-hover:text-white/70 transition-colors">
                  <MousePointer className="h-4 w-4" />
                  <span className="text-xs font-medium tracking-wider">
                    Click
                  </span>
                </div>
                <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary/40 blur-3xl group-hover:bg-primary/60 transition-all" />
              </div>
              <div className="p-6 sm:p-7">
                <div className="text-xs uppercase tracking-wider text-primary/80 mb-2">
                  {p.role}
                </div>
                <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary-glow transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-foreground/75">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:border-primary/40 hover:bg-primary/10 transition-all"
                    onClick={(e) => e.stopPropagation()}>
                    <Link2 className="h-3.5 w-3.5" /> Code
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Preview Modal – Netflix‑style carousel with floating arrows */}
      {createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              key={selectedProject.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-md"
              onClick={handleClosePreview}
              onWheel={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onTouchMove={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              style={{
                overscrollBehavior: "none",
                touchAction: "none",
                overflow: "hidden",
              }}>
              <motion.div
                initial={{
                  x: previewOffset.x,
                  y: previewOffset.y,
                  scale: 0.3,
                  opacity: 0,
                }}
                animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                exit={{
                  x: previewOffset.x,
                  y: previewOffset.y,
                  scale: 0.3,
                  opacity: 0,
                }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 350,
                  duration: 0.4,
                }}
                className="max-w-5xl w-full mx-4 p-6 bg-white/10 rounded-2xl border border-white/20 shadow-2xl max-h-[85vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}>
                {/* Carousel with smaller side images */}
                <div className="relative flex items-center justify-center gap-0">
                  {/* Previous image peek – smaller height */}
                  <div
                    className="relative w-12 md:w-20 h-20 md:h-32 flex-shrink-0 overflow-hidden z-10 border-y-2 border-l-2 border-white/20 rounded-l-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevious();
                    }}>
                    <img
                      src={selectedProject.screenshots[getPrevIndex()]}
                      alt="Previous"
                      className="w-40 md:w-64 h-full object-cover object-right"
                    />
                  </div>

                  {/* Main image – full height, same as before */}
                  <div className="relative flex-1 aspect-video rounded-xl overflow-hidden border-2 border-white/30 shadow-2xl z-20 group">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.img
                        key={currentIndex}
                        src={selectedProject.screenshots[currentIndex]}
                        alt={`${selectedProject.title} preview`}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ x: direction * 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: direction * -50, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </AnimatePresence>
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm z-30">
                      {currentIndex + 1} / {selectedProject.screenshots.length}
                    </div>
                    {/* Floating arrows - commented out as they are not used */}
                    {/* <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPrevious();
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all z-40 opacity-80 hover:opacity-100">
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToNext();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all z-40 opacity-80 hover:opacity-100">
                      <ChevronRight className="w-6 h-6" />
                    </button> */}
                  </div>

                  {/* Next image peek – smaller height */}
                  <div
                    className="relative w-12 md:w-20 h-20 md:h-32 flex-shrink-0 overflow-hidden z-10 border-y-2 border-r-2 border-white/20 rounded-r-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}>
                    <img
                      src={selectedProject.screenshots[getNextIndex()]}
                      alt="Next"
                      className="w-40 md:w-64 h-full object-cover object-left"
                    />
                  </div>
                </div>

                {/* Project info + dot indicators */}
                <div className="mt-4 text-white flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">
                      {selectedProject.title}
                    </h3>
                    <p className="text-sm opacity-80 mt-1">
                      {selectedProject.description}
                    </p>
                  </div>
                  <div className="flex gap-1.5 mt-1">
                    {selectedProject.screenshots.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          goToImage(idx);
                        }}
                        className={`h-2 rounded-full transition-all ${
                          idx === currentIndex
                            ? "w-6 bg-white"
                            : "w-2 bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
}
