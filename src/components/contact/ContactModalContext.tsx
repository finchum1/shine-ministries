"use client";

import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";

// "general" is the everyday Contact button (general question / prayer
// request); "booking" is the founder's "Book Me" CTA, which asks about
// booking Gina rather than a general inquiry — each mode shows its own
// set of topic options in the form.
export type ContactModalMode = "general" | "booking";

type OpenOptions = {
  mode?: ContactModalMode;
  topic?: string;
};

type ContactModalContextValue = {
  isOpen: boolean;
  topic: string | null;
  mode: ContactModalMode;
  open: (options?: OpenOptions) => void;
  close: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState<string | null>(null);
  const [mode, setMode] = useState<ContactModalMode>("general");

  const open = useCallback((options?: OpenOptions) => {
    setMode(options?.mode ?? "general");
    setTopic(options?.topic ?? null);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, topic, mode, open, close }),
    [isOpen, topic, mode, open, close]
  );

  return <ContactModalContext.Provider value={value}>{children}</ContactModalContext.Provider>;
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error("useContactModal must be used within a ContactModalProvider");
  }
  return ctx;
}
