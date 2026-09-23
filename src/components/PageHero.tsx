"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SunMark } from "@/components/ui/SunMark";

const SLIDESHOW_MS = 5500;

export type HeroPhoto = { src: string; focusY?: number };

// Portrait source photos crop very differently from landscape ones here --
// at typical desktop widths the crop is width-driven, so only a narrow
// horizontal band of the image survives, and that band is centered on
// whatever `focusY` says (0 = top of the photo, 100 = bottom). Each photo's
// subject sits at a different height in frame, so this needs to be settable
// per photo rather than one fixed position for all of them. Defaults to 30
// (a bit above center), a reasonable guess for a typical headshot-style crop.
function focusStyle(focusY = 30): CSSProperties {
  return { objectPosition: `50% ${focusY}%` };
}

// Crossfades through a set of background photos. AnimatePresence's default
// ("sync") mode keeps the outgoing slide mounted while the incoming one
// fades in on top of it, which is what gives the true crossfade instead of
// a hard cut -- same autoplay-with-reduced-motion-escape-hatch pattern as
// PhotoCarousel.
function HeroSlideshow({ photos }: { photos: HeroPhoto[] }) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (photos.length < 2 || shouldReduceMotion) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, SLIDESHOW_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [photos.length, shouldReduceMotion]);

  return (
    <AnimatePresence>
      <motion.div
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image
          src={photos[index].src}
          alt=""
          aria-hidden
          fill
          priority={index === 0}
          sizes="100vw"
          className="object-cover"
          style={focusStyle(photos[index].focusY)}
        />
      </motion.div>
    </AnimatePresence>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  backgroundImage,
  backgroundImages,
}: {
  eyebrow: string;
  title: string;
  description: string;
  backgroundImage?: string;
  backgroundImages?: HeroPhoto[];
}) {
  const photos = backgroundImages && backgroundImages.length > 0 ? backgroundImages : backgroundImage ? [{ src: backgroundImage }] : null;

  if (photos) {
    return (
      <section className="relative min-h-[720px] overflow-hidden bg-clay-900 sm:min-h-[760px] lg:min-h-[820px]">
        {photos.length > 1 ? (
          <HeroSlideshow photos={photos} />
        ) : (
          <Image
            src={photos[0].src}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={focusStyle(photos[0].focusY)}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-clay-900/85 via-clay-900/40 to-clay-900/10" />

        <div className="relative mx-auto flex min-h-[720px] max-w-3xl flex-col justify-end px-6 pb-16 text-center sm:min-h-[760px] sm:pb-20 lg:min-h-[820px]">
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
