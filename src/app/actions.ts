"use server";

import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import {
  sendBibleStudySignupNotification,
  sendContactNotification,
  sendNewsletterSignupNotification,
  sendMerchOrderNotification,
} from "@/lib/email";
import { MAX_QUANTITY, formatMoney, paymentUrlForTotal } from "@/lib/merch-shared";
import { fallbackBibleStudies } from "@/lib/site";

export type ActionResult = { ok: boolean; message: string };

// A merch order that was saved also says where to send the buyer to pay.
export type MerchOrderResult = ActionResult & { paymentUrl?: string };

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function lookupBibleStudyTitle(bibleStudyId: string): Promise<string | undefined> {
  if (!bibleStudyId) return undefined;

  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase!
      .from("bible_studies")
      .select("title")
      .eq("id", bibleStudyId)
      .maybeSingle();

    if (error) {
      console.error("bible study title lookup error", error);
      return undefined;
    }

    const title = (data as { title?: string } | null)?.title?.trim();
    return title || undefined;
  } catch (err) {
    console.error("bible study title lookup error", err);
    return undefined;
  }
}

export async function submitBibleStudySignup(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const full_name = readString(formData, "full_name");
  const email = readString(formData, "email");
  const phone = readString(formData, "phone");
  const rawStudyId = readString(formData, "bible_study_id");
  // Fallback/placeholder studies (shown when Supabase isn't configured yet)
  // use ids like "fallback-1" which aren't real rows — never send those to the DB.
  const bible_study_id = /^[0-9a-f-]{36}$/i.test(rawStudyId) ? rawStudyId : "";
  const message = readString(formData, "message");

  if (!full_name || !email) {
    return { ok: false, message: "Please enter your name and email." };
  }

  if (!isSupabaseConfigured) {
    return {
      ok: false,
      message:
        "Sign-ups aren't connected yet — please check back soon or reach out to us directly.",
    };
  }

  const supabase = getSupabaseClient();
  const { error } = await supabase!.from("bible_study_signups").insert({
    full_name,
    email,
    phone: phone || null,
    bible_study_id: bible_study_id || null,
    message: message || null,
  });

  if (error) {
    console.error("bible_study_signups insert error", error);
    return { ok: false, message: "Something went wrong. Please try again in a moment." };
  }

  // Best-effort heads-up — the signup is already saved above regardless of
  // whether this notification succeeds.
  const studyName =
    (await lookupBibleStudyTitle(bible_study_id)) ??
    fallbackBibleStudies.find((study) => study.id === rawStudyId)?.title;

  try {
    const notifyResult = await sendBibleStudySignupNotification({
      full_name,
      email,
      phone: phone || undefined,
      bible_study_id: bible_study_id || undefined,
      study_name: studyName,
      message: message || undefined,
    });
    if (!notifyResult.ok) {
      console.error("bible study signup notification error", notifyResult.error);
    }
  } catch (err) {
    console.error("bible study signup notification error", err);
  }

  return { ok: true, message: `Thanks, ${full_name.split(" ")[0]}! We can't wait to have you join us.` };
}

export async function submitContactForm(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const full_name = readString(formData, "full_name");
  const email = readString(formData, "email");
  const phone = readString(formData, "phone");
  const topic = readString(formData, "topic");
  const message = readString(formData, "message");

  if (!full_name || !email || !message) {
    return { ok: false, message: "Please fill in your name, email, and message." };
  }

  const resolvedTopic = topic || "general";

  // Save the row first, then email. The visitor sees the same success message
  // when either step works. Failures are logged, and the error is shown only
  // when both the save and the email fail.
  let saved = false;
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase!.from("contact_submissions").insert({
        full_name,
        email,
        phone: phone || null,
        topic: resolvedTopic,
        message,
      });
      if (error) {
        console.error("contact_submissions insert error", error);
      } else {
        saved = true;
      }
    } catch (err) {
      console.error("contact_submissions insert error", err);
    }
  }

  let emailed = false;
  try {
    const emailResult = await sendContactNotification({
      full_name,
      email,
      phone: phone || undefined,
      topic: resolvedTopic,
      message,
    });
    if (emailResult.ok) {
      emailed = true;
    } else {
      console.error("contact email send error", emailResult.error);
    }
  } catch (err) {
    console.error("contact email send error", err);
  }

  if (!saved && !emailed) {
    return {
      ok: false,
      message:
        "Something went wrong sending your message. Please email us directly at shineministriesoklahoma@gmail.com in the meantime.",
    };
  }

  return { ok: true, message: `Thank you, ${full_name.split(" ")[0]}! We've received your message.` };
}

