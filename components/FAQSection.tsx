"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevealOnScroll from "./RevealOnScroll";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQ_DATA: FAQItem[] = [
  {
    question: "What technologies do you work with?",
    answer:
      "I specialize in Next.js, React, TypeScript, Framer Motion, Tailwind CSS, and modern web technologies. I also work with Node.js, databases, and cloud platforms for full-stack projects.",
  },
  {
    question: "Are you available for freelance work?",
    answer:
      "Yes, I'm open to freelance opportunities. Whether it's a full project build, a specific feature, or consulting on animations and interactions — feel free to reach out.",
  },
  {
    question: "What is your design process?",
    answer:
      "I start with understanding the problem, then move to wireframing, prototyping, and finally building with clean, performant code. Motion and interaction design are integrated from the start, not bolted on at the end.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on scope. A landing page with animations might take 1-2 weeks. A full web application can take 4-8 weeks. I always provide a realistic timeline after understanding your requirements.",
  },
  {
    question: "Can you work with existing designs?",
    answer:
      "Absolutely. I can implement designs from Figma, Sketch, or any design tool. I pay close attention to spacing, typography, and micro-interactions to match the design intent precisely.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Yes. I believe in building lasting relationships. After launch, I provide bug fixes, performance monitoring, and feature additions as needed. Your project doesn't end at deployment.",
  },
];

export default function FAQSection() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-3xl px-6">
        {/* Section header */}
        <RevealOnScroll>
          <p
            className="text-xs uppercase tracking-[0.35em]"
            style={{ color: "rgba(248,245,236,0.35)" }}
          >
            Questions
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h2
            className="mt-4 text-4xl font-light tracking-tight md:text-6xl"
            style={{ color: "#F8F5EC" }}
          >
            FAQ
          </h2>
        </RevealOnScroll>

        {/* Accordion */}
        <div className="mt-16 flex flex-col">
          {FAQ_DATA.map((item, i) => (
            <RevealOnScroll key={i} delay={i * 0.05}>
              <AccordionItem item={item} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function AccordionItem({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border-b"
      style={{ borderColor: "rgba(248,245,236,0.08)" }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left transition-colors"
        style={{ color: "#F8F5EC" }}
        data-cursor="hover"
      >
        <span className="pr-8 text-base font-light md:text-lg">
          {item.question}
        </span>

        {/* Animated plus/minus */}
        <motion.div
          className="relative flex h-6 w-6 flex-shrink-0 items-center justify-center"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            className="absolute h-[1px] w-3"
            style={{ background: "rgba(248,245,236,0.5)" }}
          />
          <div
            className="absolute h-3 w-[1px]"
            style={{ background: "rgba(248,245,236,0.5)" }}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
              opacity: { duration: 0.25, delay: isOpen ? 0.1 : 0 },
            }}
            className="overflow-hidden"
          >
            <p
              className="pb-6 text-sm leading-relaxed md:text-base"
              style={{ color: "rgba(248,245,236,0.45)" }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
