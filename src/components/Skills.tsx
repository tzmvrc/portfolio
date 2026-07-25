import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const groups = [
  {
    title: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "TypeScript"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "FastAPI", "Python", "Java"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Supabase"],
  },
  {
    title: "AI & Tools",
    items: ["OpenAI GPT", "Hugging Face", "OpenClaw", "GitHub", "AWS", "Claude"],
  },
  {
    title: "QA & Testing",
    items: ["Playwright", "Postman", "k6"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[140px]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title="My toolkit."
          description="The technologies I reach for when turning ideas into shipped products."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative glass rounded-2xl p-6 hover:border-primary/40 transition-all hover:-translate-y-1"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ background: "radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), oklch(0.62 0.24 295 / 15%), transparent 40%)" }} />
              <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
                {g.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-foreground/85 hover:border-primary/40 hover:bg-primary/10 hover:text-primary-glow transition-all"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
