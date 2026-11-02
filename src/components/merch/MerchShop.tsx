"use client";

import Image from "next/image";
import { useState } from "react";
import { MerchOrderForm } from "@/components/forms/MerchOrderForm";
import { SunMark } from "@/components/ui/SunMark";
import { formatMoney, type OpenMerchItem } from "@/lib/merch-shared";

function ItemPhoto({
  item,
  sizes,
  priority = false,
}: {
  item: OpenMerchItem;
  sizes: string;
  priority?: boolean;
}) {
  if (!item.imageUrl) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-cream-soft">
        <SunMark className="h-12 w-12 text-sand-dark" />
      </div>
    );
  }
  return (
    <Image
      src={item.imageUrl}
      alt={item.name}
      fill
      priority={priority}
      sizes={sizes}
      className="object-cover"
    />
  );
}

// The whole order page: the selected product's photo (with a picker when more
// than one item is open), its name, price and description, and the order form.
export function MerchShop({ items }: { items: OpenMerchItem[] }) {
  const [selectedId, setSelectedId] = useState(items[0].id);
  const item = items.find((i) => i.id === selectedId) ?? items[0];

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-6 lg:grid-cols-2 lg:items-start lg:gap-14">
      <div>
        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl shadow-sm ring-1 ring-clay-900/5 lg:max-w-none">
          <ItemPhoto key={item.id} item={item} sizes="(min-width: 1024px) 40vw, 90vw" priority />
        </div>

        {items.length > 1 && (
          <ul className="mx-auto mt-4 grid max-w-md grid-cols-2 gap-3 lg:max-w-none">
            {items.map((i) => {
              const selected = i.id === item.id;
              return (
                <li key={i.id}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setSelectedId(i.id)}
                    className={`w-full overflow-hidden rounded-2xl bg-white text-left shadow-sm transition-shadow hover:shadow-md ${
                      selected ? "ring-2 ring-clay-900" : "ring-1 ring-clay-900/10"
                    }`}
                  >
                    <div className="relative aspect-[4/3]">
                      <ItemPhoto item={i} sizes="(min-width: 1024px) 20vw, 45vw" />
                    </div>
                    <div className="px-3 py-2.5">
                      <p className="text-sm font-medium text-clay-900">{i.name}</p>
                      <p className="text-xs text-clay-700">{formatMoney(i.price)}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-clay-900">
          Shine Merch
        </p>
        <h1 className="font-display text-4xl leading-tight text-clay-900 sm:text-5xl">
          {item.name}
        </h1>
        <p className="mt-3 font-display text-2xl text-clay-700">{formatMoney(item.price)}</p>
        {item.description && (
          <p className="mt-4 text-base leading-relaxed text-clay-700">{item.description}</p>
        )}
        <p className="mt-2 text-base leading-relaxed text-clay-700">
          Fill in your details and you&rsquo;ll be taken to pay. Pickup only.
        </p>

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-clay-900/5 sm:p-8">
          <MerchOrderForm item={item} />
        </div>
      </div>
    </div>
  );
}
