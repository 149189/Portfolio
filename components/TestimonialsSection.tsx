"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import RevealOnScroll from "./RevealOnScroll";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Kaustubh doesn't just build interfaces — he crafts experiences. The animations were butter-smooth and the attention to detail was remarkable.",
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechCorp",
  },
  {
    quote:
      "One of the rare developers who truly understands the intersection of design and engineering. Every interaction felt intentional.",
    name: "Marcus Rivera",
    role: "Design Lead",
    company: "Studio X",
  },
  {
    quote:
      "The performance optimizations alone saved us 40% on load times. But the real win was the elevated user experience that drove engagement.",
    name: "Priya Sharma",
    role: "CTO",
    company: "StartupHub",
  },
  {
    quote:
      "Working with Kaustubh transformed our product from functional to delightful. He brought a cinematic quality to every page transition.",
    name: "James Wu",
    role: "Founder",
    company: "DesignLab",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-200px" });

  // Auto-rotate when in view
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={sectionRef} className="relative py-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section header */}
        <RevealOnScroll>
          <h2
            className="mt-4 text-4xl font-light tracking-tight md:text-6xl"
            style={{ color: "#F8F5EC" }}
          >
            Testimonials
          </h2>
        </RevealOnScroll>

        {/* Main testimonial display */}
        <div className="mt-20 grid gap-12 md:grid-cols-[1fr_280px]">
          {/* Active testimonial */}
          <div
            className="relative rounded-lg p-8 md:p-12 min-h-[280px] flex flex-col justify-between wireframe-corner"
            style={{
              border: "1px dashed rgba(248,245,236,0.1)",
              background: "rgba(248,245,236,0.02)",
            }}
          >
            {/* Quote mark */}
            <div
              className="absolute top-6 left-8 text-6xl font-light leading-none select-none"
              style={{ color: "rgba(248,245,236,0.06)" }}
            >
              &ldquo;
            </div>

            {/* Wireframe grid inside */}
            <div
              className="absolute inset-0 pointer-events-none rounded-lg"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(248,245,236,0.02) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative z-10"
              >
                <p
                  className="text-lg font-light leading-relaxed md:text-xl"
                  style={{ color: "rgba(248,245,236,0.7)" }}
                >
                  &ldquo;{TESTIMONIALS[activeIndex].quote}&rdquo;
                </p>

                <div className="mt-8">
                  <div
                    className="h-[1px] w-12 mb-4"
                    style={{
                      background:
                        "repeating-linear-gradient(90deg, rgba(248,245,236,0.15) 0px, rgba(248,245,236,0.15) 3px, transparent 3px, transparent 6px)",
                    }}
                  />
                  <p
                    className="text-sm font-light"
                    style={{ color: "#F8F5EC" }}
                  >
                    {TESTIMONIALS[activeIndex].name}
                  </p>
                  <p
                    className="mt-1 text-xs"
                    style={{ color: "rgba(248,245,236,0.35)" }}
                  >
                    {TESTIMONIALS[activeIndex].role},{" "}
                    {TESTIMONIALS[activeIndex].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Selector sidebar */}
          <div className="flex flex-col gap-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="relative text-left rounded-lg p-4 transition-all"
                style={{
                  border:
                    i === activeIndex
                      ? "1px solid rgba(248,245,236,0.15)"
                      : "1px dashed rgba(248,245,236,0.06)",
                  background:
                    i === activeIndex
                      ? "rgba(248,245,236,0.04)"
                      : "transparent",
                }}
                whileHover={{
                  borderColor: "rgba(248,245,236,0.12)",
                }}
                whileTap={{ scale: 0.97 }}
                data-cursor="hover"
              >
                {/* Active indicator */}
                {i === activeIndex && (
                  <motion.div
                    layoutId="testimonial-indicator"
                    className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
                    style={{ background: "rgba(248,245,236,0.4)" }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                )}

                <span
                  className="block text-sm font-light"
                  style={{
                    color:
                      i === activeIndex
                        ? "#F8F5EC"
                        : "rgba(248,245,236,0.35)",
                  }}
                >
                  {t.name}
                </span>
                <span
                  className="mt-1 block text-[11px]"
                  style={{ color: "rgba(248,245,236,0.2)" }}
                >
                  {t.company}
                </span>

                {/* Progress bar for active */}
                {i === activeIndex && (
                  <div className="mt-3 h-[1px] w-full overflow-hidden" style={{ background: "rgba(248,245,236,0.06)" }}>
                    <motion.div
                      className="h-full origin-left"
                      style={{ background: "rgba(248,245,236,0.2)" }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 5, ease: "linear" }}
                      key={`progress-${activeIndex}`}
                    />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
