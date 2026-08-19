import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { RevealGroup } from "@/components/motion/Reveal";
import { EventCard } from "@/components/EventCard";
import { getUpcomingEvents } from "@/lib/events";
import { site } from "@/lib/site";

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
        description="From casual brunches to weekend retreats, here's what's coming up. We'd love for you to join us."
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
