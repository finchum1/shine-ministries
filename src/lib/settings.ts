import { getSupabaseClient } from "@/lib/supabase";
import { site, founder as fallbackFounder, servingOpportunities as fallbackServingOpportunities } from "@/lib/site";

export type VerseContent = { text: string; reference: string };
export type FounderContent = { name: string; role: string; bio: string[] };
export type ContactContent = {
  email: string;
  social: { instagram: string; facebook: string };
  serviceArea: string[];
  ageNote: string;
};
export type FooterContent = { tagline: string };
export type ServingOpportunity = { id: string; title: string; description: string | null };

async function getSetting<T>(key: string, fallback: T): Promise<T> {
  const supabase = getSupabaseClient();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle();

  if (error || !data) return fallback;
  return data.value as T;
}

export function getVerse(): Promise<VerseContent> {
  return getSetting<VerseContent>("verse", site.verse);
}

export function getVerses(): Promise<VerseContent[]> {
  return getSetting<VerseContent[]>("verses", site.verses);
}

export function getFounderContent(): Promise<FounderContent> {
  return getSetting<FounderContent>("founder", {
    name: fallbackFounder.name,
    role: fallbackFounder.role,
    bio: fallbackFounder.bio,
  });
}

export function getContactContent(): Promise<ContactContent> {
  return getSetting<ContactContent>("contact", {
    email: site.email,
    social: site.social,
    serviceArea: site.serviceArea,
    ageNote: site.ageNote,
  });
}

export function getFooterContent(): Promise<FooterContent> {
  return getSetting<FooterContent>("footer", { tagline: site.description });
}

export async function getServingOpportunities(): Promise<ServingOpportunity[]> {
  const supabase = getSupabaseClient();
  const withFallback = () =>
    fallbackServingOpportunities.map((s, i) => ({ id: `fallback-${i}`, ...s }));

  if (!supabase) return withFallback();

  const { data, error } = await supabase
    .from("serving_opportunities")
    .select("id, title, description")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return withFallback();
  return data as ServingOpportunity[];
}
