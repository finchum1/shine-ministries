// Simple, dependency-free social glyphs — kept as inline SVG (same approach
// as SunMark) rather than pulling in an icon library for just two icons.

export function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.87.24-1.46 1.49-1.46H16.5V4.36C16.26 4.32 15.44 4.25 14.49 4.25c-1.98 0-3.34 1.21-3.34 3.43V10.5H8.75v3H11.15V21H13.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
