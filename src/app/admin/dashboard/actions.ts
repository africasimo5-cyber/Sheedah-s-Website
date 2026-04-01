"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function adminLogoutAction(): Promise<void> {
  cookies().set("admin_authenticated", "", {
    path: "/",
    expires: new Date(0),
  });

  redirect("/admin");
}
