"use server";;
import prisma from "@/lib/prisma";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function signUp(
  credentials: SignUpValues
): Promise<{ message: string; success: boolean }> {
  try {
    const { username, password, email } = signUpSchema.parse(credentials);

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    const existingUsername = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive", //no case sensitive
        },
      },
    });

    if (existingUsername) {
      return {
        success: false,
        message: "Username already exists",
      };
    }
    const existingEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive", //no case sensitive
        },
      },
    });

    if (existingEmail) {
      return {
        success: false,
        message: "Email already exists",
      };
    }

    await prisma.user.create({
      data: {
        id: userId,
        username,
        displayName: username,
        email,
        passwordHash,
      },
    });
    // return redirect("/"); // Promise<{ error: string }> has a return type of error: string but its not showing any errors because redirect return never
    return {
      success: true,
      message: "Account created Successfully",
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof Error) {
      console.log(error.message);
    } // redirect throws special type of error and the catch block catches it but we need to throw it back again for it to work
    return {
      success: false,
      message: "something went worng.Please try again",
    };
  }
}
