import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { TithelyGiveButton } from "@/components/donate/TithelyGiveButton";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Donate — ${site.name}`,
  description: "Give online to support Shine Ministries.",
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
            <h2 className="font-display text-2xl text-clay-900">Give online</h2>
            <p className="mt-4 text-base leading-relaxed text-clay-700">
              Every gift helps us gather, grow, and serve women across the OKC metro. It only
              takes a minute, and stays right here on our site.
            </p>
            <div className="mt-8 flex flex-col items-center">
              <TithelyGiveButton />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
