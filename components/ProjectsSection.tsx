"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import TiltCard from "./TiltCard";
import RevealOnScroll from "./RevealOnScroll";

type Project = {
  title: string;
  description: string;
  tags: string[];
  year: string;
  image: string;
};

const PROJECTS: Project[] = [
  {
    title: "Project Alpha",
    description:
      "A cinematic web experience with scroll-driven storytelling and immersive animations.",
    tags: ["Next.js", "Framer Motion", "Three.js"],
    year: "2025",
    image: "/projects/1.jpg",
  },
  {
    title: "Project Beta",
    description:
      "Full-stack SaaS platform with real-time collaboration and AI-powered features.",
    tags: ["React", "Node.js", "PostgreSQL"],
    year: "2025",
    image: "/projects/6.jpg",
  },
  {
    title: "Project Gamma",
    description:
      "Mobile-first e-commerce platform with gesture-based navigation and micro-interactions.",
    tags: ["React Native", "TypeScript", "Stripe"],
    year: "2024",
    image: "/projects/3.jpg",
  },
  {
    title: "Project Delta",
    description:
      "Design system and component library built for scale with comprehensive documentation.",
    tags: ["Storybook", "Tailwind", "Figma"],
    year: "2024",
    image: "/projects/7.jpg",
  },
  {
    title: "Project Epsilon",
    description:
      "AI-powered analytics dashboard with real-time data visualization and predictive insights.",
    tags: ["Python", "D3.js", "TensorFlow"],
    year: "2024",
    image: "/projects/8.jpg",
  },
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Horizontal scroll: translate the gallery left as user scrolls down
  const galleryX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(PROJECTS.length - 1) * 100}vw`]
  );

  // Progress bar scale
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative">
      {/* Section header */}
      <div className="mx-auto max-w-6xl px-6 py-32">
        <RevealOnScroll>
          <p
            className="text-xs uppercase tracking-[0.35em]"
            style={{ color: "rgba(248,245,236,0.35)" }}
          >
            Selected Work
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h2
            className="mt-4 text-4xl font-light tracking-tight md:text-6xl"
            style={{ color: "#F8F5EC" }}
          >
            Projects
          </h2>
        </RevealOnScroll>
      </div>

      {/* Scroll-pinned horizontal gallery */}
      <div
        ref={containerRef}
        style={{ height: `${PROJECTS.length * 100}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            className="flex h-full"
            style={{ x: galleryX }}
          >
            {PROJECTS.map((project, i) => (
              <div
                key={project.title}
                className="flex h-screen w-screen flex-shrink-0 items-center justify-center px-6 md:px-16"
              >
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </motion.div>

          {/* Progress bar at bottom */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48">
            <div
              className="h-[1px] w-full"
              style={{ background: "rgba(248,245,236,0.1)" }}
            >
              <motion.div
                className="h-full origin-left"
                style={{
                  background: "#F8F5EC",
                  scaleX: progressScale,
                }}
              />
            </div>
            {/* Counter */}
            <div className="mt-3 flex justify-between">
              <span
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{ color: "rgba(248,245,236,0.3)" }}
              >
                01
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{ color: "rgba(248,245,236,0.3)" }}
              >
                {String(PROJECTS.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <TiltCard className="group relative flex w-full max-w-5xl flex-col gap-8 overflow-hidden rounded-2xl md:flex-row md:items-center">
      {/* Card background */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "rgba(248,245,236,0.02)",
          border: "1px solid rgba(248,245,236,0.06)",
        }}
      />

      {/* Image */}
      <div className="relative z-10 aspect-[4/5] w-full overflow-hidden rounded-xl md:w-[45%] md:flex-shrink-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 45vw"
        />
        {/* Subtle overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(18,18,18,0.5) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center p-6 md:p-10">
        {/* Project number */}
        <span
          className="text-xs uppercase tracking-[0.3em]"
          style={{ color: "rgba(248,245,236,0.25)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3
          className="mt-3 text-3xl font-light tracking-tight md:text-5xl"
          style={{ color: "#F8F5EC" }}
        >
          {project.title}
        </h3>

        <p
          className="mt-4 max-w-md text-sm leading-relaxed md:text-base"
          style={{ color: "rgba(248,245,236,0.45)" }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1 text-xs"
              style={{
                border: "1px solid rgba(248,245,236,0.1)",
                color: "rgba(248,245,236,0.45)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Year */}
        <span
          className="mt-8 text-xs"
          style={{ color: "rgba(248,245,236,0.2)" }}
        >
          {project.year}
        </span>
      </div>
    </TiltCard>
  );
}
