import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const items = [
  {
    year: "2026",
    role: "AI / Prompt Engineer",
    org: "R&D Intern Project — OpenClaw",
    desc: "Built an AI Lark bot that automates meeting documentation: extracts transcripts via lark-cli, generates summaries with OpenAI GPT, and posts formatted Lark docs.",
  },
  {
    year: "2026",
    role: "Full-Stack Developer",
    org: "Undergraduate Research",
    desc: "Designed and shipped an AI-powered academic forum with real-time backend, OAuth, and AI moderation.",
  },
  {
    year: "2025",
    role: "Full-Stack Developer",
    org: "Freelance",
    desc: "Built a Barangay Management System with MERN stack, SMS notifications, and downloadable certificate PDFs.",
  },
  {
    year: "2025",
    role: "System Designer",
    org: "Academic — Web Design",
    desc: "Designed SkidDept in Figma — a bike marketplace concept with intuitive flows and community features.",
  },
  {
    year: "2024",
    role: "Full-Stack Developer",
    org: "Academic — Advanced Database",
    desc: "Developed Cycle Co., a Java/Swing bike rental management system with SQL backend.",
  },
];

const edu = [
  {
    year: "2022 — 2026",
    title: "BS Computer Science",
    sub: "Centro Escolar University — Makati",
    tag: "Magna Cum Laude",
  },
  {
    year: "2020 — 2022",
    title: "STEM — Senior High School",
    sub: "Crecencia Drusila Lopez SHS",
    tag: "With High Honors",
  },
];

const certs = [
  "Wadhwani: Employability Skills",
  "Dean's List (SY 2022–2025)",
  "TESDA CSS NCII (2022)",
];

export function Experience() {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Experience"
          title="A timeline of work."
          description="Internships, research, freelance and academic projects that shaped the engineer I am today."
        />

        <div className="relative">
          {/* center line */}
          <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />

          <div className="space-y-10">
            {items.map((it, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5 }}
                  className={`relative grid sm:grid-cols-2 gap-4 sm:gap-10 items-center`}>
                  <div
                    className={`pl-12 sm:pl-0 ${left ? "sm:text-right sm:pr-10" : "sm:col-start-2 sm:pl-10"}`}>
                    <div className="glass rounded-2xl p-5 hover:border-primary/40 transition-all">
                      <div className="text-xs uppercase tracking-wider text-primary/80">
                        {it.year}
                      </div>
                      <h3 className="font-display text-lg font-semibold mt-1">
                        {it.role}
                      </h3>
                      <div className="text-sm text-foreground/75">{it.org}</div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {it.desc}
                      </p>
                    </div>
                  </div>
                  {/* dot */}
                  <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-6 sm:top-1/2 sm:-translate-y-1/2">
                    <div className="h-3 w-3 rounded-full bg-primary shadow-[0_0_16px_var(--primary)] ring-4 ring-background" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Education & Certs */}
        <div className="mt-20 grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-3xl p-7">
            <h3 className="font-display text-xl font-semibold mb-5">
              Education
            </h3>
            <div className="space-y-4">
              {edu.map((e) => (
                <div key={e.title} className="flex items-start gap-4">
                  <div className="text-xs text-primary/80 mt-1 min-w-[80px]">
                    {e.year}
                  </div>
                  <div>
                    <div className="font-medium">{e.title}</div>
                    <div className="text-sm text-muted-foreground">{e.sub}</div>
                    {e.tag && (
                      <span className="mt-1 inline-block rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] text-primary-glow">
                        {e.tag}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-3xl p-7">
            <h3 className="font-display text-xl font-semibold mb-5">
              Certifications
            </h3>
            <ul className="space-y-3">
              {certs.map((c) => (
                <li key={c} className="flex items-center gap-3 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
