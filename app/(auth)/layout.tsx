import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();
  console.log("user", session.user);
  if (session.user) {
    redirect("/");
  }
  return <>{children}</>;
}
