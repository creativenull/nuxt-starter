import * as v from "valibot";
import { RegisterSchema } from "~/server/validations/auth/register";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => v.safeParse(RegisterSchema, body));

  if (!body.success) {
    throw createError({
      statusCode: 422,
      statusMessage: "Validation error",
      data: v.flatten<typeof RegisterSchema>(body.issues),
    });
  }

  return body;
});
