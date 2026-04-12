"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import Magnetic from "./Magnetic";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Dribbble", href: "#" },
];

export default function ContactSection() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <section className="relative py-32 wireframe-grid">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section header */}
        <RevealOnScroll>
          <h2
            className="mt-4 text-4xl font-light tracking-tight md:text-6xl"
            style={{ color: "#F8F5EC" }}
          >
            Get in Touch
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.15}>
          <p
            className="mt-3 max-w-md text-sm leading-relaxed"
            style={{ color: "rgba(248,245,236,0.35)" }}
          >
            Have a project in mind or want to collaborate? Drop a message.
          </p>
        </RevealOnScroll>

        <div className="mt-20 grid gap-16 md:grid-cols-[1fr_300px]">
          {/* Form */}
          <RevealOnScroll delay={0.2}>
            <form
              ref={formRef}
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-8"
            >
              {/* Name field */}
              <WireframeInput
                label="Name"
                name="name"
                placeholder="Your name"
                focused={focusedField === "name"}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
              />

              {/* Email field */}
              <WireframeInput
                label="Email"
                name="email"
                type="email"
                placeholder="your@email.com"
                focused={focusedField === "email"}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
              />

              {/* Subject field */}
              <WireframeInput
                label="Subject"
                name="subject"
                placeholder="Project inquiry"
                focused={focusedField === "subject"}
                onFocus={() => setFocusedField("subject")}
                onBlur={() => setFocusedField(null)}
              />

              {/* Message field */}
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <label
                    className="wireframe-label"
                    htmlFor="message"
                    style={{
                      color:
                        focusedField === "message"
                          ? "rgba(248,245,236,0.5)"
                          : "rgba(248,245,236,0.2)",
                      transition: "color 0.3s",
                    }}
                  >
                    Message
                  </label>
                </div>
                <motion.textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full resize-none rounded-lg bg-transparent px-5 py-4 text-sm outline-none"
                  style={{
                    color: "#F8F5EC",
                    border:
                      focusedField === "message"
                        ? "1px solid rgba(248,245,236,0.2)"
                        : "1px dashed rgba(248,245,236,0.08)",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  data-cursor="hover"
                />
                {/* Corner marks */}
                {focusedField === "message" && (
                  <>
                    <motion.span
                      className="absolute top-[28px] left-0 w-2 h-2"
                      style={{
                        borderTop: "1px solid rgba(248,245,236,0.3)",
                        borderLeft: "1px solid rgba(248,245,236,0.3)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                    <motion.span
                      className="absolute bottom-0 right-0 w-2 h-2"
                      style={{
                        borderBottom: "1px solid rgba(248,245,236,0.3)",
                        borderRight: "1px solid rgba(248,245,236,0.3)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  </>
                )}
              </div>

              {/* Submit button */}
              <div className="flex items-center gap-6">
                <Magnetic>
                  <motion.button
                    type="submit"
                    className="relative rounded-lg px-10 py-4 text-sm uppercase tracking-[0.2em] overflow-hidden"
                    style={{
                      border: "1px solid rgba(248,245,236,0.15)",
                      color: "#F8F5EC",
                      background: "transparent",
                    }}
                    whileHover={{
                      borderColor: "rgba(248,245,236,0.35)",
                      background: "rgba(248,245,236,0.05)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    data-cursor="hover"
                  >
                    {/* Wireframe fill animation on hover */}
                    <span className="relative z-10">Send Message</span>
                  </motion.button>
                </Magnetic>

              </div>
            </form>
          </RevealOnScroll>

          {/* Sidebar info */}
          <div className="flex flex-col gap-8">
            <RevealOnScroll delay={0.3}>
              <div
                className="rounded-lg p-6 wireframe-corner"
                style={{
                  border: "1px dashed rgba(248,245,236,0.08)",
                  background: "rgba(248,245,236,0.02)",
                }}
              >
                <span className="wireframe-label block mb-4">
                  contact.info
                </span>

                <div className="flex flex-col gap-4">
                  <div>
                    <p
                      className="text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: "rgba(248,245,236,0.25)" }}
                    >
                      Email
                    </p>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: "rgba(248,245,236,0.6)" }}
                    >
                      hello@kaustubh.dev
                    </p>
                  </div>

                  <div
                    className="h-[1px] w-full"
                    style={{
                      background:
                        "repeating-linear-gradient(90deg, rgba(248,245,236,0.06) 0px, rgba(248,245,236,0.06) 3px, transparent 3px, transparent 7px)",
                    }}
                  />

                  <div>
                    <p
                      className="text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: "rgba(248,245,236,0.25)" }}
                    >
                      Location
                    </p>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: "rgba(248,245,236,0.6)" }}
                    >
                      India
                    </p>
                  </div>

                  <div
                    className="h-[1px] w-full"
                    style={{
                      background:
                        "repeating-linear-gradient(90deg, rgba(248,245,236,0.06) 0px, rgba(248,245,236,0.06) 3px, transparent 3px, transparent 7px)",
                    }}
                  />

                  <div>
                    <p
                      className="text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: "rgba(248,245,236,0.25)" }}
                    >
                      Availability
                    </p>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: "rgba(248,245,236,0.6)" }}
                    >
                      Open for freelance
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Social links */}
            <RevealOnScroll delay={0.4}>
              <div
                className="rounded-lg p-6"
                style={{
                  border: "1px dashed rgba(248,245,236,0.08)",
                }}
              >
                <span className="wireframe-label block mb-4">
                  social.links
                </span>

                <div className="flex flex-col gap-2">
                  {SOCIAL_LINKS.map((link, i) => (
                    <Magnetic key={link.label} strength={0.15}>
                      <motion.a
                        href={link.href}
                        className="flex items-center justify-between rounded px-3 py-2 text-sm"
                        style={{ color: "rgba(248,245,236,0.45)" }}
                        whileHover={{
                          color: "rgba(248,245,236,0.8)",
                          background: "rgba(248,245,236,0.03)",
                        }}
                        data-cursor="hover"
                      >
                        <span>{link.label}</span>
                        <span className="wireframe-label">→</span>
                      </motion.a>
                    </Magnetic>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>

      </div>
    </section>
  );
}

function WireframeInput({
  label,
  name,
  type = "text",
  placeholder,
  focused,
  onFocus,
  onBlur,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <label
          className="wireframe-label"
          htmlFor={name}
          style={{
            color: focused
              ? "rgba(248,245,236,0.5)"
              : "rgba(248,245,236,0.2)",
            transition: "color 0.3s",
          }}
        >
          {label}
        </label>
      </div>
      <motion.input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg bg-transparent px-5 py-3 text-sm outline-none"
        style={{
          color: "#F8F5EC",
          border: focused
            ? "1px solid rgba(248,245,236,0.2)"
            : "1px dashed rgba(248,245,236,0.08)",
          transition: "border-color 0.3s",
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        data-cursor="hover"
      />
      {/* Active corner marks */}
      {focused && (
        <>
          <motion.span
            className="absolute top-[28px] left-0 w-2 h-2"
            style={{
              borderTop: "1px solid rgba(248,245,236,0.3)",
              borderLeft: "1px solid rgba(248,245,236,0.3)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <motion.span
            className="absolute bottom-0 right-0 w-2 h-2"
            style={{
              borderBottom: "1px solid rgba(248,245,236,0.3)",
              borderRight: "1px solid rgba(248,245,236,0.3)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        </>
      )}
    </div>
  );
}
