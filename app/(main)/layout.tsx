import { validateRequest } from "@/auth";
import Navbar from "@/components/Navbar";
import SessionProvider from "@/lib/providers/SessionProvider";
import { redirect } from "next/navigation";
import SideBar from "../../components/SideBar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest(); // this is not for security mesure, people can access route if we do it in here
  if (!session.user) {
    redirect("/login");
  }
  // if we remove this the value down below will throw typescript error because we cannot have null in value but as we have defined above that session exist it will let it through
  return (
    <SessionProvider value={session}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto  grow   py-4 flex w-full px-3  gap-5">
          <SideBar className="sm:flex flex-col gap-2 items-stretch sticky top-[5.1rem] h-fit   hidden rounded-2xl bg-card px-3 py-5 lg:px-4 shadow-sm xl:w-80 " />
          {children}
        </div>
        <SideBar className="sticky bottom-0 flex  justify-center rounded-2xl bg-card px-3 py-5 sm:hidden" />
      </div>
    </SessionProvider>
  );
}
