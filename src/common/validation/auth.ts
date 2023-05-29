import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().max(1024),
  password: z.string().min(8).max(1024),
});

export const signUpSchema = loginSchema.extend({
  confirmPassword: z.string().min(8).max(1024),
});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
