import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Music,
  Gamepad2,
  Camera,
  Coffee,
  BookOpen,
  Plane,
  Sparkles,
  ArrowLeft,
  Heart,
  Rocket,
  Mountain,
  Motorbike,
  Bike,
  Film,
  Shirt,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { MobileDock } from "@/components/MobileDock";
import { CursorGlow } from "@/components/CursorGlow";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PageTransition } from "@/components/PageTransition";
import { MemoryAlbum } from "@/components/MemoryAlbum";

const skills = [
  { title: "Frontend", items: ["React", "Next.js", "Tailwind", "TypeScript"] },
  { title: "Backend", items: ["Node.js", "Express", "FastAPI", "Python"] },
  { title: "Databases", items: ["PostgreSQL", "MongoDB", "Supabase"] },
  { title: "AI & Tools", items: ["OpenAI", "Hugging Face", "Git"] },
];

const experience = [
  {
    year: "2025",
    role: "AI / Prompt Engineer",
    org: "R&D Intern — OpenClaw",
    desc: "Built an AI Lark bot that automates meeting documentation with GPT.",
  },
  {
    year: "2025",
    role: "Full-Stack Developer",
    org: "Undergraduate Research",
    desc: "AI-powered academic forum with real-time backend, OAuth, and AI moderation.",
  },
  {
    year: "2025",
    role: "Full-Stack Developer",
    org: "Freelance",
    desc: "Barangay Management System with MERN stack and SMS notifications.",
  },
  {
    year: "2022 — 2025",
    role: "BS Computer Science",
    org: "Centro Escolar University — Dean's List",
    desc: "Studying CS while shipping real-world projects on the side.",
  },
];

const hobbies = [
  {
    icon: Gamepad2,
    label: "Gaming",
    note: "Phone or console – RPGs, strategy, and indie gems",
  },
  {
    icon: Motorbike,
    label: "Ride",
    note: "Two wheels, open roads, and new horizons",
  },
  {
    icon: Coffee,
    label: "Coffee",
    note: "Mornings start with a slow pour-over ritual",
  },
  {
    icon: Bike,
    label: "Cycle",
    note: "Fixed-gear grind – legs, lungs, and urban flow",
  },
  {
    icon: Film,
    label: "Movies",
    note: "Cult classics, midnight screenings, and blockbuster nights",
  },
  {
    icon: Shirt,
    label: "Thrift",
    note: "Vintage hunting for one-of-a-kind threads",
  },
];

export default function AboutMe() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <PageTransition>
      <main className="relative pb-32 md:pb-0">
        <SmoothScroll />
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        <MobileDock />

        {/* HERO */}
        <section
          ref={heroRef}
          className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-6 pt-32 pb-20">
          <div className="absolute inset-0 bg-grid opacity-60" />
          <motion.div
            style={{ y, opacity }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-primary/25 blur-[140px] animate-pulse-glow"
          />
          <div className="absolute top-20 left-10 h-44 w-44 rounded-full bg-accent/30 blur-3xl animate-float" />
          <div
            className="absolute bottom-32 right-10 h-56 w-56 rounded-full bg-primary-glow/20 blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />

          <motion.div
            style={{ y, opacity }}
            className="relative z-10 max-w-3xl text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground mb-10 hover:bg-primary/10 hover:border-primary/30 transition-all">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to portfolio
            </Link>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs tracking-wide text-primary-glow mb-6">
              <Heart className="h-3 w-3" />
              The human behind the code
            </motion.div>

            <h1 className="font-display text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-gradient leading-[0.9]">
              <RevealWord text="About" delay={0} />
              <br />
              <RevealWord text="Me" delay={0.15} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              I'm Marc — a Computer Science Graduate at Centro Escolar
              University who loves building quiet, thoughtful software. This is
              the longer story: the skills, the road so far, and where I'm
              trying to go.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="mt-16 flex flex-col items-center gap-2 text-xs text-muted-foreground/70">
              <span className="tracking-[0.3em] uppercase">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="h-10 w-px bg-gradient-to-b from-primary to-transparent"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* JOURNEY — Memory Album */}
        <MemoryAlbum />

        {/* HOBBIES */}
        <section className="relative py-32 px-6">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16">
              <span className="text-xs tracking-[0.3em] uppercase text-primary-glow">
                Beyond code
              </span>
              <h2 className="mt-4 font-display text-4xl sm:text-6xl font-bold tracking-tight text-gradient">
                What I love doing
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {hobbies.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="group glass rounded-2xl p-6 hover:border-primary/40 transition-all">
                  <div className="h-12 w-12 rounded-xl bg-primary/15 border border-primary/30 grid place-items-center mb-4 group-hover:bg-primary/25 group-hover:shadow-[0_0_24px_var(--primary)] transition-all">
                    <h.icon className="h-5 w-5 text-primary-glow" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">
                    {h.label}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{h.note}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* QUOTE */}
        <section className="relative py-32 px-6">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative">
              <div className="absolute inset-0 -z-10 blur-3xl bg-primary/20 rounded-full" />
              <Sparkles className="h-6 w-6 text-primary-glow mx-auto mb-6" />
              <blockquote className="font-display text-3xl sm:text-5xl font-medium leading-tight tracking-tight">
                <span className="text-gradient">
                  "Build things that feel like they were made by someone who
                  cared."
                </span>
              </blockquote>
              <p className="mt-6 text-sm tracking-widest uppercase text-muted-foreground">
                — Mindset I live by
              </p>
            </motion.div>
          </div>
        </section>

        {/* DREAMS */}
        <section className="relative py-32 px-6">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16">
              <span className="text-xs tracking-[0.3em] uppercase text-primary-glow">
                Ambitions
              </span>
              <h2 className="mt-4 font-display text-4xl sm:text-6xl font-bold tracking-tight text-gradient">
                Where I'm headed
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  icon: Rocket,
                  title: "Launch a product that matters",
                  body: "Ship something used by thousands — a tool people genuinely love coming back to.",
                },
                {
                  icon: Mountain,
                  title: "Master the craft",
                  body: "Go deep on systems design, AI engineering, and the art of interface design.",
                },
                {
                  icon: Heart,
                  title: "Mentor the next devs",
                  body: "Pay forward what I've learned to students who are where I once was.",
                },
                {
                  icon: Sparkles,
                  title: "Live a creative life",
                  body: "Keep making things — code, photos, ideas — that feel honest and human.",
                },
              ].map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="glass rounded-2xl p-7 hover:border-primary/40 transition-all">
                  <d.icon className="h-6 w-6 text-primary-glow mb-4" />
                  <h3 className="font-display text-xl font-semibold">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    {d.body}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mt-20 text-center">
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_0_30px_var(--primary)] hover:shadow-[0_0_50px_var(--primary)] transition-all hover:scale-[1.03]">
                Let's build something together
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}

function RevealWord({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block">
        {text}
      </motion.span>
    </span>
  );
}
