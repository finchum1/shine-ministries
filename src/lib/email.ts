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
