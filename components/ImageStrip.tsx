"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const IMAGES = [
  "/photos/4.jpg",
  "/photos/5.jpg",
  "/photos/6.jpg",
  "/photos/7.jpg",
  "/photos/8.jpg",
  "/photos/9.jpg",
  "/photos/dragon.jpg",
  "/photos/LORD%20KRISHAN%20HD%20PHOTO.jpg",
  "/photos/tokyo.jpg",
];

export default function ImageStrip() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax: images drift left as you scroll
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);

  return (
    <div ref={ref} className="overflow-hidden py-20">
      <motion.div className="flex gap-4 px-6" style={{ x }}>
        {IMAGES.map((src, i) => (
          <div
            key={i}
            className="relative aspect-[3/4] w-56 flex-shrink-0 overflow-hidden rounded-xl md:w-72"
          >
            <Image
              src={src}
              alt={`Gallery ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 224px, 288px"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(18,18,18,0.6) 0%, transparent 40%)",
              }}
            />
            <span
              className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "rgba(248,245,236,0.4)" }}
            >
              #{String(i + 1).padStart(3, "0")}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
