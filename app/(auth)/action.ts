"use server";

import { validateRequest, lucia } from "@/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logout() {
  const { session } = await validateRequest();
  if (!session) {
    throw new Error("Unauthorized");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/login");
}
