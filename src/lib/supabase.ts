import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// The site is designed to work with clean placeholder content even before
// Supabase is configured, so we don't throw here — we just report whether a
// real client is available and let callers fall back gracefully.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient(supabaseUrl as string, supabaseAnonKey as string);
  }
  return client;
}

export type EventRow = {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string | null;
  location: string | null;
  image_url?: string | null;
  rsvp_url?: string | null;
  // Highlighted card treatment — lavender for the marquee kickoff event,
  // sage for the lighter social/prayer-walk gatherings. Absent = plain card.
  highlight?: "lavender" | "sage";
  // When true, event_date is only an internal sort anchor (e.g. last day of
  // the month) — the exact date hasn't been set yet, so the card shows
  // "TBD" instead of a specific day/weekday.
  date_tbd?: boolean;
};

export type BibleStudyRow = {
  id: string;
  title: string;
  description: string | null;
  day_of_week: string | null;
  meeting_time: string | null;
  location: string | null;
  leader_name: string | null;
};
