import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(3, { message: "Category name is required" }),
});

export type CategoryValidation = z.infer<typeof categorySchema>;
