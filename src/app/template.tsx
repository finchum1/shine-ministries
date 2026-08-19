"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

// template.tsx remounts on every navigation (unlike layout.tsx), which is
// what gives each page a fresh, gentle fade-and-rise entrance.
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
