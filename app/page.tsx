"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import ScrollZoomHero from "@/components/ScrollZoomHero";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import FAQSection from "@/components/FAQSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import ImageStrip from "@/components/ImageStrip";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <CustomCursor />

      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <main
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.6s ease",
        }}
      >
        {/* Hero — Scroll Zoom with your photo */}
        <ScrollZoomHero />

        {/* Projects — Scroll Pinned with Tilt Cards */}
        <ProjectsSection />

        {/* Skills — Card Stack Animation */}
        <SkillsSection />

        {/* Image gallery strip with parallax */}
        <ImageStrip />

        {/* Experience — Gesture Animations */}
        <ExperienceSection />

        {/* Testimonials — Auto-rotating quotes */}
        <TestimonialsSection />

        {/* FAQ — Accordion */}
        <FAQSection />

        {/* Contact — Wireframe Form */}
        <ContactSection />

        {/* Footer */}
        <footer className="relative py-20">
          <div className="mx-auto max-w-6xl px-6">
            <RevealOnScroll>
              <div
                className="h-[1px] w-full"
                style={{ background: "rgba(248,245,236,0.08)" }}
              />
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <div className="mt-12 flex flex-col items-center justify-between gap-6 md:flex-row">
                <p
                  className="text-sm"
                  style={{ color: "rgba(248,245,236,0.3)" }}
                >
                  &copy; {new Date().getFullYear()} Kaustubh. All rights
                  reserved.
                </p>

                <div className="flex gap-8">
                  {["GitHub", "LinkedIn", "Twitter", "Email"].map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-xs uppercase tracking-widest transition-colors hover:opacity-80"
                      style={{ color: "rgba(248,245,236,0.4)" }}
                      data-cursor="hover"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </footer>
      </main>
    </>
  );
}
