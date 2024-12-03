import Image from "next/image";
import Link from "next/link";
import React from "react";
import signupimage from "../../assests/images/signup-page.png";
import { Metadata } from "next";
import LoginForm from "./LoginForm";
export const metadata: Metadata = {
  title: "login",
};
const login = () => {
  return (
    <main className="h-screen flex items-center justify-center">
      <div className=" h-full flex  max-h-[40rem] w-full max-w-[64rem] rounded-2xl bg-card overflow-hidden shadow-2xl ">
        <div className="md:w-1/2 w-full space-y-10 overflow-y-auto p-10">
          <div className=" space-y-1 text-center">
            <h1 className="text-3xl font-bold">Login to social-media</h1>
            <p className="text-muted-foreground">
              A place where <span className=" italic">you</span> can find a
              friend.
            </p>
          </div>
          <LoginForm />
          <div className=" space-y-5">
            <Link
              className="block hover:underline text-center"
              href={"/signup"}
            >
              Don't have an account?
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
};

export default login;
