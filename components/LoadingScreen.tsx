"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Accelerate: slow start, fast middle, slow end
      const increment = current < 30 ? 1 : current < 70 ? 2 : current < 90 ? 1 : 1;
      current = Math.min(current + increment, 100);
      setCount(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 400);
        setTimeout(() => onComplete(), 1000);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ background: "#121212" }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Counter */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span
              className="block font-light tabular-nums"
              style={{
                fontSize: "clamp(4rem, 15vw, 10rem)",
                color: "#F8F5EC",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              {count}
            </span>
          </motion.div>

          {/* Progress bar */}
          <div className="mt-8 h-[1px] w-48 overflow-hidden" style={{ background: "rgba(248,245,236,0.1)" }}>
            <motion.div
              className="h-full origin-left"
              style={{ background: "#F8F5EC" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>

          {/* Label */}
          <motion.p
            className="mt-4 text-xs uppercase tracking-[0.35em]"
            style={{ color: "rgba(248,245,236,0.35)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
