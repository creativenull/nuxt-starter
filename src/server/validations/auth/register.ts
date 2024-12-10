import * as v from "valibot";

export const RegisterSchema = v.pipe(
  v.object({
    firstName: v.pipe(v.string(), v.minLength(2), v.maxLength(100), v.trim()),
    lastName: v.pipe(v.string(), v.minLength(2), v.maxLength(100), v.trim()),
    email: v.pipe(v.string(), v.email(), v.trim()),
    password: v.pipe(v.string(), v.minLength(8)),
    confirmPassword: v.pipe(v.string(), v.minLength(8)),
  }),
  v.forward(
    // Ensure that password and confirmPassword matches
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "Passwords must match.",
    ),
    ["confirmPassword"],
  ),
);
