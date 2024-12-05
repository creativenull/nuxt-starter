import * as v from "valibot";

export const LoginSchema = v.object({
  email: v.pipe(v.string(), v.nonEmpty(), v.email(), v.trim()),
  password: v.pipe(v.string(), v.nonEmpty(), v.trim()),
});
