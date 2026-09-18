import { RevealItem } from "@/components/motion/Reveal";
import { EventRow } from "@/lib/supabase";
import { formatEventDate } from "@/lib/events";

// Two distinct highlight treatments — terracotta for the marquee kickoff
// event, sage for the lighter social/prayer-walk gatherings. Terracotta's
// card is the light base tone (not terracotta-dark), so it gets its own
// dark-on-light text set instead of sage's light-on-dark one. The
// "lavender" key name is the stored event.highlight value (set in the
// office app) and stays as-is even though its color is now terracotta.
const highlightStyles = {
  lavender: {
    card: "bg-terracotta hover:shadow-terracotta/30",
    rsvp: "bg-white text-terracotta-dark hover:bg-cream",
    dateBadge: "bg-white/40 text-clay-900",
    title: "text-clay-900",
    meta: "text-clay-900/70",
    description: "text-clay-900/80",
  },
  sage: {
    card: "bg-sage hover:shadow-sage/30",
    rsvp: "bg-white text-sage-dark hover:bg-cream",
    dateBadge: "bg-white/15 text-cream",
    title: "text-cream",
    meta: "text-cream/70",
    description: "text-cream/85",
  },
} as const;

export function EventCard({ event }: { event: EventRow }) {
  const { day, month, weekday } = formatEventDate(event.event_date);
  const highlight = event.highlight ? highlightStyles[event.highlight] : null;
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
              highlight ? highlight.dateBadge : "bg-honey/25 text-terracotta-dark"
            }`}
          >
            <span className="text-xs font-semibold uppercase tracking-wide">{month}</span>
            <span className={dateTbd ? "text-xs font-semibold leading-none" : "font-display text-2xl leading-none"}>
              {dateTbd ? "TBD" : day}
            </span>
          </div>
          <div>
            <h3 className={`font-display text-xl ${highlight ? highlight.title : "text-clay-900"}`}>
              {event.title}
            </h3>
            {(dateTbd || event.event_time || event.location) && (
              <p className={`mt-1 text-sm ${highlight ? highlight.meta : "text-clay-500"}`}>
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
              highlight ? highlight.description : "text-clay-700"
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
