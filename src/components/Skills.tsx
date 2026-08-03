import { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import * as SiIcons from "react-icons/si";
import { FaCode } from "react-icons/fa";

// ------------------------------
// 1. Skill data with icon keys
// ------------------------------
const skillsData = [
  { name: "React", icon: "SiReact" },
  { name: "Next.js", icon: "SiNextdotjs" },
  { name: "TypeScript", icon: "SiTypescript" },
  { name: "JavaScript", icon: "SiJavascript" },
  { name: "Tailwind CSS", icon: "SiTailwindcss" },
  { name: "Framer Motion", icon: "SiFramer" },
  { name: "Node.js", icon: "SiNodedotjs" },
  { name: "Express.js", icon: "SiExpress" },
  { name: "Python", icon: "SiPython" },
  { name: "FastAPI", icon: "SiFastapi" },
  { name: "Java", icon: "SiJava" },
  { name: "PostgreSQL", icon: "SiPostgresql" },
  { name: "MySQL", icon: "SiMysql" },
  { name: "MongoDB", icon: "SiMongodb" },
  { name: "Supabase", icon: "SiSupabase" },
  { name: "OpenAI", icon: "SiOpenai" },
  { name: "Hugging Face", icon: "SiHuggingface" },
  { name: "GitHub", icon: "SiGithub" },
  { name: "AWS", icon: "SiAmazonaws" },
  { name: "Playwright", icon: "SiPlaywright" },
  { name: "Postman", icon: "SiPostman" },
  { name: "k6", icon: "SiCode" },
  { name: "Claude", icon: "SiCode" },
  { name: "OpenClaw", icon: "SiCode" },
];

// Build map of available Simple Icons
const iconMap: Record<string, React.ElementType> = {};
for (const key of Object.keys(SiIcons)) {
  // @ts-ignore
  iconMap[key] = SiIcons[key];
}

// ------------------------------
// 2. Reusable Skill Card
// ------------------------------
const SkillCard = ({ name, iconKey }: { name: string; iconKey: string }) => {
  const Icon = iconMap[iconKey] || FaCode;
  return (
    <motion.div
      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-sm hover:border-primary/60 hover:bg-white/10 hover:shadow-primary/20 transition-all duration-300"
      whileHover={{ y: -4, scale: 1.02 }}>
      <Icon className="text-2xl flex-shrink-0" />
      <span className="text-sm font-medium text-white/90 whitespace-nowrap">
        {name}
      </span>
    </motion.div>
  );
};

// ------------------------------
// 3. Infinite Marquee Row (no pause on hover)
// ------------------------------
type MarqueeRowProps = {
  skills: typeof skillsData;
  direction: "left" | "right";
  duration: number; // seconds per full cycle
};

const MarqueeRow = ({ skills, direction, duration }: MarqueeRowProps) => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Triple the list for seamless looping
  const duplicated = [...skills, ...skills, ...skills];

  // Keyframes: left-moving: 0% → -33.33%, right-moving: -33.33% → 0%
  const from = direction === "left" ? "0%" : "-33.33%";
  const to = direction === "left" ? "-33.33%" : "0%";

  // Start animation on mount – runs forever
  useEffect(() => {
    controls.start({
      x: [from, to],
      transition: {
        duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [controls, from, to, duration]);

  // Reduced motion fallback
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReducedMotion) {
    return (
      <div className="flex flex-wrap gap-4 justify-center">
        {skills.map((skill) => (
          <SkillCard key={skill.name} name={skill.name} iconKey={skill.icon} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden w-full relative"
      style={{
        // Soft fade on both edges
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}>
      <motion.div
        ref={containerRef}
        className="flex gap-6 w-max"
        animate={controls}
        // No hover pause – animation continues uninterrupted
      >
        {duplicated.map((skill, index) => (
          <SkillCard
            key={`${skill.name}-${index}`}
            name={skill.name}
            iconKey={skill.icon}
          />
        ))}
      </motion.div>
    </div>
  );
};

// ------------------------------
// 4. Main Skills Section
// ------------------------------
export function Skills() {
  // Split skills into 3 rows (alternate distribution)
  const rows = [
    skillsData.filter((_, i) => i % 3 === 0),
    skillsData.filter((_, i) => i % 3 === 1),
    skillsData.filter((_, i) => i % 3 === 2),
  ];

  // Very slow, elegant speeds (seconds per full cycle)
  const durations = [70, 85, 75];

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-28 sm:py-36 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute top-2/3 left-1/4 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title="My toolkit."
          description="The technologies I reach for when turning ideas into shipped products."
        />

        {/* Three marquee rows */}
        <div className="mt-16 space-y-8 sm:space-y-10">
          {rows.map((rowSkills, index) => (
            <MarqueeRow
              key={index}
              skills={rowSkills}
              direction={index % 2 === 0 ? "left" : "right"}
              duration={durations[index]}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
