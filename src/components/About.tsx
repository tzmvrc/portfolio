import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GraduationCap, Sparkles, Code2 } from "lucide-react";

const stats = [
  { icon: Code2, label: "Years coding", value: "4" },
  { icon: Sparkles, label: "Projects shipped", value: "10" },
  { icon: GraduationCap, label: "Dean's List / Magna Cum Laude", value: "'22–'26" },
];

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="About" title="Builder at heart, learner by default." />
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3 glass rounded-3xl p-8 sm:p-10"
          >
            <p className="text-lg leading-relaxed text-foreground/85">
              I'm a Computer Science graduate at <span className="text-primary">Centro Escolar University</span>,
              passionate about building full-stack web applications and exploring AI to make tools
              that feel intuitive and genuinely useful.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              From AI-powered academic forums to barangay management systems, I love going end-to-end —
              shaping schemas, wiring real-time backends, designing interfaces, and shipping polished products.
              I thrive on clean code, thoughtful UX, and the small details that elevate good work into great work.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Problem solver", "Fast learner", "Self-motivated", "Adaptable"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs text-primary-foreground/90"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="md:col-span-2 space-y-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-primary/40 transition-colors"
              >
                <div className="h-11 w-11 rounded-xl bg-primary/15 border border-primary/30 grid place-items-center">
                  <s.icon className="h-5 w-5 text-primary-glow" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-gradient">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
