"use client";

import Script from "next/script";
import { useState } from "react";

// Tithe.ly's own give.js normally wires up ".tithely-give-button" elements
// itself, but it does that by listening for the browser's native
// DOMContentLoaded event -- which has already fired long before this script
// finishes loading in a Next.js app (it's injected client-side, after
// hydration). Their auto-binder silently never runs, so the button just
// looked dead. Instead we call their public window.tithelyGive.open() API
// ourselves on click, once the script has loaded -- this is exactly what
// their own auto-binder does internally (open({ form: <id> })), just
// triggered from our own click handler instead of theirs.
const TITHELY_FORM_ID = "5bea42c0-50c1-4b64-b031-7e527661a3b5";

declare global {
  interface Window {
    tithelyGive?: {
      open: (opts: { form?: string; [key: string]: unknown }) => void;
    };
  }
}

export function TithelyGiveButton() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <button
        type="button"
        disabled={!ready}
        onClick={() => window.tithelyGive?.open({ form: TITHELY_FORM_ID })}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-sage px-8 py-3 text-sm font-medium tracking-wide text-cream shadow-sm shadow-sage/20 transition-colors duration-200 hover:bg-sage-dark disabled:opacity-60 disabled:pointer-events-none"
      >
        {ready ? "Give Now" : "Loading…"}
      </button>
      <Script
        src="https://static.tithely.com/give/give.js"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
        onLoad={() => setReady(true)}
      />
    </>
  );
}
