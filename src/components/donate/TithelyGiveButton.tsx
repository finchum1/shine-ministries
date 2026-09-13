"use client";

import Script from "next/script";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

// Tithe.ly's own give.js normally wires up ".tithely-give-button" elements
// itself, but it does that by listening for the browser's native
// DOMContentLoaded event -- which has already fired long before this script
// finishes loading in a Next.js app (it's injected client-side, after
// hydration). Their auto-binder silently never runs, so we call their
// public window.tithelyGive.open() API ourselves on click instead -- this is
// exactly what their own auto-binder does internally (open({ form: <id> })),
// just triggered from our own click handler instead of theirs.
//
// Rendered directly in the nav and footer so "Give" goes straight to
// Tithe.ly in one click, with no page in between.
const TITHELY_FORM_ID = "5bea42c0-50c1-4b64-b031-7e527661a3b5";

declare global {
  interface Window {
    tithelyGive?: {
      open: (opts: { form?: string; [key: string]: unknown }) => void;
    };
  }
}

export function TithelyGiveButton({
  label = "Give",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Button
        variant="primary"
        disabled={!ready}
        onClick={() => window.tithelyGive?.open({ form: TITHELY_FORM_ID })}
        className={className}
      >
        {ready ? label : "Loading…"}
      </Button>
      <Script
        src="https://static.tithely.com/give/give.js"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
        onLoad={() => setReady(true)}
      />
    </>
  );
}
