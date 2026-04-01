"use server";

import { cookies } from "next/headers";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import type { Wig } from "./types";

type ActionResult<T> =
  | { success: true; data: T; message: string }
  | { success: false; error: string };

function assertAdminAuth() {
  const isAuthenticated =
    cookies().get("admin_authenticated")?.value === "true";

  if (!isAuthenticated) {
    throw new Error("Unauthorized");
  }
}

export async function toggleWigStockAction(
  wigId: string,
  nextStockValue: boolean
): Promise<ActionResult<Wig>> {
  assertAdminAuth();
  const supabaseAdmin = getSupabaseAdminClient();

  if (!supabaseAdmin) {
    return { success: false, error: "Supabase is not configured correctly." };
  }

  const { data, error } = await supabaseAdmin
    .from("wigs")
    .update({ in_stock: nextStockValue, updated_at: new Date().toISOString() })
    .eq("id", wigId)
    .select("id, name, category, lengths, price, description, image_url, in_stock")
    .single<Wig>();

  if (error || !data) {
    return { success: false, error: "Failed to update stock status." };
  }

  return {
    success: true,
    data,
    message: `Stock status updated for ${data.name}.`,
  };
}

export async function deleteWigAction(
  wigId: string
): Promise<ActionResult<{ id: string }>> {
  assertAdminAuth();
  const supabaseAdmin = getSupabaseAdminClient();

  if (!supabaseAdmin) {
    return { success: false, error: "Supabase is not configured correctly." };
  }

  const { error } = await supabaseAdmin.from("wigs").delete().eq("id", wigId);

  if (error) {
    return { success: false, error: "Failed to delete wig." };
  }

  return {
    success: true,
    data: { id: wigId },
    message: "Wig deleted successfully.",
  };
}

export type UpdateWigInput = {
  id: string;
  name: string;
  category: string;
  lengths: string[];
  price: string;
  description: string;
  inStock: boolean;
  currentImageUrl: string | null;
  imageFile?: File | null;
};

const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export async function updateWigAction(
  input: UpdateWigInput
): Promise<ActionResult<Wig>> {
  assertAdminAuth();
  const supabaseAdmin = getSupabaseAdminClient();

  if (!supabaseAdmin) {
    return { success: false, error: "Supabase is not configured correctly." };
  }

  let imageUrlToSave = input.currentImageUrl;

  if (input.imageFile) {
    if (!allowedImageTypes.includes(input.imageFile.type.toLowerCase())) {
      return {
        success: false,
        error: "Invalid file type. Use JPG, JPEG, PNG, or WEBP.",
      };
    }

    const bytes = await input.imageFile.arrayBuffer();
    const fileBuffer = Buffer.from(bytes);
    const extension = getFileExtension(input.imageFile.name, input.imageFile.type);
    const filePath = `wigs/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${extension}`;

    const uploadResult = await supabaseAdmin.storage
      .from("wig-images")
      .upload(filePath, fileBuffer, {
        contentType: input.imageFile.type || "image/jpeg",
        upsert: false,
      });

    if (uploadResult.error) {
      return { success: false, error: "Failed to upload replacement image." };
    }

    const { data: publicData } = supabaseAdmin.storage
      .from("wig-images")
      .getPublicUrl(filePath);
    imageUrlToSave = publicData.publicUrl;
  }

  const payload = {
    name: input.name,
    category: input.category,
    lengths: input.lengths,
    price: input.price.trim() || null,
    description: input.description.trim() || null,
    image_url: imageUrlToSave?.trim() || null,
    in_stock: input.inStock,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabaseAdmin
    .from("wigs")
    .update(payload)
    .eq("id", input.id)
    .select("id, name, category, lengths, price, description, image_url, in_stock")
    .single<Wig>();

  if (error || !data) {
    return { success: false, error: "Failed to update wig details." };
  }

  return {
    success: true,
    data,
    message: `${data.name} updated successfully.`,
  };
}

export type CreateWigInput = {
  name: string;
  category: string;
  lengths: string[];
  price: string;
  description: string;
  inStock: boolean;
  imageFile: File;
};

function getFileExtension(fileName: string, contentType: string): string {
  const normalized = contentType.toLowerCase();
  const fromMime: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };

  if (fromMime[normalized]) {
    return fromMime[normalized];
  }

  const parts = fileName.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "jpg";
}

export async function createWigAction(
  input: CreateWigInput
): Promise<ActionResult<Wig>> {
  assertAdminAuth();
  const supabaseAdmin = getSupabaseAdminClient();

  if (!supabaseAdmin) {
    return { success: false, error: "Supabase is not configured correctly." };
  }

  if (!allowedImageTypes.includes(input.imageFile.type.toLowerCase())) {
    return {
      success: false,
      error: "Invalid file type. Use JPG, JPEG, PNG, or WEBP.",
    };
  }

  const bytes = await input.imageFile.arrayBuffer();
  const fileBuffer = Buffer.from(bytes);
  const extension = getFileExtension(input.imageFile.name, input.imageFile.type);
  const filePath = `wigs/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${extension}`;

  const uploadResult = await supabaseAdmin.storage
    .from("wig-images")
    .upload(filePath, fileBuffer, {
      contentType: input.imageFile.type || "image/jpeg",
      upsert: false,
    });

  if (uploadResult.error) {
    return { success: false, error: "Failed to upload image." };
  }

  const { data: publicData } = supabaseAdmin.storage
    .from("wig-images")
    .getPublicUrl(filePath);

  const { data, error } = await supabaseAdmin
    .from("wigs")
    .insert({
      name: input.name,
      category: input.category,
      lengths: input.lengths,
      price: input.price.trim() || null,
      description: input.description.trim() || null,
      image_url: publicData.publicUrl,
      in_stock: input.inStock,
    })
    .select("id, name, category, lengths, price, description, image_url, in_stock")
    .single<Wig>();

  if (error || !data) {
    return { success: false, error: "Failed to save wig details." };
  }

  return {
    success: true,
    data,
    message: "Wig added successfully!",
  };
}
