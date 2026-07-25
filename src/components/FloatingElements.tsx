import { motion } from "framer-motion";
import {
  Code2,
  Terminal,
  GitBranch,
  Braces,
  Coffee,
  Sparkles,
  Rocket,
  Heart,
} from "lucide-react";

type FloatItem = {
  kind: "text" | "icon" | "quote" | "blob";
  content?: string;
  Icon?: typeof Code2;
  x: string;
  y: string;
  size?: string;
  opacity?: number;
  blur?: number;
  rotate?: number;
  depth?: number; // parallax factor 0-1
  delay?: number;
  font?: "mono" | "display" | "hand";
};

const items: FloatItem[] = [
  // Code symbols
  {
    kind: "text",
    content: "</>",
    x: "8%",
    y: "18%",
    size: "text-3xl sm:text-4xl",
    opacity: 0.35,
    rotate: -8,
    depth: 0.5,
    font: "mono",
    delay: 0,
  },
  {
    kind: "text",
    content: "{ }",
    x: "88%",
    y: "22%",
    size: "text-2xl sm:text-3xl",
    opacity: 0.3,
    rotate: 12,
    depth: 0.7,
    font: "mono",
    delay: 0.2,
  },
  {
    kind: "text",
    content: "const dream = true;",
    x: "78%",
    y: "70%",
    size: "text-xs sm:text-sm",
    opacity: 0.28,
    rotate: -4,
    depth: 0.4,
    font: "mono",
    delay: 0.4,
  },
  {
    kind: "text",
    content: "$ git commit -m 'ship it'",
    x: "5%",
    y: "75%",
    size: "text-xs sm:text-sm",
    opacity: 0.3,
    rotate: 3,
    depth: 0.6,
    font: "mono",
    delay: 0.5,
  },
  {
    kind: "text",
    content: "npm run dream",
    x: "12%",
    y: "55%",
    size: "text-xs sm:text-sm",
    opacity: 0.25,
    rotate: -2,
    depth: 0.3,
    font: "mono",
    delay: 0.3,
  },
  {
    kind: "text",
    content: "() =>",
    x: "92%",
    y: "55%",
    size: "text-xl sm:text-2xl",
    opacity: 0.3,
    rotate: 6,
    depth: 0.5,
    font: "mono",
    delay: 0.6,
  },

  // Quotes / handwritten notes
  {
    kind: "quote",
    content: "keep building",
    x: "18%",
    y: "32%",
    size: "text-base sm:text-lg",
    opacity: 0.55,
    rotate: -10,
    depth: 0.8,
    font: "hand",
    delay: 0.7,
  },
  {
    kind: "quote",
    content: "dream > fear",
    x: "82%",
    y: "38%",
    size: "text-base sm:text-lg",
    opacity: 0.5,
    rotate: 8,
    depth: 0.6,
    font: "hand",
    delay: 0.8,
  },
  {
    kind: "quote",
    content: "explore · create · repeat",
    x: "15%",
    y: "85%",
    size: "text-sm sm:text-base",
    opacity: 0.45,
    rotate: -3,
    depth: 0.7,
    font: "hand",
    delay: 0.9,
  },
  {
    kind: "quote",
    content: "404 sleep not found",
    x: "72%",
    y: "12%",
    size: "text-sm sm:text-base",
    opacity: 0.45,
    rotate: 6,
    depth: 0.5,
    font: "hand",
    delay: 1.0,
  },
  {
    kind: "quote",
    content: "adventure awaits",
    x: "85%",
    y: "82%",
    size: "text-sm sm:text-base",
    opacity: 0.45,
    rotate: -6,
    depth: 0.6,
    font: "hand",
    delay: 1.1,
  },

  // Icons
  {
    kind: "icon",
    Icon: Terminal,
    x: "25%",
    y: "12%",
    opacity: 0.3,
    rotate: -12,
    depth: 0.4,
    delay: 0.2,
  },
  {
    kind: "icon",
    Icon: GitBranch,
    x: "70%",
    y: "85%",
    opacity: 0.3,
    rotate: 8,
    depth: 0.5,
    delay: 0.4,
  },
  {
    kind: "icon",
    Icon: Braces,
    x: "6%",
    y: "42%",
    opacity: 0.28,
    rotate: -5,
    depth: 0.6,
    delay: 0.3,
  },
  {
    kind: "icon",
    Icon: Coffee,
    x: "94%",
    y: "65%",
    opacity: 0.32,
    rotate: 10,
    depth: 0.7,
    delay: 0.5,
  },
  {
    kind: "icon",
    Icon: Sparkles,
    x: "30%",
    y: "88%",
    opacity: 0.35,
    rotate: 0,
    depth: 0.8,
    delay: 0.6,
  },
  {
    kind: "icon",
    Icon: Rocket,
    x: "65%",
    y: "8%",
    opacity: 0.3,
    rotate: 25,
    depth: 0.5,
    delay: 0.7,
  },
  {
    kind: "icon",
    Icon: Code2,
    x: "50%",
    y: "92%",
    opacity: 0.25,
    rotate: 0,
    depth: 0.4,
    delay: 0.8,
  },
  {
    kind: "icon",
    Icon: Heart,
    x: "10%",
    y: "65%",
    opacity: 0.3,
    rotate: -8,
    depth: 0.6,
    delay: 0.9,
  },

  // Soft blurred shapes
  {
    kind: "blob",
    x: "20%",
    y: "70%",
    opacity: 0.4,
    blur: 40,
    depth: 0.3,
    delay: 0,
  },
  {
    kind: "blob",
    x: "75%",
    y: "30%",
    opacity: 0.35,
    blur: 50,
    depth: 0.4,
    delay: 0.5,
  },
];

export function FloatingElements() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-[1]">
      {items.map((it, i) => (
        <FloatNode key={i} item={it} />
      ))}
    </div>
  );
}

function FloatNode({ item }: { item: FloatItem }) {
  const fontClass =
    item.font === "mono"
      ? "font-mono"
      : item.font === "hand"
        ? "font-display italic"
        : "font-display";

  if (item.kind === "blob") {
    return (
      <motion.div
        style={{
          left: item.x,
          top: item.y,
          opacity: item.opacity,
          filter: `blur(${item.blur ?? 30}px)`,
        }}
        className="absolute h-24 w-24 rounded-full bg-primary/35"
        animate={{
          scale: [1, 1.06, 1],
          x: [0, 4, -2, 0],
          y: [0, -4, 2, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          delay: item.delay,
          ease: "easeInOut",
        }}
      />
    );
  }

  return (
    <motion.div
      style={{
        left: item.x,
        top: item.y,
        opacity: item.opacity,
        rotate: item.rotate ?? 0,
        filter: item.blur ? `blur(${item.blur}px)` : undefined,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 select-none"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: item.opacity,
        scale: 1,
        x: [0, 3, -2, 0],
        y: [0, -6, 2, 0],
      }}
      transition={{
        opacity: { duration: 1.2, delay: item.delay },
        scale: { duration: 1.2, delay: item.delay },
        x: {
          duration: 7 + (item.delay ?? 0),
          repeat: Infinity,
          ease: "easeInOut",
        },
        y: {
          duration: 6 + (item.delay ?? 0),
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}>
      {item.kind === "icon" && item.Icon ? (
        <item.Icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary-glow drop-shadow-[0_0_12px_var(--primary)]" />
      ) : (
        <span
          className={`${fontClass} ${item.size ?? "text-base"} text-primary-glow whitespace-nowrap drop-shadow-[0_0_10px_var(--primary)]`}>
          {item.content}
        </span>
      )}
    </motion.div>
  );
}
