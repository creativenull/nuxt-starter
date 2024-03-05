import {
  object,
  string,
  email,
  minLength,
  boolean,
  coerce,
  type Output,
} from "valibot";

export const LoginFormSchema = object({
  email: string([email()]),
  password: string([minLength(8)]),
  remember_user: coerce(boolean(), Boolean),
});

export type LoginFormData = Output<typeof LoginFormSchema>;
