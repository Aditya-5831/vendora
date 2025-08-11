import z from "zod";

export const signUpFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const signInFormSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
export type SignInFormValues = z.infer<typeof signInFormSchema>;
