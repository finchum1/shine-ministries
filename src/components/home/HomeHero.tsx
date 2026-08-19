"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { SunMark } from "@/components/ui/SunMark";
import { site } from "@/lib/site";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function HomeHero() {
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
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
        animate={{ opacity: 0.5, scale: 1, rotate: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] as const }}
        className="pointer-events-none absolute right-8 top-24 hidden text-sand-dark md:block"
      >
        <SunMark className="h-24 w-24" />
      </motion.div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pb-24 pt-28 text-center sm:pt-36">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-sage/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sage-dark"
        >
          Women&rsquo;s Ministry
        </motion.div>

        <motion.h1
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-display text-5xl leading-[1.05] text-clay-900 sm:text-6xl"
        >
          Let your light
          <span className="block italic text-terracotta-dark">shine.</span>
        </motion.h1>

        <motion.p
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-clay-700"
        >
          {site.description}
        </motion.p>

        <motion.div
          custom={0.32}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <ButtonLink href="/bible-studies">Join a Bible Study</ButtonLink>
          <ButtonLink href="/events" variant="secondary">
            See What&rsquo;s Happening
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
