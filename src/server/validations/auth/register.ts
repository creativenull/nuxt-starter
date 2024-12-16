import * as v from "valibot";

export const RegisterSchema = v.pipe(
  v.object({
    first_name: v.pipe(
      v.string(),
      v.minLength(2, "Must be at least 2 characters"),
      v.maxLength(100, "Must not be more than 100 characters"),
      v.trim(),
    ),
    last_name: v.pipe(
      v.string(),
      v.minLength(2, "Must be at least 2 characters"),
      v.maxLength(100, "Must not be more than 100 characters"),
      v.trim(),
    ),
    email: v.pipe(v.string(), v.email("Invalid email"), v.trim()),
    password: v.pipe(v.string(), v.minLength(8, "Must be at least 8 characters"), v.trim()),
    password_confirm: v.pipe(v.string(), v.minLength(8, "Must be at least 8 characters"), v.trim()),
  }),
  v.forward(
    // Ensure that password and confirmPassword matches
    v.partialCheck(
      [["password"], ["password_confirm"]],
      (input) => input.password === input.password_confirm,
      "Passwords must match.",
    ),
    ["password_confirm"],
  ),
);