export async function submitNewsletterSignup(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const email = readString(formData, "email");

  if (!email) {
    return { ok: false, message: "Please enter your email address." };
  }

  if (!isSupabaseConfigured) {
    return {
      ok: false,
      message: "Newsletter sign-up isn't connected yet — please check back soon.",
    };
  }

  const supabase = getSupabaseClient();
  const { error } = await supabase!.from("newsletter_signups").insert({ email });

  if (error) {
    // Unique violation just means they're already subscribed — treat as success.
    if (error.code === "23505") {
      return { ok: true, message: "You're already on the list — thank you!" };
    }
    console.error("newsletter_signups insert error", error);
    return { ok: false, message: "Something went wrong. Please try again in a moment." };
  }

  // Best-effort heads-up — a new subscriber is already saved above
  // regardless of whether this notification succeeds.
  const notifyResult = await sendNewsletterSignupNotification(email);
  if (!notifyResult.ok) {
    console.error("newsletter signup notification error", notifyResult.error);
  }

  return { ok: true, message: "You're subscribed! Thanks for staying connected." };
}

// Friendly wording for each reason the database function can refuse an order.
const merchOrderErrors: Record<string, string> = {
  ITEM_CLOSED: "Sorry — orders for one of these items are closed.",
  NO_ITEMS: "Please add at least one item to your order.",
  NAME_REQUIRED: "Please enter your name.",
  CONTACT_REQUIRED: "Please enter an email or phone number so we can reach you.",
  BAD_EMAIL: "That email address doesn't look right.",
  BAD_PHONE: "That phone number is too long.",
  SIZE_REQUIRED: "Please choose a size for each item that comes in sizes.",
  BAD_QUANTITY: `Please order between 1 and ${MAX_QUANTITY} of each item (20 in all).`,
};

type CartLine = { item_id: string; size: string; quantity: number };

// The order page sends its lines as JSON in one hidden field. Only the shape
// is checked here; the database decides everything else (prices, sizes,
// whether an item is open).
function readCartLines(formData: FormData): CartLine[] | null {
  let raw: unknown;
  try {
    raw = JSON.parse(readString(formData, "lines") || "[]");
  } catch {
    return null;
  }
  if (!Array.isArray(raw)) return null;
  const lines: CartLine[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") return null;
    const { item_id, size, quantity } = entry as Record<string, unknown>;
    if (typeof item_id !== "string") return null;
    lines.push({
      item_id,
      size: typeof size === "string" ? size : "",
      quantity: Number(quantity),
    });
  }
  return lines;
}

export async function submitMerchOrder(
  _prev: MerchOrderResult | null,
  formData: FormData
): Promise<MerchOrderResult> {
  // Hidden field real visitors never see or fill in; if it has anything in
  // it, it's a bot -- act like it worked and save nothing.
  if (readString(formData, "website")) {
    return { ok: true, message: "Thank you!" };
  }

  if (!isSupabaseConfigured) {
    return { ok: false, message: "Ordering isn't available right now — please check back soon." };
  }

  const lines = readCartLines(formData);
  if (!lines || lines.length === 0) {
    return { ok: false, message: merchOrderErrors.NO_ITEMS };
  }
  if (lines.some((l) => !Number.isInteger(l.quantity) || l.quantity < 1 || l.quantity > MAX_QUANTITY)) {
    return { ok: false, message: merchOrderErrors.BAD_QUANTITY };
  }

  const buyer_name = readString(formData, "buyer_name");
  const email = readString(formData, "email");
  const phone = readString(formData, "phone");

  // Prices are never taken from the form -- the database function looks them
  // up from the items, so they can't be changed from the browser. The whole
  // checkout is saved together or not at all.
  const supabase = getSupabaseClient();
  const { data, error } = await supabase!.rpc("place_merch_cart", {
    p_name: buyer_name,
    p_email: email,
    p_phone: phone,
    p_lines: lines,
  });

  if (error) {
    const known = Object.keys(merchOrderErrors).find((code) => error.message.includes(code));
    if (known) return { ok: false, message: merchOrderErrors[known] };
    console.error("place_merch_cart error", error);
    return { ok: false, message: "Something went wrong. Please try again in a moment." };
  }

  const order = (
    data as {
      r_checkout_id: string;
      r_total: number | string;
      r_payment_url: string | null;
      r_lines: { item_name: string; size: string | null; quantity: number; unit_price: number | string }[];
    }[]
  )[0];
  const total = Number(order.r_total);

  // Best-effort heads-up -- the order is already saved above regardless.
  const notifyResult = await sendMerchOrderNotification({
    buyer_name,
    email: email || undefined,
    phone: phone || undefined,
    lines: order.r_lines.map((l) => ({
      item_name: l.item_name,
      size: l.size,
      quantity: l.quantity,
      unit_price: Number(l.unit_price),
    })),
    total: formatMoney(total),
  });
  if (!notifyResult.ok) {
    console.error("merch order notification error", notifyResult.error);
  }

  // One payment for the whole checkout: the link's amount is replaced with
  // the combined total (every item's price x quantity, added up).
  const firstName = buyer_name.split(" ")[0];
  const paymentUrl = order.r_payment_url
    ? paymentUrlForTotal(order.r_payment_url, total)
    : undefined;
  return {
    ok: true,
    message: paymentUrl
      ? `Thank you, ${firstName}! Your order is saved — one more step: complete your payment of ${formatMoney(total)}.`
      : `Thank you, ${firstName}! Your order is saved — we'll be in touch about payment.`,
    paymentUrl,
  };
}
