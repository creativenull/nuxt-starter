import { object, string, email, minLength, type Output } from "valibot";

export const RegisterFormSchema = object({
  __csrf: string(),
  name: string([minLength(1)]),
  email: string([email()]),
  password: string([minLength(8, "Password must be at least 8 characters")]),
  confirm_password: string([
    minLength(8, "Password must be at least 8 charaters"),
  ]),
});

export type RegisterFormData = Output<typeof RegisterFormSchema>;
