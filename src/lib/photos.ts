import { getSupabaseClient, PhotoRow } from "@/lib/supabase";
import { site, founder } from "@/lib/site";

export async function getGroupPhotos(): Promise<{ photos: string[]; isLive: boolean }> {
  const supabase = getSupabaseClient();
  if (!supabase) return { photos: site.groupPhotos, isLive: false };

  const { data, error } = await supabase
    .from("photos")
    .select("id, category, url, alt_text, sort_order")
    .eq("category", "group")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) {
    return { photos: site.groupPhotos, isLive: false };
  }

  return { photos: (data as PhotoRow[]).map((row) => row.url), isLive: true };
}

export async function getFounderPhoto(): Promise<{ photo: string; isLive: boolean }> {
  const supabase = getSupabaseClient();
  if (!supabase) return { photo: founder.photo, isLive: false };

  const { data, error } = await supabase
    .from("photos")
    .select("id, category, url, alt_text, sort_order")
    .eq("category", "founder")
    .order("sort_order", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return { photo: founder.photo, isLive: false };
  }

  return { photo: (data as PhotoRow).url, isLive: true };
}
