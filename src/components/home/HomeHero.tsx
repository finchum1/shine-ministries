"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button, ButtonLink } from "@/components/ui/Button";
import { SunMark } from "@/components/ui/SunMark";
import { useContactModal } from "@/components/contact/ContactModalContext";

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

      {/* Photo on the left, copy and buttons on the right. On a phone they
          stack, photo first. */}
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 sm:py-16 md:grid-cols-2 md:gap-12 lg:gap-20">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto w-full max-w-[19rem] sm:max-w-sm md:max-w-md"
        >
          <Image
            src="/hero/home-hero-portrait.jpg"
            alt="A smiling woman in a navy top and jeans, seated on the arm of a cream sofa"
            width={846}
            height={1259}
            priority
            sizes="(min-width: 768px) 448px, 90vw"
            className="h-auto w-full rounded-3xl shadow-lg shadow-clay-900/10 ring-1 ring-clay-900/5"
          />
        </motion.div>

        <div className="text-center md:text-left">
          {/* Rising sun accent with a softly pulsing halo. */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative isolate mx-auto mb-6 h-14 w-14 md:mx-0"
          >
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-10 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold blur-2xl"
              animate={
                shouldReduceMotion
                  ? { opacity: 0.35 }
                  : { opacity: [0.25, 0.45, 0.25], scale: [1, 1.12, 1] }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }
              }
            />
            <motion.div
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={
                shouldReduceMotion ? undefined : { duration: 90, repeat: Infinity, ease: "linear" }
              }
              className="text-gold"
            >
              <SunMark className="h-14 w-14" />
            </motion.div>
          </motion.div>

          {/* Mission statement */}
          <motion.p
            custom={0.05}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-5 font-display text-2xl italic leading-snug text-clay-900 sm:text-3xl lg:text-4xl"
          >
            Gathering and empowering women to shine His glory!
          </motion.p>

          <motion.h1
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-display text-4xl leading-tight sm:text-5xl"
          >
            <motion.span
              className="text-honey"
              animate={
                shouldReduceMotion
                  ? { textShadow: glowShadow(0.8, "230, 193, 90") }
                  : brightenKeyframes("230, 193, 90", 0.85)
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1, times: [0, 0.25, 0.6, 0.9, 1] }
              }
            >
              Brighter and{" "}
            </motion.span>
            <motion.span
              className="italic text-honey"
              animate={
                shouldReduceMotion
                  ? { textShadow: glowShadow(1.15, "230, 193, 90") }
                  : brightenKeyframes("230, 193, 90", 1.15)
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
            className="mt-10 flex flex-wrap items-center justify-center gap-4 md:justify-start"
          >
            <Button onClick={() => openContactModal()}>Get in Touch</Button>
            <ButtonLink href="/events" variant="secondary">
              See What&rsquo;s Happening
            </ButtonLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
