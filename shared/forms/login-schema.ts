import * as v from "valibot";

export const LoginFormSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),
});

export type LoginFormData = v.InferOutput<typeof LoginFormSchema>;
