"use client";

import Link from "next/link";
import { SunMark } from "@/components/ui/SunMark";
import { ButtonLink, Button } from "@/components/ui/Button";
import { useContactModal } from "@/components/contact/ContactModalContext";
import { site } from "@/lib/site";

export function Footer() {
  const { open: openContactModal } = useContactModal();

  return (
    <footer className="border-t border-clay-900/10 bg-cream-soft">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 text-clay-900">
              <SunMark className="h-7 w-7 text-terracotta" />
              <span className="font-display text-lg">{site.name}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-clay-700">
              {site.tagline}
            </p>
            <ButtonLink href="/donate" className="mt-5 !px-5 !py-2.5">
              Donate
            </ButtonLink>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-clay-900">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-clay-700 transition-colors hover:text-terracotta-dark"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-clay-900">
              Connect
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-clay-700">
              <li>
                <Button
                  variant="ghost"
                  onClick={openContactModal}
                  className="!px-4 !py-2 !text-sm"
                >
                  Send us a message
                </Button>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-terracotta-dark">
                  {site.email}
                </a>
              </li>
              <li>Serving the OKC metro area</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-clay-900">
              Follow Along
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-clay-700">
              <li>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-terracotta-dark"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-terracotta-dark"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-clay-900/10 pt-6 text-xs text-clay-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="italic">{site.verse.text} — {site.verse.reference}</p>
        </div>
      </div>
    </footer>
  );
}
