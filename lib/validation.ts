import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
  email: requiredString.email("Ivalid Email Address"),
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only letters, number,- and _ accepted"
  ),
  password: requiredString.min(8, "Must be at least 8 chatacters"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type LoginValue = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: requiredString,
});

export type CreatePostType = z.infer<typeof createPostSchema>;
