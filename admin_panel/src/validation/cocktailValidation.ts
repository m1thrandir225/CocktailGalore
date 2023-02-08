import { z } from "zod";

export const cocktailSchema = z.object({
  name: z.string().min(1, { message: "Name is requried" }).max(100),
  timeToMake: z
    .string()
    .min(1, { message: "Time to make is required" })
    .max(100),
  ingredients: z
    .array(
      z.object({
        id: z.number(),
        name: z.string().min(1, { message: "Name is required" }).max(100),
      }),
    )
    .min(1, { message: "At least one ingredient is required" }),
  instructions: z.array(
    z.object({
      id: z.number(),
      text: z.string().min(1, { message: "Text is required" }).max(100),
    }),
  ),
  image: z.instanceof(FileList, { message: "Image must be valid" }),
});

export type CocktailValidation = z.infer<typeof cocktailSchema>;
