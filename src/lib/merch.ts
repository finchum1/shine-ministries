import { getSupabaseClient } from "@/lib/supabase";
import type { OpenMerchItem } from "@/lib/merch-shared";

// Items the office has switched on for online orders. The database function
// only ever returns id, name and price for items that are switched on, so a
// closed or unfinished item can't leak out through here.
export async function getOpenMerchItems(): Promise<OpenMerchItem[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase.rpc("get_open_merch_items");
  if (error || !data) {
    if (error) console.error("get_open_merch_items error", error);
    return [];
  }
  return (data as { id: string; name: string; price: number | string }[]).map((row) => ({
    id: row.id,
    name: row.name,
    price: Number(row.price),
  }));
}
