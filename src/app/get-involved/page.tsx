import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/Reveal";
import { ReachOutCTA } from "@/components/get-involved/ReachOutCTA";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { site } from "@/lib/site";
import { getServingOpportunities } from "@/lib/settings";

// Revalidate periodically so edits made in the office app show up here
// without needing a full redeploy (this page has no dynamic APIs, so
// Next would otherwise statically render it once at build time).
export const revalidate = 60;

export const metadata: Metadata = {
  title: `Get Involved — ${site.name}`,
  description: "Ways to serve, volunteer, and connect with Shine Ministries.",
};

export default async function GetInvolvedPage() {
  const servingOpportunities = await getServingOpportunities();

  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Find your place here"
        description="There are so many ways to plug in — whatever your gifts or schedule, we'd love to have you."
      />

      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Ways to Serve"
            title="Where you could jump in"
            description="Serving alongside other women is one of the best ways to build real friendship."
          />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servingOpportunities.map((opportunity) => (
              <RevealItem key={opportunity.title}>
                <div className="h-full rounded-2xl bg-blush-light/40 p-7 ring-1 ring-blush-dark/10">
                  <h3 className="font-display text-lg text-clay-900">{opportunity.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-clay-700">
                    {opportunity.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-cream-soft py-20 sm:py-24">
        <div className="mx-auto max-w-2xl px-6">
          <ReachOutCTA />
        </div>
      </section>

      <section className="bg-clay-900 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl text-cream sm:text-4xl">Not ready to commit?</h2>
          <p className="mt-4 text-base leading-relaxed text-cream/70">
            Join our email list and we&rsquo;ll let you know about upcoming events and easy ways
            to get involved as they come up.
          </p>
          <div className="mt-8">
            <NewsletterForm dark />
          </div>
        </Reveal>
      </section>
    </>
  );
}
