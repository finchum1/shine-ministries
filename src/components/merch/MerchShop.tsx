"use client";

import Image from "next/image";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { submitMerchOrder, MerchOrderResult } from "@/app/actions";
import { Button } from "@/components/ui/Button";
import { SunMark } from "@/components/ui/SunMark";
import {
  MAX_QUANTITY,
  MERCH_SIZES,
  formatMoney,
  type OpenMerchItem,
} from "@/lib/merch-shared";

const initialState: MerchOrderResult | null = null;

// One buyer can order up to this many items in all (the database enforces it too).
const MAX_ITEMS_TOTAL = 20;

const inputClass =
  "w-full rounded-xl border border-clay-900/12 bg-cream px-4 py-3 text-sm text-clay-900 outline-none transition-shadow placeholder:text-clay-500 focus:border-terracotta focus:ring-2 focus:ring-terracotta/30";

// A line in the buyer's order. Quantity is kept as text so the field can be
// cleared while typing.
type Line = { key: string; itemId: string; size: string; quantity: string };

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

// The whole order page: a card for each product (with an Add to order
// button) and the order itself -- any mix of items and sizes, one total, one
// payment.
export function MerchShop({ items }: { items: OpenMerchItem[] }) {
  const [state, formAction, pending] = useActionState(submitMerchOrder, initialState);
  const keyCounter = useRef(1);
  const newKey = () => String(keyCounter.current++);

  const byId = new Map(items.map((i) => [i.id, i]));
  const [lines, setLines] = useState<Line[]>([
    { key: "0", itemId: items[0].id, size: "", quantity: "1" },
  ]);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const [buyerName, setBuyerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [clientError, setClientError] = useState<string | null>(null);

  const qtyOf = (l: Line) => {
    const n = Number(l.quantity);
    return Number.isInteger(n) && n >= 1 ? n : 0;
  };
  const unitsTotal = lines.reduce((sum, l) => sum + qtyOf(l), 0);
  const total = lines.reduce((sum, l) => sum + (byId.get(l.itemId)?.price ?? 0) * qtyOf(l), 0);

  function addItem(itemId: string) {
    const item = byId.get(itemId);
    setLines((prev) => {
      // A second tote just bumps the first tote's quantity; sized items get
      // their own line so each can have its own size.
      const existing = item && !item.hasSizes ? prev.find((l) => l.itemId === itemId) : undefined;
      if (existing) {
        return prev.map((l) =>
          l === existing
            ? { ...l, quantity: String(Math.min(MAX_QUANTITY, (Number(l.quantity) || 0) + 1)) }
            : l
        );
      }
      return [...prev, { key: newKey(), itemId, size: "", quantity: "1" }];
    });
    setJustAdded(itemId);
    setTimeout(() => setJustAdded((cur) => (cur === itemId ? null : cur)), 1400);
  }

  const updateLine = (key: string, patch: Partial<Line>) =>
    setLines((prev) => prev.map((l) => (l.key === key ? { ...l, ...patch } : l)));
  const removeLine = (key: string) => setLines((prev) => prev.filter((l) => l.key !== key));

  // The action is dispatched from onSubmit rather than passed as the form's
  // `action`, because React resets every field after a form action finishes
  // -- which would wipe someone's details whenever they hit a validation
  // message. Browser validation (required sizes, quantities) still runs
  // first, since onSubmit only fires for a valid form.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setClientError(null);
    if (lines.length === 0) {
      setClientError("Please add at least one item to your order.");
      return;
    }
    if (unitsTotal > MAX_ITEMS_TOTAL) {
      setClientError(`You can order up to ${MAX_ITEMS_TOTAL} items at once.`);
      return;
    }
    const formData = new FormData(e.currentTarget);
    formData.set(
      "lines",
      JSON.stringify(
        lines.map((l) => ({
          item_id: l.itemId,
          // Items without sizes send none, whatever was chosen before.
          size: byId.get(l.itemId)?.hasSizes ? l.size : "",
          quantity: qtyOf(l),
        }))
      )
    );
    startTransition(() => formAction(formData));
  }

  // Once the order is saved, carry the buyer straight on to pay. The button
  // below does the same thing if the automatic jump doesn't happen.
  const paymentUrl = state?.ok ? state.paymentUrl : undefined;
  useEffect(() => {
    if (!paymentUrl) return;
    const timer = setTimeout(() => window.location.assign(paymentUrl), 1800);
    return () => clearTimeout(timer);
  }, [paymentUrl]);

  const single = items.length === 1;

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 lg:grid-cols-2 lg:items-start lg:gap-14">
      {/* ---- Products ---- */}
      <div className={`mx-auto grid w-full min-w-0 max-w-md grid-cols-1 gap-4 lg:max-w-none ${single ? "" : "sm:grid-cols-2"}`}>
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-clay-900/5"
          >
            <div className={`relative w-full ${single ? "aspect-square" : "aspect-[4/3]"}`}>
              <ItemPhoto
                item={item}
                sizes={single ? "(min-width: 1024px) 40vw, 90vw" : "(min-width: 1024px) 20vw, 45vw"}
                priority={index === 0}
              />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <p className="font-display text-lg leading-snug text-clay-900">{item.name}</p>
              <p className="text-sm text-clay-700">{formatMoney(item.price)}</p>
              {item.description && (
                <p className="mt-1 text-sm leading-relaxed text-clay-700">{item.description}</p>
              )}
              <button
                type="button"
                onClick={() => addItem(item.id)}
                className="mt-3 self-start rounded-full border border-clay-900/20 px-4 py-2 text-sm font-medium text-clay-900 transition-colors hover:border-clay-900 hover:bg-cream"
              >
                {justAdded === item.id ? "Added ✓" : "Add to order"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ---- Order ---- */}
      <div className="min-w-0">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-clay-900">
          Shine Merch
        </p>
        <h1 className="font-display text-4xl leading-tight text-clay-900 sm:text-5xl">
          {single ? items[0].name : "Order your Shine merch"}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-clay-700">
          {single
            ? "Fill in your details and you’ll be taken to pay. Pickup only."
            : "Add what you’d like, fill in your details, and you’ll pay once for everything. Pickup only."}
        </p>

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-clay-900/5 sm:p-8">
          {state?.ok ? (
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
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-3 sm:col-span-2">
                <p className="text-sm font-medium text-clay-700">Your order</p>
                {lines.length === 0 && (
                  <p className="rounded-xl bg-cream p-4 text-sm text-clay-700">
                    Nothing yet — use <span className="font-medium">Add to order</span> on an
                    item.
                  </p>
                )}
                {lines.map((line) => {
                  const item = byId.get(line.itemId) ?? items[0];
                  const qty = qtyOf(line);
                  return (
                    <div
                      key={line.key}
                      className="space-y-2 rounded-2xl bg-cream p-3 ring-1 ring-clay-900/8"
                    >
                      <div className="flex items-center gap-2">
                        <select
                          aria-label="Item"
                          value={line.itemId}
                          onChange={(e) => updateLine(line.key, { itemId: e.target.value })}
                          className="min-w-0 flex-1 rounded-xl border border-clay-900/12 bg-white px-3 py-2.5 text-sm text-clay-900 outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/30"
                        >
                          {items.map((i) => (
                            <option key={i.id} value={i.id}>
                              {i.name} — {formatMoney(i.price)}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => removeLine(line.key)}
                          aria-label="Remove this item"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg leading-none text-clay-500 transition-colors hover:bg-clay-900/8 hover:text-clay-900"
                        >
                          ×
                        </button>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {item.hasSizes && (
                          <select
                            aria-label="Size"
                            required
                            value={line.size}
                            onChange={(e) => updateLine(line.key, { size: e.target.value })}
                            className="w-28 rounded-xl border border-clay-900/12 bg-white px-3 py-2.5 text-sm text-clay-900 outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/30"
                          >
                            <option value="" disabled>
                              Size
                            </option>
                            {MERCH_SIZES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-clay-500">Qty</span>
                          <input
                            aria-label="Quantity"
                            type="number"
                            inputMode="numeric"
                            min={1}
                            max={MAX_QUANTITY}
                            step={1}
                            required
                            value={line.quantity}
                            onChange={(e) => updateLine(line.key, { quantity: e.target.value })}
                            className="w-16 rounded-xl border border-clay-900/12 bg-white px-3 py-2.5 text-center text-sm text-clay-900 outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/30"
                          />
                        </div>
                        <span className="ml-auto text-sm font-medium text-clay-900">
                          {qty ? formatMoney(item.price * qty) : "—"}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <button
                  type="button"
                  onClick={() => addItem(lines[lines.length - 1]?.itemId ?? items[0].id)}
                  className="text-sm font-medium text-clay-900 underline-offset-4 hover:underline"
                >
                  + Add another {single ? "size or item" : "item or size"}
                </button>
              </div>

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

              {/* Honeypot: invisible to people, tempting to bots. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
                </label>
              </div>

              {(clientError || (state && !state.ok)) && (
                <p className="text-sm text-terracotta-dark sm:col-span-2">
                  {clientError ?? state?.message}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
                <p className="text-sm text-clay-700">
                  Total: <span className="font-semibold text-clay-900">{formatMoney(total)}</span>
                </p>
                <Button type="submit" disabled={pending}>
                  {pending ? "Saving…" : "Continue to payment"}
                </Button>
              </div>
              <p className="-mt-2 text-xs text-clay-500 sm:col-span-2">
                Pickup only. You&rsquo;ll pay securely on the next screen.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
