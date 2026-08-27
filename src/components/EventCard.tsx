import { RevealItem } from "@/components/motion/Reveal";
import { EventRow } from "@/lib/supabase";
import { formatEventDate } from "@/lib/events";

// Two distinct highlight treatments — lavender for the marquee kickoff
// event, sage for the lighter social/prayer-walk gatherings — both dark
// enough for the same cream text-color set below.
const highlightStyles = {
  lavender: {
    card: "bg-lavender-dark hover:shadow-lavender-dark/30",
    rsvp: "bg-white text-lavender-dark hover:bg-cream",
  },
  sage: {
    card: "bg-sage hover:shadow-sage/30",
    rsvp: "bg-white text-sage-dark hover:bg-cream",
  },
} as const;

export function EventCard({ event }: { event: EventRow }) {
  const { day, month, weekday } = formatEventDate(event.event_date);
  const highlight = event.highlight ? highlightStyles[event.highlight] : null;
  const featured = Boolean(highlight);
  const dateTbd = Boolean(event.date_tbd);

  return (
    <RevealItem className="group h-full">
      <div
        className={`flex h-full flex-col overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${
          highlight ? `${highlight.card} ring-1 ring-white/10` : "border border-clay-900/8 bg-white hover:shadow-terracotta/10"
        }`}
      >
        <div className="flex items-start gap-4 p-6 pb-4">
          <div
            className={`flex w-16 shrink-0 flex-col items-center rounded-xl py-2 ${
              featured ? "bg-white/15 text-cream" : "bg-honey/25 text-terracotta-dark"
            }`}
          >
            <span className="text-xs font-semibold uppercase tracking-wide">{month}</span>
            <span className={dateTbd ? "text-xs font-semibold leading-none" : "font-display text-2xl leading-none"}>
              {dateTbd ? "TBD" : day}
            </span>
          </div>
          <div>
            <h3 className={`font-display text-xl ${featured ? "text-cream" : "text-clay-900"}`}>
              {event.title}
            </h3>
            {(dateTbd || event.event_time || event.location) && (
              <p className={`mt-1 text-sm ${featured ? "text-cream/70" : "text-clay-500"}`}>
                {dateTbd ? "Date TBD" : weekday}
                {event.event_time ? `, ${event.event_time}` : ""}
                {event.location ? ` · ${event.location}` : ""}
              </p>
            )}
          </div>
        </div>
        {event.description && (
          <p
            className={`px-6 text-sm leading-relaxed ${event.rsvp_url ? "pb-4" : "pb-6"} ${
              featured ? "text-cream/85" : "text-clay-700"
            }`}
          >
            {event.description}
          </p>
        )}
        {event.rsvp_url && (
          <div className="mt-auto px-6 pb-6">
            <a
              href={event.rsvp_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium shadow-sm transition-colors ${
                highlight ? highlight.rsvp : "bg-sage text-cream shadow-sage/20 hover:bg-sage-dark"
              }`}
            >
              RSVP
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M4 12L12 4M12 4H5M12 4V11"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </RevealItem>
  );
}
