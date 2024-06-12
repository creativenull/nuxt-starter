import { object, string, email, minLength, pipe, type InferOutput } from "valibot";

export const RegisterFormSchema = object({
  __csrf: string(),
  name: pipe(string(), minLength(1)),
  email: pipe(string(), email()),
  password: pipe(string(), minLength(8, "Password must be at least 8 characters")),
  confirm_password: pipe(string(), minLength(8, "Password must be at least 8 characters")),
});

export type RegisterFormData = InferOutput<typeof RegisterFormSchema>;
