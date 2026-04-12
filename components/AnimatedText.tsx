"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type CSSProperties, type ElementType } from "react";

type AnimatedTextProps = {
  children: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  /** If true, animates on scroll into view. If false, animates on mount. Default: false */
  onScroll?: boolean;
};

export default function AnimatedText({
  children,
  as: Tag = "p",
  className = "",
  style,
  delay = 0,
  onScroll = false,
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const shouldAnimate = onScroll ? isInView : true;

  // Split text into words for staggered reveal
  const words = children.split(" ");

  return (
    <Tag className={className} style={style} ref={ref}>
      <span className="sr-only">{children}</span>
      <span aria-hidden className="inline">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={shouldAnimate ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: delay + i * 0.04,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </span>
    </Tag>
  );
}
