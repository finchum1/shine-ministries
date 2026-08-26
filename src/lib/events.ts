import { getSupabaseClient, EventRow, BibleStudyRow } from "@/lib/supabase";
import { fallbackEvents, fallbackBibleStudies } from "@/lib/site";

export async function getUpcomingEvents(limit?: number): Promise<{ events: EventRow[]; isLive: boolean }> {
  const supabase = getSupabaseClient();
  if (!supabase) return { events: fallbackEvents.slice(0, limit), isLive: false };

  const today = new Date().toISOString().slice(0, 10);
  let query = supabase
    .from("events")
    .select("id, title, description, event_date, event_time, location, image_url, rsvp_url, is_featured")
    .eq("is_published", true)
    .gte("event_date", today)
    .order("event_date", { ascending: true });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;

  if (error || !data || data.length === 0) {
    return { events: fallbackEvents.slice(0, limit), isLive: false };
  }

  return { events: data as EventRow[], isLive: true };
}

export async function getBibleStudies(): Promise<{ studies: BibleStudyRow[]; isLive: boolean }> {
  const supabase = getSupabaseClient();
  if (!supabase) return { studies: fallbackBibleStudies, isLive: false };

  const { data, error } = await supabase
    .from("bible_studies")
    .select("id, title, description, day_of_week, meeting_time, location, leader_name")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) {
    return { studies: fallbackBibleStudies, isLive: false };
  }

  return { studies: data as BibleStudyRow[], isLive: true };
}

export function formatEventDate(dateStr: string) {
  // Avoid timezone off-by-one: parse the date-only string as local, not UTC.
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, (month ?? 1) - 1, day ?? 1);
  return {
    day: date.toLocaleDateString("en-US", { day: "numeric" }),
    month: date.toLocaleDateString("en-US", { month: "short" }),
    weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
    full: date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  };
}
