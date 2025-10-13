import * as v from "valibot";

export const LoginSchema = v.object({
  email: v.pipe(v.string(), v.email("Invalid email"), v.trim()),
  password: v.pipe(v.string(), v.minLength(8, "Must be at least 8 characters"), v.trim()),
});
