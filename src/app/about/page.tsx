import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { SunMark } from "@/components/ui/SunMark";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { BookMeCTA } from "@/components/about/BookMeCTA";
import { PhotoCarousel } from "@/components/about/PhotoCarousel";
import { site, founder } from "@/lib/site";

// "Our Values" section is hidden for now — see the commented-out section
// below for how to bring it back.
// import { SectionHeading } from "@/components/ui/SectionHeading";
// import { values } from "@/lib/site";

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
        description="We are a group of women—young and old—gathering to know Jesus more deeply, to encourage one another wholeheartedly, and to shine the light of the Gospel to the world around us."
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
            <div className="mt-5 space-y-4 text-left text-base leading-relaxed text-clay-700">
              <p>
                Shine began simply—a small group of women gathering in my home for Bible study,
                fellowship, and a shared desire to grow in God&rsquo;s Word. Over time, this
                special group became affectionately known as the &ldquo;Wise Warriors.&rdquo;
              </p>
              <p>
                Little by little, younger women began expressing an interest in joining us, and we
                began inviting them in. What started as one small gathering grew into something
                beautifully intergenerational—women of different ages and seasons of life learning
                from one another, encouraging one another, and growing together in faith.
              </p>
              <p>
                And now, here we are—gathering as one community of women with a shared purpose: to
                know Jesus more deeply, to encourage one another wholeheartedly, and to shine the
                light of the Gospel to the world around us.
              </p>
              <p>
                What began in a living room has become Shine Ministries—women growing together,
                loving one another, and carrying His light wherever we go.
              </p>
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
            <div className="mt-5 space-y-4 text-base leading-relaxed text-clay-700">
              {founder.bio.map((paragraph, i) => (
                <p
                  key={i}
                  className={i === founder.bio.length - 1 ? "font-medium italic text-clay-900" : undefined}
                >
                  {paragraph}
                </p>
              ))}
            </div>
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

      {/* Our Values — hidden for now, may come back later.
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
      */}

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
