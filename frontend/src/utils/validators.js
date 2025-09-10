import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password min 6 chars"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Required"),
});

export const generateSchema = z.object({
  prompt: z.string().min(5, "Prompt should be at least 5 chars"),
  tone: z.string().min(1, "Select tone"),
  targetAudience: z.string().min(1, "Target audience required"),
  keywords: z
    .string()
    .transform((val) => {
      return val
        .split(/[, ]+/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    })
    .pipe(z.array(z.string()))
    .optional()
    .default([]),
});
