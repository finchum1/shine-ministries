import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { SunMark } from "@/components/ui/SunMark";
import { MerchShop } from "@/components/merch/MerchShop";
import { getOpenMerchItems } from "@/lib/merch";
import { site } from "@/lib/site";

// Always render fresh: switching an item off in the office app has to close
// the order page right away, not on the next cache refresh.
export const revalidate = 0;

// A one-off sale link that gets sent to people directly -- not something to
// show up in search results.
export const metadata: Metadata = {
  title: `Shine Merch — ${site.name}`,
  description: "Order Shine Ministries merch.",
  robots: { index: false, follow: false },
};

export default async function MerchPage() {
  const items = await getOpenMerchItems();

  if (items.length === 0) {
    return (
      <section className="bg-cream-soft py-28 sm:py-36">
        <div className="mx-auto max-w-xl px-6 text-center">
          <SunMark className="mx-auto mb-6 h-10 w-10 text-sand-dark" />
          <h1 className="font-display text-3xl text-clay-900 sm:text-4xl">Orders are closed</h1>
          <p className="mt-4 text-base leading-relaxed text-clay-700">
            Thank you for your interest! We&rsquo;re not taking merch orders right now. Follow
            along on our social pages to hear about the next one.
          </p>
          <div className="mt-8">
            <ButtonLink href="/" variant="secondary">
              Back to Shine Ministries
            </ButtonLink>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-cream py-16 sm:py-24">
      <MerchShop items={items} />
    </section>
  );
}
