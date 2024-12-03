import { Metadata } from "next";
import signupimage from "../../assests/images/signup-page.png";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./SignUpForm";
export const metadata: Metadata = {
  title: "sign up",
};

export default function Page() {
  return (
    <main className="h-screen flex items-center justify-center">
      <div className=" h-full flex  max-h-[40rem] w-full max-w-[64rem] rounded-2xl bg-card overflow-hidden shadow-2xl ">
        <div className="md:w-1/2 w-full space-y-10 overflow-y-auto p-10">
          <div className=" space-y-1 text-center">
            <h1 className="text-3xl font-bold">Sign Up to social-media</h1>
            <p className="text-muted-foreground">
              A place where <span className=" italic">you</span> can find a
              friend.
            </p>
          </div>
          <div className=" space-y-5">
            <SignUpForm />
            <Link className="block hover:underline text-center" href={"/login"}>
              Already have an account?
            </Link>
          </div>
        </div>
        <Image
          src={signupimage}
          alt="alt"
          className="w-1/2 hidden md:block object-cover"
        />
      </div>
    </main>
  );
}
