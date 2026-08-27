"use server";

import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { sendContactNotification } from "@/lib/email";

export type ActionResult = { ok: boolean; message: string };

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
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

  const emailResult = await sendContactNotification({
    full_name,
    email,
    phone: phone || undefined,
    topic: resolvedTopic,
    message,
  });

  // Best-effort record-keeping — Supabase isn't wired up yet, so this is a
  // no-op today, but keeps working the moment it is without code changes.
  if (isSupabaseConfigured) {
    const supabase = getSupabaseClient();
    const { error } = await supabase!.from("contact_submissions").insert({
      full_name,
      email,
      phone: phone || null,
      topic: resolvedTopic,
      message,
    });
    if (error) console.error("contact_submissions insert error", error);
  }

  if (!emailResult.ok) {
    console.error("contact email send error", emailResult.error);
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

  return { ok: true, message: "You're subscribed! Thanks for staying connected." };
}
