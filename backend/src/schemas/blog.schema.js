import { z } from "zod";

export const generateBlogSchema = z.object({
  prompt: z
    .string("Prompt is required")
    .min(10, "prompt must be at least 10 characters")
    .max(1000, "prompt can have at most 1000 characters"),
  tone: z
    .string()
    .max(100, "tone can have at most 100 characters")
    .optional()
    .default("Neutral"),
  targetAudience: z
    .string()
    .max(100, "targetAudience can have at most 100 characters")
    .optional()
    .default("General Audience"),
  keywords: z.string().array().optional().default([]),
  // title: z.string().min(3, "title is too short").optional(),
});

export const listBlogsSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
});

export const idSchema = z.object({
  id: z.string().length(24, "Invalid ID format"),
});
