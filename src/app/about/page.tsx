import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SunMark } from "@/components/ui/SunMark";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { BookMeCTA } from "@/components/about/BookMeCTA";
import { PhotoCarousel } from "@/components/about/PhotoCarousel";
import { site, values, founder } from "@/lib/site";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description: "Learn about Shine Ministries' story, mission, and founder.",
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
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sage-dark">
              How We Began
            </p>
            <h2 className="font-display text-3xl leading-tight text-clay-900 sm:text-4xl">
              It all started in a living room
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-clay-700">
              <p>Insert story of Wise Warriors.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <PhotoCarousel photos={site.groupPhotos} altPrefix="Women of Shine Ministries" />
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-soft py-20 sm:py-24">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl shadow-inner lg:max-w-none">
              <Image
                src={founder.photo}
                alt={founder.name}
                fill
                sizes="(min-width: 1024px) 40vw, 384px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sage-dark">
              Meet the Founder
            </p>
            <h2 className="font-display text-3xl leading-tight text-clay-900 sm:text-4xl">
              {founder.name}
            </h2>
            <p className="mt-2 text-sm font-medium text-terracotta-dark">
              {founder.role}, Shine Ministries
            </p>
            <p className="mt-5 text-base leading-relaxed text-clay-700">{founder.bio}</p>
            <div className="mt-6">
              <BookMeCTA />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-lavender/12 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SunMark className="mx-auto mb-5 h-8 w-8 text-lavender-dark" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lavender-dark">
              Words We Hold Onto
            </p>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {site.verses.map((v) => (
              <RevealItem key={v.reference}>
                <div className="h-full rounded-2xl bg-white/70 p-8 text-center shadow-sm ring-1 ring-lavender-dark/15">
                  <p className="font-display text-xl italic leading-relaxed text-clay-900">
                    {v.text}
                  </p>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-lavender-dark">
                    {v.reference}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-24">
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

      <section className="bg-lavender-dark py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl text-cream sm:text-4xl">New here?</h2>
          <p className="mt-4 text-base leading-relaxed text-cream/70">
            We&rsquo;d love to meet you. Come as you are — no experience with Bible study or church
            required, just an open heart. {site.ageNote}.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {site.serviceArea.map((city) => (
              <span
                key={city}
                className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-cream ring-1 ring-white/20"
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
