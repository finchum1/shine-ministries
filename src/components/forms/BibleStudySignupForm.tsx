"use client";

import { useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitBibleStudySignup, ActionResult } from "@/app/actions";
import { Button } from "@/components/ui/Button";
import { BibleStudyRow } from "@/lib/supabase";

const initialState: ActionResult | null = null;

const inputClass =
  "w-full rounded-xl border border-clay-900/12 bg-cream px-4 py-3 text-sm text-clay-900 outline-none transition-shadow placeholder:text-clay-500 focus:border-terracotta focus:ring-2 focus:ring-terracotta/30";

export function BibleStudySignupForm({ studies }: { studies: BibleStudyRow[] }) {
  const [state, formAction, pending] = useActionState(submitBibleStudySignup, initialState);

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-clay-900/5 sm:p-10">
      <h3 className="font-display text-2xl text-clay-900">Sign Up for a Study</h3>
      <p className="mt-2 text-sm leading-relaxed text-clay-700">
        Let us know you&rsquo;re interested and we&rsquo;ll follow up with everything you need to
        get started.
      </p>

      <AnimatePresence mode="wait">
        {state?.ok ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-xl bg-sage/10 p-6 text-sage-dark"
          >
            {state.message}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            action={formAction}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            <input name="full_name" required placeholder="Full name" className={inputClass} />
            <input name="email" type="email" required placeholder="Email address" className={inputClass} />
            <input name="phone" placeholder="Phone (optional)" className={`${inputClass} sm:col-span-1`} />
            <select name="bible_study_id" defaultValue="" className={inputClass}>
              <option value="">Not sure yet — surprise me</option>
              {studies.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
            <textarea
              name="message"
              placeholder="Anything you'd like us to know? (optional)"
              rows={3}
              className={`${inputClass} sm:col-span-2 resize-none`}
            />
            {state && !state.ok && (
              <p className="text-sm text-terracotta-dark sm:col-span-2">{state.message}</p>
            )}
            <div className="sm:col-span-2">
              <Button type="submit" disabled={pending} className="w-full sm:w-auto">
                {pending ? "Sending…" : "Sign Me Up"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
