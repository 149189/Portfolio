"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [hovering, setHovering] = useState(false);

  const springConfig = { damping: 22, stiffness: 350, mass: 0.35 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Floating target — follows with more lag
  const targetConfig = { damping: 18, stiffness: 120, mass: 0.8 };
  const targetX = useSpring(mouseX, targetConfig);
  const targetY = useSpring(mouseY, targetConfig);

  // Text spotlight — softer spring for the glow
  const spotConfig = { damping: 28, stiffness: 180, mass: 0.5 };
  const spotX = useSpring(mouseX, spotConfig);
  const spotY = useSpring(mouseY, spotConfig);

  // Build the radial mask string reactively
  const spotMask = useTransform(
    [spotX, spotY],
    ([sx, sy]: number[]) =>
      `radial-gradient(circle 140px at ${sx}px ${sy}px, black 0%, transparent 100%)`
  );

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const over = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("button, a, [data-cursor='hover'], input, textarea, [role='button']")) {
        setHovering(true);
      }
    };

    const out = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("button, a, [data-cursor='hover'], input, textarea, [role='button']")) {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over, true);
    window.addEventListener("mouseout", out, true);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over, true);
      window.removeEventListener("mouseout", out, true);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Text masking spotlight — brightens text in a circle around cursor */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[9000] hidden md:block"
        style={{
          background: "rgba(248, 245, 236, 0.07)",
          mixBlendMode: "overlay",
          WebkitMaskImage: spotMask,
          maskImage: spotMask,
        }}
      />

      {/* Main cursor dot — round, grey */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          width: hovering ? 52 : 16,
          height: hovering ? 52 : 16,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <div
          className="h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-200"
          style={{
            background: hovering ? "rgba(180, 180, 180, 0.25)" : "rgba(180, 180, 180, 0.6)",
            border: hovering ? "1px solid rgba(180, 180, 180, 0.4)" : "none",
            backdropFilter: hovering ? "blur(4px)" : "none",
          }}
        />
      </motion.div>

      {/* Floating target — ring that trails behind */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block"
        style={{ x: targetX, y: targetY }}
        animate={{
          width: hovering ? 0 : 36,
          height: hovering ? 0 : 36,
          opacity: hovering ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div
          className="h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            border: "1px solid rgba(180, 180, 180, 0.3)",
          }}
        />
      </motion.div>
    </>
  );
}
