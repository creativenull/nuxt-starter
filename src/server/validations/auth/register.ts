import * as v from "valibot";

export const RegisterSchema = v.pipe(
  v.object({
    name: v.pipe(v.string(), v.nonEmpty(), v.minLength(255), v.trim()),
    email: v.pipe(v.string(), v.nonEmpty(), v.email(), v.trim()),
    password: v.pipe(v.string(), v.nonEmpty(), v.minLength(8), v.trim()),
    confirm_password: v.pipe(v.string(), v.nonEmpty(), v.minLength(8), v.trim()),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirm_password"]],
      (input) => input.password === input.confirm_password,
      "The passwords do not match.",
    ),
    ["password"],
  ),
);
