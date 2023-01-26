import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(3, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Email is required" }),
});

export type UserValidation = z.infer<typeof userSchema>;

export const userPasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: "Current Password is required" }),
    newPassword: z.string().min(6, { message: "A new Password is required" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UserPasswordValidation = z.infer<typeof userPasswordSchema>;
