import { Resend } from "resend";

// All "someone reached out" moments on the site — the header/footer Contact
// button, the hero's Get in Touch, and the founder's Book Me CTA — funnel
// through the shared ContactForm/submitContactForm action, so wiring email
// delivery here covers every one of them at once.
const resendApiKey = process.env.RESEND_API_KEY;

export const isEmailConfigured = Boolean(resendApiKey);

let client: Resend | null = null;
function getClient(): Resend | null {
  if (!resendApiKey) return null;
  if (!client) client = new Resend(resendApiKey);
  return client;
}

// Where every contact-form submission (general questions, prayer requests,
// and both "Book Me" topics) gets emailed.
const CONTACT_RECIPIENT = "brookefinchum@gmail.com";

const topicLabels: Record<string, string> = {
  general: "General question",
  prayer_request: "Prayer request",
  join_small_group: "Join a small group",
  counseling: "Book Counseling Session",
  speaking: "Book Speaking Engagement",
};

export async function sendContactNotification(fields: {
  full_name: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
}): Promise<{ ok: boolean; error?: string }> {
  const resend = getClient();
  if (!resend) {
    return { ok: false, error: "RESEND_API_KEY is not set." };
  }

  const topicLabel = topicLabels[fields.topic] ?? fields.topic;

  const { error } = await resend.emails.send({
    from: "Shine Ministries Website <hello@shineministriesok.com>",
    to: CONTACT_RECIPIENT,
    replyTo: fields.email,
    subject: `${topicLabel} — ${fields.full_name}`,
    text: [
      `Topic: ${topicLabel}`,
      `Name: ${fields.full_name}`,
      `Email: ${fields.email}`,
      fields.phone ? `Phone: ${fields.phone}` : null,
      "",
      fields.message,
    ]
      .filter((line): line is string => line !== null)
      .join("\n"),
  });

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

// Where new-subscriber notifications go. The subscriber list itself lives in
// Supabase's newsletter_signups table (that insert stays the source of
// truth) — this is just a heads-up so a new signup doesn't go unnoticed.
const NEWSLETTER_RECIPIENT = "brookefinchum@gmail.com";

export async function sendNewsletterSignupNotification(email: string): Promise<{ ok: boolean; error?: string }> {
  const resend = getClient();
  if (!resend) {
    return { ok: false, error: "RESEND_API_KEY is not set." };
  }

  const { error } = await resend.emails.send({
    from: "Shine Ministries Website <hello@shineministriesok.com>",
    to: NEWSLETTER_RECIPIENT,
    subject: "New newsletter subscriber",
    text: `${email} just subscribed to the Shine Ministries newsletter.`,
  });

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

// Where new merch-order notifications go. The order itself is already saved
// in the office app's Merch list -- this is the heads-up that it's there.
const MERCH_RECIPIENT = "brookefinchum@gmail.com";

export async function sendMerchOrderNotification(order: {
  buyer_name: string;
  email?: string;
  phone?: string;
  item_name: string;
  size: string;
  quantity: number;
  total: string;
}): Promise<{ ok: boolean; error?: string }> {
  const resend = getClient();
  if (!resend) {
    return { ok: false, error: "RESEND_API_KEY is not set." };
  }

  const { error } = await resend.emails.send({
    from: "Shine Ministries Website <hello@shineministriesok.com>",
    to: MERCH_RECIPIENT,
    // Replying goes straight to the buyer when they left an email.
    replyTo: order.email,
    subject: `New merch order — ${order.buyer_name} (${order.quantity} × ${order.item_name})`,
    text: [
      `${order.buyer_name} just placed an order on the merch page.`,
      "",
      `Item: ${order.item_name}`,
      `Size: ${order.size}`,
      `Quantity: ${order.quantity}`,
      `Total: ${order.total}`,
      order.email ? `Email: ${order.email}` : null,
      order.phone ? `Phone: ${order.phone}` : null,
      "",
      "They were sent on to pay through Tithe.ly. The order is saved as Unpaid in the",
      "office app -- mark it Paid once you see their payment:",
      "https://office.shineministriesok.com/merch",
    ]
      .filter((line): line is string => line !== null)
      .join("\n"),
  });

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
