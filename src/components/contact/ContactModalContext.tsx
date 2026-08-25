"use client";

import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";

type ContactModalContextValue = {
  isOpen: boolean;
  topic: string | null;
  open: (topic?: string) => void;
  close: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState<string | null>(null);

  // Accepts an optional topic (e.g. "speaking") so CTAs like the founder's
  // "Book Me" button can pre-select the right dropdown option in the form.
  const open = useCallback((nextTopic?: string) => {
    setTopic(nextTopic ?? null);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, topic, open, close }), [isOpen, topic, open, close]);

  return <ContactModalContext.Provider value={value}>{children}</ContactModalContext.Provider>;
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error("useContactModal must be used within a ContactModalProvider");
  }
  return ctx;
}
