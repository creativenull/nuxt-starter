import * as v from "valibot";

export const RegisterFormSchema = v.pipe(
  v.object({
    name: v.pipe(v.string(), v.nonEmpty()),
    email: v.pipe(v.string(), v.nonEmpty(), v.email()),
    password: v.pipe(v.string(), v.nonEmpty(), v.minLength(8)),
    confirmPassword: v.pipe(v.string(), v.nonEmpty(), v.minLength(8)),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "Password and confirm password do not match.",
    ),
    ["confirmPassword"],
  ),
);

export type RegisterFormData = v.InferOutput<typeof RegisterFormSchema>;
