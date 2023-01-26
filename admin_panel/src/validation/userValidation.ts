import { z } from "zod";

export const userValidation = z.object({
  firstName: z.string().min(3, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Email is required" }),
});

export type UserValidation = z.infer<typeof userValidation>;
