"use client";

import { motion, useMotionValue, useTransform, animate, PanInfo } from "framer-motion";
import { useState, useCallback } from "react";
import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";

type Skill = {
  category: string;
  items: string[];
  label: string;
  image: string;
};

const SKILLS: Skill[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    label: "UI / Client",
    image: "/photos/4.jpg",
  },
  {
    category: "Animation",
    items: ["Framer Motion", "GSAP", "Three.js", "CSS Animations"],
    label: "Motion / 3D",
    image: "/photos/5.jpg",
  },
  {
    category: "Backend",
    items: ["Node.js", "PostgreSQL", "REST APIs", "GraphQL"],
    label: "Server / Data",
    image: "/photos/6.jpg",
  },
  {
    category: "Design",
    items: ["Figma", "Prototyping", "Design Systems", "UX Research"],
    label: "Visual / UX",
    image: "/photos/7.jpg",
  },
  {
    category: "DevOps",
    items: ["Docker", "CI/CD", "AWS", "Vercel"],
    label: "Infra / Deploy",
    image: "/photos/8.jpg",
  },
];

const SWIPE_THRESHOLD = 120;
const SWIPE_VELOCITY = 300;

export default function SkillsSection() {
  // Track the order of card indices — first element is the top card
  const [cardOrder, setCardOrder] = useState(() => SKILLS.map((_, i) => i));
  const [swiping, setSwiping] = useState(false);

  const sendToBack = useCallback(() => {
    setCardOrder((prev) => [...prev.slice(1), prev[0]]);
    setSwiping(false);
  }, []);

  return (
    <section className="relative wireframe-grid py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <RevealOnScroll>
          <h2
            className="mt-4 text-4xl font-light tracking-tight md:text-6xl"
            style={{ color: "#F8F5EC" }}
          >
            Skills
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.15}>
          <p
            className="mt-3 max-w-md text-sm leading-relaxed"
            style={{ color: "rgba(248,245,236,0.35)" }}
          >
            Swipe cards left or right to explore.
          </p>
        </RevealOnScroll>
      </div>

      {/* Card stack */}
      <div className="relative mt-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="relative" style={{ height: "480px" }}>
            {cardOrder.map((skillIndex, stackPosition) => (
              <SwipeCard
                key={skillIndex}
                skill={SKILLS[skillIndex]}
                skillIndex={skillIndex}
                stackPosition={stackPosition}
                total={SKILLS.length}
                isTop={stackPosition === 0}
                swiping={swiping}
                onSwipe={() => {
                  setSwiping(true);
                }}
                onSendToBack={sendToBack}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SwipeCard({
  skill,
  skillIndex,
  stackPosition,
  total,
  isTop,
  swiping,
  onSwipe,
  onSendToBack,
}: {
  skill: Skill;
  skillIndex: number;
  stackPosition: number;
  total: number;
  isTop: boolean;
  swiping: boolean;
  onSwipe: () => void;
  onSendToBack: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0.5, 1, 1, 1, 0.5]);

  // Cards behind the top card get progressively smaller and shifted down
  const stackScale = isTop ? 1 : 1 - stackPosition * 0.04;
  const stackY = isTop ? 0 : stackPosition * 10;

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const shouldSwipe =
      Math.abs(info.offset.x) > SWIPE_THRESHOLD ||
      Math.abs(info.velocity.x) > SWIPE_VELOCITY;

    if (shouldSwipe) {
      const direction = info.offset.x > 0 ? 1 : -1;
      onSwipe();
      animate(x, direction * 600, {
        duration: 0.3,
        ease: "easeOut",
        onComplete: () => {
          x.set(0);
          onSendToBack();
        },
      });
    } else {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
    }
  };

  return (
    <motion.div
      className="absolute inset-0 wireframe-corner group"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 1,
        zIndex: total - stackPosition,
        transformOrigin: "center bottom",
        cursor: isTop ? "grab" : "default",
        touchAction: "none",
      }}
      animate={{
        scale: stackScale,
        y: stackY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      drag={isTop && !swiping ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={isTop ? handleDragEnd : undefined}
      whileTap={isTop ? { cursor: "grabbing" } : undefined}
      data-cursor="hover"
    >
      <div
        className="relative h-full rounded-lg overflow-hidden flex flex-col justify-between"
        style={{
          border: isTop
            ? "1px dashed rgba(248,245,236,0.15)"
            : "1px dashed rgba(248,245,236,0.08)",
          background: `rgba(18,18,18,${0.97 - stackPosition * 0.03})`,
        }}
      >
        {/* Grid dots inside card */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(248,245,236,0.03) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Image section */}
        <div className="relative w-full h-40 md:h-48 overflow-hidden border-b border-dashed border-[rgba(248,245,236,0.08)]">
          <Image
            src={skill.image}
            alt={skill.category}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(18,18,18,0.2) 0%, transparent 60%, rgba(18,18,18,0.4) 100%)",
            }}
          />
        </div>

        {/* Top row */}
        <div className="relative z-10 p-8 md:p-10">
          <div className="flex items-center justify-between">
            <span className="wireframe-label">
              {String(skillIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span
              className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]"
              style={{
                border: "1px solid rgba(248,245,236,0.1)",
                color: "rgba(248,245,236,0.3)",
              }}
            >
              {skill.label}
            </span>
          </div>

          <h3
            className="mt-6 text-3xl font-light tracking-tight md:text-4xl"
            style={{ color: "#F8F5EC" }}
          >
            {skill.category}
          </h3>

          {/* Divider */}
          <div
            className="mt-6 h-[1px] w-full"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(248,245,236,0.1) 0px, rgba(248,245,236,0.1) 4px, transparent 4px, transparent 8px)",
            }}
          />
        </div>

        {/* Skill items */}
        <div className="relative z-10 px-8 md:px-10 pb-8 md:pb-10">
          <div className="flex flex-wrap gap-3">
            {skill.items.map((item) => (
              <span
                key={item}
                className="rounded px-4 py-2 text-xs md:text-sm"
                style={{
                  border: "1px solid rgba(248,245,236,0.08)",
                  color: "rgba(248,245,236,0.5)",
                  background: "rgba(248,245,236,0.02)",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Swipe hint — only on top card */}
        {isTop && (
          <div
            className="absolute bottom-3 left-0 right-0 flex justify-center"
          >
            <span className="wireframe-label" style={{ fontSize: "8px" }}>
              ← swipe →
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
