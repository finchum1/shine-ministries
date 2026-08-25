"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useContactModal } from "@/components/contact/ContactModalContext";
import { site } from "@/lib/site";

function NavLinks({ pathname }: { pathname: string }) {
  return (
    <>
      {site.nav.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="group relative py-1 text-sm font-medium text-clay-700 transition-colors hover:text-clay-900"
          >
            {item.label}
            <span
              className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-terracotta transition-all duration-300 ${
                active ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>
        );
      })}
    </>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { open: openContactModal } = useContactModal();

  // Close the mobile menu on navigation. Following React's guidance for
  // "adjusting state when a prop changes," this compares during render
  // instead of resetting from an effect (avoids an extra render + lint
  // warning for a synchronous setState-in-effect).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-lavender/30 backdrop-blur-md shadow-[0_1px_0_rgba(69,58,47,0.08)]"
          : "bg-lavender/15 backdrop-blur-sm"
      }`}
    >
      {/* Desktop: nav links left / logo centered & larger / actions right */}
      <nav className="mx-auto hidden max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 py-3 md:grid">
        <div className="flex items-center gap-8">
          <NavLinks pathname={pathname} />
        </div>

        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/brand/shine-logo.png"
            alt={site.name}
            width={1000}
            height={517}
            priority
            className="h-16 w-auto lg:h-20"
          />
        </Link>

        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={() => openContactModal()} className="!px-5 !py-2.5">
            Contact
          </Button>
          <ButtonLink href="/donate" className="!px-5 !py-2.5">
            Donate
          </ButtonLink>
        </div>
      </nav>

      {/* Mobile: logo left, hamburger right */}
      <div className="flex items-center justify-between px-6 py-4 md:hidden">
        <Link href="/" className="flex items-center">
          <Image
            src="/brand/shine-logo.png"
            alt={site.name}
            width={1000}
            height={517}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-1.5"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="h-[2px] w-6 rounded-full bg-clay-900"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="h-[2px] w-6 rounded-full bg-clay-900"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="h-[2px] w-6 rounded-full bg-clay-900"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-clay-900/10 bg-cream md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {site.nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={`block rounded-lg px-3 py-2.5 text-base font-medium ${
                      pathname === item.href
                        ? "bg-sage/15 text-sage-dark"
                        : "text-clay-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: site.nav.length * 0.05 }}
                className="mt-3 flex flex-col gap-2 border-t border-clay-900/10 pt-3"
              >
                <Button variant="ghost" onClick={() => openContactModal()} className="w-full">
                  Contact
                </Button>
                <ButtonLink href="/donate" fullWidth>
                  Donate
                </ButtonLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
