"use client";

import { useActionState, useEffect, useState, startTransition, type FormEvent } from "react";
import { submitMerchOrder, MerchOrderResult } from "@/app/actions";
import { Button } from "@/components/ui/Button";
import {
  MAX_QUANTITY,
  MERCH_SIZES,
  formatMoney,
  type OpenMerchItem,
} from "@/lib/merch-shared";

const initialState: MerchOrderResult | null = null;

const inputClass =
  "w-full rounded-xl border border-clay-900/12 bg-cream px-4 py-3 text-sm text-clay-900 outline-none transition-shadow placeholder:text-clay-500 focus:border-terracotta focus:ring-2 focus:ring-terracotta/30";

export function MerchOrderForm({ items }: { items: OpenMerchItem[] }) {
  const [state, formAction, pending] = useActionState(submitMerchOrder, initialState);

  // The action is dispatched from onSubmit rather than passed as the form's
  // `action`, because React resets every field after a form action finishes
  // -- which would wipe someone's details (and their size) whenever they hit
  // a validation message. Browser validation (required fields) still runs
  // first, since onSubmit only fires for a valid form.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => formAction(formData));
  }

  const [itemId, setItemId] = useState(items[0]?.id ?? "");
  const [buyerName, setBuyerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("1");

  const item = items.find((i) => i.id === itemId) ?? items[0];
  const qty = Number(quantity);
  const total = item && Number.isInteger(qty) && qty >= 1 ? item.price * qty : null;

  // Once the order is saved, carry the buyer straight on to pay. The button
  // below does the same thing if the automatic jump doesn't happen.
  const paymentUrl = state?.ok ? state.paymentUrl : undefined;
  useEffect(() => {
    if (!paymentUrl) return;
    const timer = setTimeout(() => window.location.assign(paymentUrl), 1800);
    return () => clearTimeout(timer);
  }, [paymentUrl]);

  if (state?.ok) {
    return (
      <div className="rounded-xl bg-sage/10 p-6 text-sage-dark">
        <p>{state.message}</p>
        {paymentUrl && (
          <>
            <p className="mt-3 text-sm">
              Taking you to payment now&hellip; your order isn&rsquo;t complete until you pay.
            </p>
            <a
              href={paymentUrl}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-clay-900 px-6 py-3 text-sm font-medium tracking-wide text-cream shadow-sm shadow-clay-900/20 transition-colors duration-200 hover:bg-clay-900-dark"
            >
              Continue to payment
            </a>
          </>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      {items.length > 1 ? (
        <label className="sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-clay-700">Item</span>
          <select
            name="item_id"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            className={inputClass}
          >
            {items.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name} — {formatMoney(i.price)}
              </option>
            ))}
          </select>
        </label>
      ) : (
        <input type="hidden" name="item_id" value={item?.id ?? ""} />
      )}

      <label className="sm:col-span-2">
        <span className="mb-1.5 block text-sm font-medium text-clay-700">Full name</span>
        <input
          name="buyer_name"
          required
          autoComplete="name"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
          className={inputClass}
        />
      </label>

      <label>
        <span className="mb-1.5 block text-sm font-medium text-clay-700">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </label>

      <label>
        <span className="mb-1.5 block text-sm font-medium text-clay-700">Phone</span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
        />
      </label>
      <p className="-mt-2 text-xs text-clay-500 sm:col-span-2">
        Email or phone — at least one, so we can reach you about pickup.
      </p>

      <label>
        <span className="mb-1.5 block text-sm font-medium text-clay-700">Size</span>
        <select
          name="size"
          required
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className={inputClass}
        >
          <option value="" disabled>
            Choose a size
          </option>
          {MERCH_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span className="mb-1.5 block text-sm font-medium text-clay-700">Quantity</span>
        <input
          name="quantity"
          type="number"
          inputMode="numeric"
          min={1}
          max={MAX_QUANTITY}
          step={1}
          required
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className={inputClass}
        />
      </label>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      {state && !state.ok && (
        <p className="text-sm text-terracotta-dark sm:col-span-2">{state.message}</p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
        <p className="text-sm text-clay-700">
          {total !== null ? (
            <>
              Total: <span className="font-semibold text-clay-900">{formatMoney(total)}</span>
            </>
          ) : (
            "Pickup only"
          )}
        </p>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Continue to payment"}
        </Button>
      </div>
      <p className="-mt-2 text-xs text-clay-500 sm:col-span-2">
        Pickup only. You&rsquo;ll pay securely on the next screen.
      </p>
    </form>
  );
}
