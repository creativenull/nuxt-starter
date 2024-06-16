import {
  object,
  string,
  email,
  minLength,
  pipe,
  unknown,
  transform,
  type InferOutput,
} from "valibot";

export const LoginFormSchema = object({
  __csrf: string(),
  email: pipe(string(), email()),
  password: pipe(string(), minLength(8)),
  remember_user: pipe(unknown(), transform(Boolean)),
});

export type LoginFormData = InferOutput<typeof LoginFormSchema>;
