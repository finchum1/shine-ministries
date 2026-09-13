"use client";

import Script from "next/script";

// Tithe.ly's give.js scans the page for elements with this class and wires
// up a click handler that opens the giving form in an on-page modal --
// visitors never leave the site. Styled to match the site's own pill-button
// look instead of Tithe.ly's default neon-green inline styles.
const TITHELY_FORM_ID = "5bea42c0-50c1-4b64-b031-7e527661a3b5";

export function TithelyGiveButton() {
  return (
    <>
      <button
        type="button"
        className="tithely-give-button inline-flex items-center justify-center gap-2 rounded-full bg-sage px-8 py-3 text-sm font-medium tracking-wide text-cream shadow-sm shadow-sage/20 transition-colors duration-200 hover:bg-sage-dark"
        data-form={TITHELY_FORM_ID}
      >
        Give Now
      </button>
      <Script src="https://static.tithely.com/give/give.js" strategy="afterInteractive" />
    </>
  );
}
