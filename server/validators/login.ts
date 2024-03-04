import {
  object,
  string,
  email,
  minLength,
  boolean,
  type Output,
} from "valibot";

export const LoginFormSchema = object({
  email: string([email()]),
  password: string([minLength(8)]),
  remember: boolean(),
});

export type LoginFormData = Output<typeof LoginFormSchema>;
