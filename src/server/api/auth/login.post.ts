import * as v from "valibot";
import { LoginSchema } from "../validations/auth/login";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => v.safeParse(LoginSchema, body));

  if (!body.success) {
    throw createError({
      statusCode: 422,
      statusMessage: "Validation error",
      data: v.flatten<typeof LoginSchema>(body.issues),
    });
  }

  return body;
});
