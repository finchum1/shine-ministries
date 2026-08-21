import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { DonateCTA } from "@/components/donate/DonateCTA";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Donate — ${site.name}`,
  description: "Ways to give to Shine Ministries.",
};

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Give"
        title="Support the ministry"
        description="Your generosity helps us gather, grow, and serve women across the OKC metro."
      />

      <section className="bg-cream py-20 sm:py-24">
        <Reveal className="mx-auto max-w-xl px-6 text-center">
          <div className="rounded-3xl bg-honey-light/40 p-10 ring-1 ring-honey-dark/15 sm:p-12">
            <h2 className="font-display text-2xl text-clay-900">
              Online giving is on its way
            </h2>
            <p className="mt-4 text-base leading-relaxed text-clay-700">
              We&rsquo;re finalizing the best way for you to give online. In the meantime, reach
              out and we&rsquo;ll be glad to point you to a way to give today.
            </p>
            <div className="mt-8">
              <DonateCTA />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
