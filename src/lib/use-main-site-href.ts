"use client";

import { useSyncExternalStore } from "react";

const MAIN_SITE = "https://www.shineministriesok.com";

const subscribe = () => () => {};

// merch.shineministriesok.com serves the same app as the main site, so a plain
// "/about" link would keep you on the merch address. On that host, this turns
// the site's own links into full links back to the main site; everywhere else
// they stay as normal relative links.
//
// useSyncExternalStore (server snapshot = false) means the server render and
// the first client render agree, then it flips to the real host right after.
export function useMainSiteHref() {
  const onMerchHost = useSyncExternalStore(
    subscribe,
    () => window.location.hostname.startsWith("merch."),
    () => false
  );
  return {
    onMerchHost,
    href: (path: string) => (onMerchHost ? `${MAIN_SITE}${path}` : path),
  };
}
