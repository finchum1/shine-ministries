"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button, ButtonLink } from "@/components/ui/Button";
import { SunMark } from "@/components/ui/SunMark";
import { useContactModal } from "@/components/contact/ContactModalContext";
import { site } from "@/lib/site";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// Warm, layered glow — three shadow layers so it reads as light rather than
// a flat drop shadow. `rgb` lets the second "Brighter" glow a shade hotter
// than the first, visually echoing the phrase itself.
const glowShadow = (intensity: number, rgb = "255, 201, 77") =>
  `0 0 ${14 * intensity}px rgba(${rgb}, ${0.45 * intensity}), ` +
  `0 0 ${34 * intensity}px rgba(${rgb}, ${0.3 * intensity}), ` +
  `0 0 ${64 * intensity}px rgba(${rgb}, ${0.18 * intensity})`;

// Both words ramp from a dim gold up to full brightness, hold there, then
// briefly reset — read together it plays as "brighter, and brighter still"
// rather than a simple back-and-forth pulse.
const brightenKeyframes = (rgb: string, peak: number) => ({
  textShadow: [
    glowShadow(peak * 0.25, rgb),
    glowShadow(peak, rgb),
    glowShadow(peak, rgb),
    glowShadow(peak, rgb),
    glowShadow(peak * 0.25, rgb),
  ],
});

export function HomeHero() {
  const shouldReduceMotion = useReducedMotion();
  const { open: openContactModal } = useContactModal();

  return (
    <section className="relative overflow-hidden bg-cream">
      {/* soft floating earth-tone blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sage/20 blur-3xl"
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-32 h-80 w-80 rounded-full bg-terracotta-light/30 blur-3xl"
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* warm horizon glow that brightens in as the sun rises */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 2.2, delay: 0.3, ease: "easeOut" }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-honey/40 via-honey/10 to-transparent blur-2xl"
      />

      {/* Rising sun — visible at every size, scaling up from a compact
          top-corner accent on mobile to the full desktop treatment. */}
      <div className="pointer-events-none absolute right-3 top-3 sm:right-6 sm:top-16 lg:right-16">
        <motion.div
          aria-hidden
          initial={{ opacity: 0, y: 130 }}
          animate={{ opacity: 0.65, y: 0 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative"
        >
          {/* glowing halo behind the sun, pulsing gently once risen */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold blur-2xl sm:h-44 sm:w-44 sm:blur-3xl md:h-56 md:w-56"
            animate={shouldReduceMotion ? { opacity: 0.35 } : { opacity: [0.25, 0.45, 0.25], scale: [1, 1.12, 1] }}
            transition={shouldReduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            animate={shouldReduceMotion ? undefined : { rotate: 360 }}
            transition={shouldReduceMotion ? undefined : { duration: 90, repeat: Infinity, ease: "linear" }}
            className="text-gold"
          >
            <SunMark className="h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24" />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pb-24 pt-28 text-center sm:pt-36">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-6 max-w-xl rounded-full bg-sage/15 px-6 py-3 text-center text-xs font-semibold leading-relaxed tracking-[0.2em] text-sage-dark"
        >
          {site.description}
        </motion.div>

        <motion.h1
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-display text-5xl leading-[1.05] sm:text-6xl"
        >
          <motion.span
            className="block text-lavender"
            animate={
              shouldReduceMotion
                ? { textShadow: glowShadow(0.8, "168, 155, 196") }
                : brightenKeyframes("168, 155, 196", 0.85)
            }
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1, times: [0, 0.25, 0.6, 0.9, 1] }
            }
          >
            Brighter and
          </motion.span>
          <motion.span
            className="block italic text-gold"
            animate={
              shouldReduceMotion
                ? { textShadow: glowShadow(1.15, "255, 224, 102") }
                : brightenKeyframes("255, 224, 102", 1.15)
            }
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.4, times: [0, 0.25, 0.6, 0.9, 1] }
            }
          >
            Brighter.
          </motion.span>
        </motion.h1>

        <motion.div
          custom={0.32}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button onClick={openContactModal}>Get in Touch</Button>
          <ButtonLink href="/events" variant="secondary">
            See What&rsquo;s Happening
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
