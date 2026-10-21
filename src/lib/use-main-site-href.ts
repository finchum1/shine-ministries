"use client";

import { useSyncExternalStore } from "react";

const MAIN_SITE = "https://www.shineministriesok.com";

const subscribe = () => () => {};

const isFullAddress = (href: string) => /^https?:\/\//.test(href);

// merch.shineministriesok.com serves the same app as the main site, so a plain
// "/about" link would keep you on the merch address. On that host, this turns
// the site's own links into full links back to the main site; everywhere else
// they stay as normal relative links. Links that are already full addresses
// (like the Merch link itself) are left exactly as they are.
//
// useSyncExternalStore (server snapshot = "") means the server render and the
// first client render agree, then it flips to the real host right after.
export function useMainSiteHref() {
  const hostname = useSyncExternalStore(
    subscribe,
    () => window.location.hostname,
    () => ""
  );
  const onMerchHost = hostname.startsWith("merch.");

  return {
    onMerchHost,
    href: (path: string) => (isFullAddress(path) || !onMerchHost ? path : `${MAIN_SITE}${path}`),
    // Whether a nav item is the page you're on. Main-site pages are matched by
    // path (and never "current" on the merch address); full addresses are
    // matched by host, so Merch is underlined while you're on the merch page.
    isActive: (path: string, pathname: string) =>
      isFullAddress(path)
        ? new URL(path).hostname === hostname
        : !onMerchHost && pathname === path,
  };
}
