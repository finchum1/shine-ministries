// Pure helpers and constants for merch ordering -- safe to import from client
// components (no database client in here).

export type OpenMerchItem = { id: string; name: string; price: number };

// Same list the office app uses, so sizes line up on both sides.
export const MERCH_SIZES = [
  "Youth S",
  "Youth M",
  "Youth L",
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "2XL",
  "3XL",
] as const;

export const MAX_QUANTITY = 10;

export function formatMoney(amount: number): string {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

// The payment link's `amount` is in cents and was set up for a single item,
// so it's replaced with this order's real total (quantity × price). Every
// other part of the link is left exactly as it was.
export function paymentUrlForTotal(baseUrl: string, totalDollars: number): string {
  const url = new URL(baseUrl);
  url.searchParams.set("amount", String(Math.round(totalDollars * 100)));
  return url.toString();
}
