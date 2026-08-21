"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-sage text-cream hover:bg-sage-dark shadow-sm shadow-sage/20",
  secondary:
    "bg-transparent border border-clay-900/20 text-clay-900 hover:border-sage hover:text-sage-dark",
  ghost: "bg-sage/10 text-sage-dark hover:bg-sage/20",
};

type ButtonBaseProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  fullWidth = false,
}: ButtonBaseProps & { href: string; fullWidth?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={fullWidth ? "block w-full" : "inline-block"}
    >
      <Link
        href={href}
        className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 ${
          fullWidth ? "w-full" : ""
        } ${variants[variant]} ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonBaseProps & HTMLMotionProps<"button">) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 disabled:opacity-60 disabled:pointer-events-none ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
