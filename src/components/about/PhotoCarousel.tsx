"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PER_PAGE = 3;

export function PhotoCarousel({ photos, altPrefix }: { photos: string[]; altPrefix: string }) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(photos.length / PER_PAGE));
  const hasPages = pageCount > 1;

  const goTo = (next: number) => setPage(((next % pageCount) + pageCount) % pageCount);

  const visible = photos.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <div>
      <div className="relative">
        {hasPages && (
          <button
            onClick={() => goTo(page - 1)}
            aria-label="Previous photos"
            className="absolute -left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-clay-700 shadow-md ring-1 ring-clay-900/10 transition-colors hover:text-terracotta-dark sm:-left-5"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M10 3L5 8L10 13"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visible.map((src, i) => (
              <div
                key={`${page}-${i}`}
                className="relative aspect-square overflow-hidden rounded-2xl shadow-inner"
              >
                <Image
                  src={src}
                  alt={`${altPrefix} ${page * PER_PAGE + i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {hasPages && (
          <button
            onClick={() => goTo(page + 1)}
            aria-label="Next photos"
            className="absolute -right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-clay-700 shadow-md ring-1 ring-clay-900/10 transition-colors hover:text-terracotta-dark sm:-right-5"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {hasPages && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to photo set ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === page ? "w-6 bg-sage-dark" : "w-2 bg-clay-900/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
