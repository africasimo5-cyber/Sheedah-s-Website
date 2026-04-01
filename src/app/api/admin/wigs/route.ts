import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

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

function unauthorized() {
  return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
}

export async function POST(request: Request) {
  const isAuthenticated =
    request.headers.get("cookie")?.includes("admin_authenticated=true") ?? false;

  if (!isAuthenticated) {
    return unauthorized();
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json(
      { success: false, error: "Supabase is not configured correctly." },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const price = String(formData.get("price") ?? "");
  const description = String(formData.get("description") ?? "");
  const inStock = String(formData.get("inStock") ?? "true") === "true";
  const lengthsRaw = String(formData.get("lengths") ?? "[]");
  const imageFile = formData.get("imageFile");

  if (!name || name.length < 3 || !category) {
    return NextResponse.json(
      { success: false, error: "Invalid wig details." },
      { status: 400 }
    );
  }

  const lengths = JSON.parse(lengthsRaw) as string[];
  if (!Array.isArray(lengths) || lengths.length < 1) {
    return NextResponse.json(
      { success: false, error: "At least one length is required." },
      { status: 400 }
    );
  }

  if (!(imageFile instanceof File)) {
    return NextResponse.json(
      { success: false, error: "Image file is required." },
      { status: 400 }
    );
  }

  const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!allowedImageTypes.includes(imageFile.type.toLowerCase())) {
    return NextResponse.json(
      { success: false, error: "Invalid file type. Use JPG, JPEG, PNG, or WEBP." },
      { status: 400 }
    );
  }

  const bytes = await imageFile.arrayBuffer();
  const fileBuffer = Buffer.from(bytes);
  const extension = getFileExtension(imageFile.name, imageFile.type);
  const filePath = `wigs/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

  const upload = await supabase.storage.from("wig-images").upload(filePath, fileBuffer, {
    contentType: imageFile.type || "image/jpeg",
    upsert: false,
  });

  if (upload.error) {
    return NextResponse.json(
      { success: false, error: "Failed to upload image." },
      { status: 500 }
    );
  }

  const { data: publicData } = supabase.storage.from("wig-images").getPublicUrl(filePath);

  const { data, error } = await supabase
    .from("wigs")
    .insert({
      name,
      category,
      lengths,
      price: price.trim() || null,
      description: description.trim() || null,
      image_url: publicData.publicUrl,
      in_stock: inStock,
    })
    .select("id, name, category, lengths, price, description, image_url, in_stock")
    .single();

  if (error || !data) {
    return NextResponse.json(
      { success: false, error: "Failed to save wig details." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    data,
    message: "Wig added successfully!",
  });
}
