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

// Where Bible study sign-up notifications go. The signup itself is saved in
// bible_study_signups — this is the heads-up so it doesn't sit unnoticed.
const BIBLE_STUDY_RECIPIENT = "brookefinchum@gmail.com";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function htmlText(value: string): string {
  return escapeHtml(value).replace(/\r\n|\r|\n/g, "<br>");
}

export async function sendBibleStudySignupNotification(fields: {
  full_name: string;
  email: string;
  phone?: string;
  bible_study_id?: string;
  study_name?: string;
  message?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const resend = getClient();
  if (!resend) {
    return { ok: false, error: "RESEND_API_KEY is not set." };
  }

  const studyName = fields.study_name?.trim() ?? "";
  const phone = fields.phone?.trim() ?? "";
  const bibleStudyId = fields.bible_study_id?.trim() ?? "";
  const message = fields.message?.trim() ?? "";
  const studyLabel = studyName || "Not sure yet";
  const subjectWho = singleLine(studyName || fields.full_name);

  const rows: [string, string][] = [
    ["Name", fields.full_name],
    ["Email", fields.email],
    ["Phone", phone || "—"],
    ["Study", studyLabel],
    ["Study id", bibleStudyId || "—"],
    ["Message", message || "—"],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = rows
    .map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${htmlText(value)}</p>`)
    .join("");

  const { error } = await resend.emails.send({
    from: "Shine Ministries Website <hello@shineministriesok.com>",
    to: BIBLE_STUDY_RECIPIENT,
    replyTo: singleLine(fields.email),
    subject: `New Bible study sign-up: ${subjectWho}`,
    text,
    html,
  });

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
