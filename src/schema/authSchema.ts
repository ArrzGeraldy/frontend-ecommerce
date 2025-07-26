import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters" })
    .max(100, { message: "Username must not exceed 100 characters" }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .max(100, { message: "Email must not exceed 100 characters" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password must not exceed 100 characters" }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .max(100, { message: "Email must not exceed 100 characters" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password must not exceed 100 characters" }),
});
