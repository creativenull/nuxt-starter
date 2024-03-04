import { object, string, email, minLength, type Output } from "valibot";

export const RegisterFormSchema = object({
  name: string([minLength(1)]),
  email: string([email()]),
  password: string([minLength(8)]),
  confirm_password: string([minLength(8)]),
});

export type RegisterFormData = Output<typeof RegisterFormSchema>;
