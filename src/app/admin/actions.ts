"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function adminLoginAction(formData: FormData): Promise<void> {
  const submittedPassword = formData.get("password");
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (
    typeof submittedPassword !== "string" ||
    !adminPassword ||
    submittedPassword !== adminPassword
  ) {
    redirect("/admin?error=incorrect-password");
  }

  cookies().set("admin_authenticated", "true", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  redirect("/admin/dashboard");
}
