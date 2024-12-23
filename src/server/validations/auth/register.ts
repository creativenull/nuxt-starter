import * as v from "valibot";
import capitalize from "lodash.capitalize";
import { findUserByEmail } from "~/server/repositories/user";

export const RegisterSchema = v.pipeAsync(
  v.objectAsync({
    first_name: v.pipe(
      v.string(),
      v.minLength(2, "Must be at least 2 characters"),
      v.maxLength(100, "Must not be more than 100 characters"),
      v.trim(),
      v.toLowerCase(),
      v.transform((input) => input.split(" ").map(capitalize).join(" ")),
    ),
    last_name: v.pipe(
      v.string(),
      v.minLength(2, "Must be at least 2 characters"),
      v.maxLength(100, "Must not be more than 100 characters"),
      v.trim(),
      v.toLowerCase(),
      v.transform((input) => input.split(" ").map(capitalize).join(" ")),
    ),
    email: v.pipeAsync(
      v.string(),
      v.email(),
      v.trim(),
      v.toLowerCase(),
      v.checkAsync(async (email) => !(await findUserByEmail(email)), "Email already exists."),
    ),
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
