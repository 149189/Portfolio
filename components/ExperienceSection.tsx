"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import RevealOnScroll from "./RevealOnScroll";

type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
};

const EXPERIENCES: Experience[] = [
  {
    role: "Senior Frontend Engineer",
    company: "TechCorp",
    period: "2024 — Present",
    description:
      "Leading the frontend architecture for a SaaS platform. Building design systems, scroll-driven animations, and performant UI at scale.",
    tags: ["React", "Next.js", "Framer Motion"],
  },
  {
    role: "Creative Developer",
    company: "Studio X",
    period: "2023 — 2024",
    description:
      "Crafted immersive web experiences for brands. Focused on cinematic storytelling, WebGL, and micro-interactions.",
    tags: ["Three.js", "GSAP", "WebGL"],
  },
  {
    role: "Full Stack Developer",
    company: "StartupHub",
    period: "2022 — 2023",
    description:
      "Built end-to-end features for a fintech product — from database design to pixel-perfect UI with real-time data.",
    tags: ["TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    role: "Frontend Intern",
    company: "DesignLab",
    period: "2021 — 2022",
    description:
      "Started my journey building responsive interfaces and learning the craft of motion design on the web.",
    tags: ["HTML/CSS", "JavaScript", "Figma"],
  },
];

export default function ExperienceSection() {
  return (
    <section className="relative py-32 wireframe-grid">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section header */}
        <RevealOnScroll>
          <h2
            className="mt-4 text-4xl font-light tracking-tight md:text-6xl"
            style={{ color: "#F8F5EC" }}
          >
            Experience
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.15}>
          <p
            className="mt-3 max-w-md text-sm leading-relaxed"
            style={{ color: "rgba(248,245,236,0.35)" }}
          >
            Drag, hover, and tap to explore. Each card is interactive.
          </p>
        </RevealOnScroll>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Vertical timeline line */}
          <div
            className="absolute left-0 top-0 bottom-0 hidden md:block"
            style={{
              width: "1px",
              left: "24px",
              background:
                "repeating-linear-gradient(180deg, rgba(248,245,236,0.1) 0px, rgba(248,245,236,0.1) 6px, transparent 6px, transparent 12px)",
            }}
          />

          <div className="flex flex-col gap-6">
            {EXPERIENCES.map((exp, i) => (
              <RevealOnScroll key={i} delay={i * 0.08}>
                <GestureCard experience={exp} index={i} />
              </RevealOnScroll>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function GestureCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div ref={ref} className="relative md:pl-16">
      {/* Timeline node */}
      <div
        className="absolute left-0 top-8 hidden md:flex wireframe-cross"
        style={{
          width: "48px",
          height: "48px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          className="rounded-full"
          style={{
            width: "8px",
            height: "8px",
            border: "1px solid rgba(248,245,236,0.25)",
            background: isInView ? "rgba(248,245,236,0.15)" : "transparent",
          }}
          animate={{
            scale: isInView ? [1, 1.4, 1] : 1,
          }}
          transition={{ duration: 1.2, repeat: isInView ? Infinity : 0, repeatDelay: 2 }}
        />
      </div>

      {/* Interactive card */}
      <motion.div
        className="relative rounded-lg overflow-hidden wireframe-corner"
        style={{
          border: isDragging
            ? "1px solid rgba(248,245,236,0.2)"
            : "1px dashed rgba(248,245,236,0.08)",
          background: "rgba(18,18,18,0.8)",
          touchAction: "none",
        }}
        // Gesture animations
        whileHover={{
          scale: 1.02,
          borderColor: "rgba(248,245,236,0.15)",
          transition: { duration: 0.3 },
        }}
        whileTap={{
          scale: 0.98,
          transition: { duration: 0.15 },
        }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.08}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        data-cursor="hover"
      >
        {/* Drag indicator */}
        <motion.div
          className="absolute top-3 right-3 flex items-center gap-1"
          animate={{ opacity: isDragging ? 1 : 0.3 }}
        >
          <span className="wireframe-label" style={{ fontSize: "8px" }}>
            {isDragging ? "dragging" : "drag me"}
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{ opacity: 0.3 }}
          >
            <path
              d="M6 1v10M1 6h10"
              stroke="rgba(248,245,236,0.4)"
              strokeWidth="0.5"
            />
          </svg>
        </motion.div>

        <div className="p-6 md:p-8">
          {/* Period + Index */}
          <div className="flex items-center gap-4">
            <span className="wireframe-label">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="h-[1px] flex-1"
              style={{
                background:
                  "repeating-linear-gradient(90deg, rgba(248,245,236,0.06) 0px, rgba(248,245,236,0.06) 3px, transparent 3px, transparent 7px)",
              }}
            />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "rgba(248,245,236,0.3)" }}
            >
              {experience.period}
            </span>
          </div>

          {/* Role + Company */}
          <h3
            className="mt-5 text-xl font-light tracking-tight md:text-2xl"
            style={{ color: "#F8F5EC" }}
          >
            {experience.role}
          </h3>
          <p
            className="mt-1 text-sm"
            style={{ color: "rgba(248,245,236,0.4)" }}
          >
            @ {experience.company}
          </p>

          {/* Description */}
          <p
            className="mt-4 text-sm leading-relaxed max-w-lg"
            style={{ color: "rgba(248,245,236,0.35)" }}
          >
            {experience.description}
          </p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {experience.tags.map((tag) => (
              <motion.span
                key={tag}
                className="rounded px-3 py-1 text-[11px]"
                style={{
                  border: "1px solid rgba(248,245,236,0.08)",
                  color: "rgba(248,245,236,0.4)",
                }}
                whileHover={{
                  borderColor: "rgba(248,245,236,0.2)",
                  color: "rgba(248,245,236,0.7)",
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Bottom wireframe label */}
        <div
          className="px-6 md:px-8 py-3 flex justify-between"
          style={{
            borderTop: "1px dashed rgba(248,245,236,0.05)",
          }}
        >
          <span className="wireframe-label">
            gesture: drag | hover | tap
          </span>
          <span className="wireframe-label">
            node[{index}]
          </span>
        </div>
      </motion.div>
    </div>
  );
}
