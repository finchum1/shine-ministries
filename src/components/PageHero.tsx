"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SunMark } from "@/components/ui/SunMark";

export function PageHero({
  eyebrow,
  title,
  description,
  backgroundImage,
}: {
  eyebrow: string;
  title: string;
  description: string;
  backgroundImage?: string;
}) {
  if (backgroundImage) {
    return (
      <section className="relative min-h-[720px] overflow-hidden bg-clay-900 sm:min-h-[520px]">
        <Image
          src={backgroundImage}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-clay-900/85 via-clay-900/55 to-clay-900/35" />

        <div className="relative mx-auto flex min-h-[720px] max-w-3xl flex-col justify-end px-6 pb-16 text-center sm:min-h-[520px] sm:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cream"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl leading-tight text-cream [text-shadow:0_2px_14px_rgba(0,0,0,0.5)] sm:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-cream/90 [text-shadow:0_2px_10px_rgba(0,0,0,0.45)]"
          >
            {description}
          </motion.p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-cream-soft py-24 sm:py-28">
      <motion.div
        aria-hidden
        initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
        animate={{ opacity: 0.12, rotate: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -right-16 -top-16 text-sand-dark"
      >
        <SunMark className="h-72 w-72" />
      </motion.div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-clay-900"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl leading-tight text-clay-900 sm:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-clay-700"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
