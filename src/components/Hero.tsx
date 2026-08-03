import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, Download, ArrowRight } from "lucide-react";
import { FloatingElements } from "./FloatingElements";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-primary/20 blur-[120px] animate-pulse-glow" />
      <div className="absolute top-20 left-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 h-56 w-56 rounded-full bg-primary-glow/20 blur-3xl animate-float"
        style={{ animationDelay: "1.5s" }}
      />

      <FloatingElements />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs tracking-wide text-muted-foreground mb-10">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Available for opportunities
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-sm sm:text-base text-muted-foreground/80 tracking-[0.25em] uppercase mb-6">
          Hi, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative font-display text-6xl sm:text-8xl md:text-[9rem] font-bold tracking-tighter text-gradient leading-[0.9]">
          Marc Justine
          <br />
          Aspa
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-8 text-base sm:text-lg text-muted-foreground">
          <span className="text-foreground/90 font-medium">
            Full-Stack Developer
          </span>
          <span className="mx-2 text-primary/60">·</span>
          <span className="text-foreground/90 font-medium">AI Enthusiast</span>
          <span className="mx-2 text-primary/60">·</span>
          <span className="text-foreground/90 font-medium">UI/UX Designer</span>
          <span className="mx-2 text-primary/60">·</span>
          <span className="text-foreground/90 font-medium">
            Lifelong Learner
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-5 max-w-xl mx-auto text-muted-foreground/90 leading-relaxed">
          Experienced in full-stack development, AI-powered applications, and
          modern web technologies. Adaptable, fast learner, and passionate about
          building innovative software solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_30px_var(--primary)] hover:shadow-[0_0_50px_var(--primary)] transition-all hover:scale-[1.03]">
            View my work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="https://drive.google.com/file/d/15Eot8lxHmXc_qwXCL-LLKZHvHoXtU1P-/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium hover:bg-primary/10 hover:border-primary/40 transition-all">
            <Download className="h-4 w-4" />
            View CV
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-10 flex items-center justify-center gap-3">
          {[
            {
              icon: FaGithub,
              href: "https://github.com/tzmvrc",
              label: "GitHub",
            },
            {
              icon: FaLinkedin,
              href: "https://www.linkedin.com/in/tzmvrc",
              label: "LinkedIn",
            },
            { icon: Mail, href: "mailto:mjaspa9@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group h-11 w-11 grid place-items-center rounded-full glass hover:bg-primary/15 hover:border-primary/40 transition-all hover:-translate-y-0.5">
              <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
