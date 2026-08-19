"use client";

import { useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitNewsletterSignup, ActionResult } from "@/app/actions";
import { Button } from "@/components/ui/Button";

const initialState: ActionResult | null = null;

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [state, formAction, pending] = useActionState(submitNewsletterSignup, initialState);

  return (
    <div>
      <form action={formAction} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className={`w-full rounded-full px-5 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-terracotta/50 ${
            dark
              ? "bg-white/10 text-cream placeholder:text-cream/50"
              : "bg-white text-clay-900 placeholder:text-clay-500 ring-1 ring-clay-900/10"
          }`}
        />
        <Button type="submit" disabled={pending} className="shrink-0">
          {pending ? "Subscribing…" : "Subscribe"}
        </Button>
      </form>
      <AnimatePresence mode="wait">
        {state && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-3 text-sm ${
              state.ok
                ? dark
                  ? "text-sage-light"
                  : "text-sage-dark"
                : "text-terracotta-dark"
            }`}
          >
            {state.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
