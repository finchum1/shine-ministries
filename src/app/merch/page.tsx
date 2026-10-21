import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { SunMark } from "@/components/ui/SunMark";
import { MerchOrderForm } from "@/components/forms/MerchOrderForm";
import { getOpenMerchItems } from "@/lib/merch";
import { formatMoney } from "@/lib/merch-shared";
import { site } from "@/lib/site";

// Always render fresh: switching an item off in the office app has to close
// the order page right away, not on the next cache refresh.
export const revalidate = 0;

// A one-off sale link that gets sent to people directly -- not something to
// show up in search results.
export const metadata: Metadata = {
  title: `Shine Merch — ${site.name}`,
  description: "Order a Shine Ministries sweatshirt.",
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

  const single = items.length === 1 ? items[0] : null;

  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 lg:grid-cols-2 lg:items-center lg:gap-14">
        {/* The photo is of the current sale's sweatshirt. */}
        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl shadow-sm ring-1 ring-clay-900/5 lg:max-w-none">
          <Image
            src="/merch/green-sweatshirt.webp"
            alt="Green Shine sweatshirt printed with 2 Corinthians 3:18, Glory to Glory"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-clay-900">
            Shine Merch
          </p>
          <h1 className="font-display text-4xl leading-tight text-clay-900 sm:text-5xl">
            {single ? single.name : "Order your Shine merch"}
          </h1>
          {single && (
            <p className="mt-3 font-display text-2xl text-clay-700">{formatMoney(single.price)}</p>
          )}
          <p className="mt-4 text-base leading-relaxed text-clay-700">
            &ldquo;Glory to Glory&rdquo; &mdash; 2 Corinthians 3:18. Fill in your details, pick your
            size, and you&rsquo;ll be taken to pay. Pickup only.
          </p>

          <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-clay-900/5 sm:p-8">
            <MerchOrderForm items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}
