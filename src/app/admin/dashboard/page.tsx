import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import { unstable_noStore as noStore } from "next/cache";
import WigsDashboardClient from "./WigsDashboardClient";
import type { Wig } from "./types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getWigs(): Promise<Wig[]> {
  noStore();
  const supabaseAdmin = getSupabaseAdminClient();

  if (!supabaseAdmin) {
    return [];
  }

  const { data, error } = await supabaseAdmin
    .from("wigs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data as Wig[];
}

export default async function AdminDashboardPage() {
  const wigs = await getWigs();

  return <WigsDashboardClient initialWigs={wigs} />;
}
