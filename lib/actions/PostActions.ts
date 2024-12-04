"use server";

import { validateRequest } from "@/auth";
import { createPostSchema } from "../validation";
import prisma from "../prisma";

export default async function createPost(input: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");
  const { content } = createPostSchema.parse({ content: input });
  await prisma.post.create({
    data: {
      content,
      userId: user.id,
    },
  });
  return { status: true };
  // revalidatePath("/"); we can do this for server component but we are gonna implement infinite loading with react query
}
