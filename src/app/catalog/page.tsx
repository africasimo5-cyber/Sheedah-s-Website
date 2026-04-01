import { Metadata } from "next";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import { unstable_noStore as noStore } from "next/cache";
import CatalogClient from "./CatalogClient";

type CatalogWig = {
  id: string;
  name: string;
  category: string;
  lengths: string[];
  price: string | null;
  image_url: string | null;
  in_stock: boolean;
};

export const metadata: Metadata = {
  title: "Hair Catalog | Sheedah's Hair World",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getCatalogWigs(): Promise<CatalogWig[]> {
  noStore();
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("wigs")
    .select("id, name, category, lengths, price, image_url, in_stock, created_at")
    .eq("in_stock", true)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data as CatalogWig[];
}

export default async function Catalog() {
  const wigs = await getCatalogWigs();
  return <CatalogClient wigs={wigs} />;
}
