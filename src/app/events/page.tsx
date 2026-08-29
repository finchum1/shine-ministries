import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { RevealGroup } from "@/components/motion/Reveal";
import { EventCard } from "@/components/EventCard";
import { getUpcomingEvents } from "@/lib/events";
import { site } from "@/lib/site";

// Always render fresh so edits made in the office app show up immediately
// (this page has no dynamic APIs, so Next would otherwise statically render
// it once at build time). revalidate=60 previously caused a confusing lag
// where the request right after a save could still show stale content.
export const revalidate = 0;

export const metadata: Metadata = {
  title: `Events — ${site.name}`,
  description: "Upcoming Shine Ministries events, retreats, and gatherings.",
};

export default async function EventsPage() {
  const { events } = await getUpcomingEvents();

  return (
    <>
      <PageHero
        eyebrow="Mark Your Calendar"
        title="Upcoming events"
        description="Bi-monthly Shine Gatherings, Small Groups, Prayer Walks, Retreats and more. We'd love for you to join us!"
      />

      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          {events.length > 0 ? (
            <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </RevealGroup>
          ) : (
            <div className="rounded-2xl bg-cream-soft py-16 text-center">
              <p className="text-lg text-clay-700">
                No events on the calendar right now — check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
