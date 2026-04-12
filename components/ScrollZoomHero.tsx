"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import AnimatedText from "./AnimatedText";
import Magnetic from "./Magnetic";

export default function ScrollZoomHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Photo scales from 1 → 1.6 as you scroll
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  // Photo fades out
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  // Text slides up and fades
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Background image with zoom */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: imageScale, opacity: imageOpacity }}
        >
          <Image
            src="/hero-photo.jpg"
            alt="Hero"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Dark overlay for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(18,18,18,0.4) 0%, rgba(18,18,18,0.7) 60%, #121212 100%)",
            }}
          />
        </motion.div>

        {/* Hero content */}
        <motion.div
          className="relative z-10 flex flex-col items-center px-6 text-center"
          style={{ y: textY, opacity: textOpacity }}
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em]"
            style={{
              border: "1px solid rgba(248,245,236,0.12)",
              background: "rgba(248,245,236,0.05)",
              color: "rgba(248,245,236,0.6)",
            }}
          >
            Portfolio
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#F8F5EC" }}
            />
          </motion.div>

          {/* Main heading */}
          <AnimatedText
            as="h1"
            className="mx-auto max-w-4xl text-5xl font-light tracking-tight md:text-7xl lg:text-8xl"
            style={{ color: "#F8F5EC", lineHeight: 1.05 }}
            delay={0.3}
          >
            Creative Developer
          </AnimatedText>

          <AnimatedText
            as="h1"
            className="mx-auto max-w-4xl text-5xl font-light tracking-tight md:text-7xl lg:text-8xl"
            style={{ color: "#F8F5EC", lineHeight: 1.05 }}
            delay={0.45}
          >
            & Designer
          </AnimatedText>

          {/* Subtitle */}
          <AnimatedText
            as="p"
            className="mx-auto mt-6 max-w-xl text-base md:text-lg"
            style={{ color: "rgba(248,245,236,0.5)" }}
            delay={0.6}
          >
            Building cinematic web experiences with motion, craft, and intention.
          </AnimatedText>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 flex gap-4"
          >
            <Magnetic>
              <button
                className="rounded-full px-8 py-3 text-sm font-medium uppercase tracking-widest transition-colors"
                style={{
                  background: "#F8F5EC",
                  color: "#121212",
                }}
                data-cursor="hover"
              >
                View Work
              </button>
            </Magnetic>
            <Magnetic>
              <button
                className="rounded-full px-8 py-3 text-sm font-medium uppercase tracking-widest transition-colors"
                style={{
                  border: "1px solid rgba(248,245,236,0.2)",
                  color: "#F8F5EC",
                  background: "transparent",
                }}
                data-cursor="hover"
              >
                Contact
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "rgba(248,245,236,0.3)" }}
            >
              Scroll
            </span>
            <div
              className="h-8 w-[1px]"
              style={{ background: "rgba(248,245,236,0.2)" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
