import { RevealItem } from "@/components/motion/Reveal";
import { EventRow } from "@/lib/supabase";
import { formatEventDate } from "@/lib/events";

export function EventCard({ event }: { event: EventRow }) {
  const { day, month } = formatEventDate(event.event_date);

  return (
    <RevealItem className="group h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-clay-900/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-terracotta/10">
        <div className="flex items-start gap-4 p-6 pb-4">
          <div className="flex w-16 shrink-0 flex-col items-center rounded-xl bg-terracotta/10 py-2 text-terracotta-dark">
            <span className="text-xs font-semibold uppercase tracking-wide">{month}</span>
            <span className="font-display text-2xl leading-none">{day}</span>
          </div>
          <div>
            <h3 className="font-display text-xl text-clay-900">{event.title}</h3>
            {(event.event_time || event.location) && (
              <p className="mt-1 text-sm text-clay-500">
                {event.event_time}
                {event.event_time && event.location ? " · " : ""}
                {event.location}
              </p>
            )}
          </div>
        </div>
        {event.description && (
          <p className="px-6 pb-6 text-sm leading-relaxed text-clay-700">{event.description}</p>
        )}
      </div>
    </RevealItem>
  );
}
