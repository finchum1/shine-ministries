import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site, values, leaders } from "@/lib/site";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description: "Learn about Shine Ministries' story, mission, and leadership team.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Our story"
        description="A community of women pursuing God together, one season at a time."
      />

      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sage-dark">
              How We Began
            </p>
            <h2 className="font-display text-3xl leading-tight text-clay-900 sm:text-4xl">
              Born from a handful of women meeting around a kitchen table
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-clay-700">
              <p>
                Shine Ministries started small — a few women in the Oklahoma City area gathering to
                pray, study Scripture, and encourage one another through the everyday realities of
                life. What began as a simple weekly meeting has grown into a community of women
                from all walks of life, united by a shared desire to know God more deeply and love
                others well.
              </p>
              <p>
                Today, we exist to help women take their next step in faith — through Bible study,
                friendship, and hands-on service — no matter where they&rsquo;re starting from.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="aspect-[4/3] w-full rounded-3xl bg-gradient-to-br from-sage-light via-sand to-terracotta-light/50 shadow-inner" />
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-soft py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Our Values"
            title="What guides everything we do"
            description="These aren't just words on a page — they shape how we plan, gather, and care for one another."
          />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-3">
            {values.map((value) => (
              <RevealItem key={value.title}>
                <div className="h-full rounded-2xl bg-white p-8 shadow-sm ring-1 ring-clay-900/5">
                  <h3 className="font-display text-xl text-clay-900">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-clay-700">{value.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Meet the Team"
            title="Leadership"
            description="The women who help shepherd and organize this community."
          />
          <RevealGroup className="mt-14 grid gap-8 sm:grid-cols-3">
            {leaders.map((leader) => (
              <RevealItem key={leader.name}>
                <div className="text-center">
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-terracotta-light to-sand text-2xl font-display text-clay-900 shadow-sm">
                    {leader.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="mt-5 font-display text-lg text-clay-900">{leader.name}</h3>
                  <p className="text-sm font-medium text-terracotta-dark">{leader.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-clay-700">{leader.bio}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-sage/10 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl text-clay-900 sm:text-4xl">New here?</h2>
          <p className="mt-4 text-base leading-relaxed text-clay-700">
            We&rsquo;d love to meet you. Come as you are — no experience with Bible study or church
            required, just an open heart. {site.ageNote}.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {site.serviceArea.map((city) => (
              <span
                key={city}
                className="rounded-full bg-white px-4 py-1.5 text-xs font-medium text-clay-700 ring-1 ring-clay-900/8"
              >
                {city}, OK
              </span>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
