import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { RevealGroup } from "@/components/motion/Reveal";
import { BibleStudyCard } from "@/components/BibleStudyCard";
import { BibleStudySignupForm } from "@/components/forms/BibleStudySignupForm";
import { getBibleStudies } from "@/lib/events";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Bible Studies — ${site.name}`,
  description: "Find a Shine Ministries Bible study group that fits your schedule.",
};

export default async function BibleStudiesPage() {
  const { studies } = await getBibleStudies();

  return (
    <>
      <PageHero
        eyebrow="Dig Deeper"
        title="Bible studies"
        description="Whatever season you're in, there's a group ready to welcome you. Studies run weekly with childcare available in person."
      />

      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studies.map((study) => (
              <BibleStudyCard key={study.id} study={study} />
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-cream-soft py-20 sm:py-24">
        <div className="mx-auto max-w-2xl px-6">
          <BibleStudySignupForm studies={studies} />
        </div>
      </section>
    </>
  );
}
