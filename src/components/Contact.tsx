import { motion } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { validateContactForm } from "@/lib/contact";

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validateContactForm(form);
    setErrors(validation.errors);

    if (!validation.valid) {
      setStatus("error");
      setMessage("Please fill in the required fields correctly.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(
          data.message || "Something went wrong while sending your message.",
        );
        return;
      }

      setForm(initialState);
      setErrors({});
      setStatus("success");
      setMessage(
        data.message || "Thanks for reaching out! I'll get back to you soon.",
      );
    } catch {
      setStatus("error");
      setMessage(
        "Unable to reach the server right now. Please try again in a moment.",
      );
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-28 sm:py-36">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-primary/15 blur-[140px]" />
      </div>
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something."
          description="Open to internships, collaborations, and full-stack opportunities. Reach out — I reply fast."
        />

        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-2 space-y-3">
            {[
              {
                icon: Mail,
                label: "Email",
                value: "mjaspa9@gmail.com",
                href: "mailto:mjaspa9@gmail.com",
              },
              {
                icon: Phone,
                label: "Phone",
                value: "0963-498-0128",
                href: "tel:+639634980128",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "Taguig City, Philippines",
              },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="block glass rounded-2xl p-5 hover:border-primary/40 hover:bg-primary/5 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/30 grid place-items-center">
                    <c.icon className="h-4 w-4 text-primary-glow" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      {c.label}
                    </div>
                    <div className="text-sm font-medium group-hover:text-primary-glow transition-colors">
                      {c.value}
                    </div>
                  </div>
                </div>
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              {[
                { icon: FaGithub, href: "https://github.com/tzmvrc" },
                {
                  icon: FaLinkedin,
                  href: "https://www.linkedin.com/in/tzmvrc",
                },
                { icon: Mail, href: "mailto:mjaspa9@gmail.com" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="h-11 w-11 grid place-items-center rounded-xl glass hover:bg-primary/15 hover:border-primary/40 hover:-translate-y-0.5 transition-all">
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3 glass rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">
                  Name
                </label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                  placeholder="Your name"
                />
                {errors.name ? (
                  <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                ) : null}
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                  placeholder="you@example.com"
                />
                {errors.email ? (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                ) : null}
              </div>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">
                Company{" "}
                <span className="text-muted-foreground/70">(optional)</span>
              </label>
              <input
                name="company"
                value={form.company}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, company: e.target.value }))
                }
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                placeholder="Your company"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">
                Message
              </label>
              <textarea
                required
                name="message"
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, message: e.target.value }))
                }
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all resize-none"
                placeholder="Tell me about your project or idea…"
              />
              {errors.message ? (
                <p className="mt-1 text-xs text-red-400">{errors.message}</p>
              ) : null}
            </div>
            {message ? (
              <div
                className={`rounded-xl border px-4 py-3 text-sm ${status === "success" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-red-500/30 bg-red-500/10 text-red-300"}`}>
                {message}
              </div>
            ) : null}
            <button
              type="submit"
              disabled={status === "loading"}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_30px_var(--primary)] hover:shadow-[0_0_50px_var(--primary)] transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70">
              {status === "loading" ? "Sending…" : "Send message"}
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.form>
        </div>
      </div>

      <footer className="mt-24 border-t border-white/5 pt-8 pb-6">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()} Marc Justine Aspa. Crafted with care.
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Built with React, Three.js & Framer Motion
          </span>
        </div>
      </footer>
    </motion.section>
  );
}
