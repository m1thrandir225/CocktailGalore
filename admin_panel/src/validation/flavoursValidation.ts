import { z } from "zod";

export const newFlavourSchema = z.object({
  name: z.string().min(1, { message: "Flavour name is required" }),
});

export type NewFlavourSchema = z.infer<typeof newFlavourSchema>;
