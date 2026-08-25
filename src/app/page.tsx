import { HomeHero } from "@/components/home/HomeHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { EventCard } from "@/components/EventCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { site, values } from "@/lib/site";
import { getUpcomingEvents } from "@/lib/events";
import { SunMark } from "@/components/ui/SunMark";

const icons: Record<string, string> = {
  hands: "🤝",
  leaf: "🌿",
  sun: "☀️",
};

export default async function Home() {
  const { events } = await getUpcomingEvents(3);

  return (
    <>
      <HomeHero />

      {/* Verse callout */}
      <section className="bg-cream py-20 sm:py-24">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <SunMark className="mx-auto mb-6 h-10 w-10 text-sand-dark" />
          <p className="font-display text-2xl leading-relaxed text-clay-900 sm:text-3xl">
            {site.verse.text}
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
            {site.verse.reference}
          </p>
        </Reveal>
      </section>

      {/* Values */}
      <section className="bg-cream-soft py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="What We're About"
            title="Community, growth, and service"
            description="Everything we do flows from these three commitments — to each other, to God's Word, and to the world around us."
          />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-3">
            {values.map((value) => (
              <RevealItem key={value.title}>
                <div className="h-full rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-clay-900/5">
                  <span className="text-3xl">{icons[value.icon]}</span>
                  <h3 className="mt-4 font-display text-xl text-clay-900">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-clay-700">{value.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Mark Your Calendar"
            title="Upcoming events"
            description="A few of the gatherings coming up soon — we'd love to see you there."
          />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </RevealGroup>
          <Reveal className="mt-12 text-center">
            <ButtonLink href="/events" variant="secondary">
              View All Events
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* Newsletter band */}
      <section className="bg-clay-900 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl text-cream sm:text-4xl">Stay in the light</h2>
          <p className="mt-4 text-base leading-relaxed text-cream/70">
            Get occasional updates on events and news from Shine Ministries — straight to your
            inbox.
          </p>
          <div className="mt-8">
            <NewsletterForm dark />
          </div>
        </Reveal>
      </section>
    </>
  );
}
