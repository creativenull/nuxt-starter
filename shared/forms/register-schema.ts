import * as v from "valibot";

export const RegisterFormSchema = v.pipe(
  v.object({
    name: v.pipe(v.string(), v.nonEmpty("Name is required")),
    email: v.pipe(v.string(), v.nonEmpty("Email is required"), v.email()),
    password: v.pipe(v.string(), v.nonEmpty("Password is required"), v.minLength(8)),
  }),
);

export type RegisterFormData = v.InferOutput<typeof RegisterFormSchema>;
