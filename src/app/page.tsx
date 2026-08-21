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

      {/* Bible studies teaser */}
      <section className="bg-sage/10 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sage-dark">
              Dig Deeper
            </p>
            <h2 className="font-display text-3xl leading-tight text-clay-900 sm:text-4xl">
              Grow in God&rsquo;s Word alongside women who get it
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-clay-700">
              Whether you&rsquo;re new to Scripture or have studied it for years, there&rsquo;s a
              group for you. Our studies meet weekly in person and online, with childcare
              available for in-person groups.
            </p>
            <div className="mt-8">
              <ButtonLink href="/bible-studies">Find a Study</ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative">
            <div className="aspect-[4/3] w-full rounded-3xl bg-gradient-to-br from-linen via-honey/50 to-terracotta-light/60 shadow-inner" />
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white px-6 py-4 shadow-lg ring-1 ring-clay-900/5">
              <p className="font-display text-2xl text-terracotta-dark">3</p>
              <p className="text-xs uppercase tracking-wide text-clay-500">weekly studies</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Newsletter / get involved band */}
      <section className="bg-clay-900 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl text-cream sm:text-4xl">Stay in the light</h2>
          <p className="mt-4 text-base leading-relaxed text-cream/70">
            Get occasional updates on events, Bible studies, and ways to get involved — straight
            to your inbox.
          </p>
          <div className="mt-8">
            <NewsletterForm dark />
          </div>
        </Reveal>
      </section>
    </>
  );
}
