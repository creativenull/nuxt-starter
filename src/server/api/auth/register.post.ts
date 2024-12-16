import * as v from "valibot";
import { createUser } from "~/server/repositories/user";
import { RegisterSchema } from "~/server/validations/auth/register";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, v.safeParser(RegisterSchema));

  if (!body.success) {
    throw createError({
      statusCode: 422,
      data: { ...body.issues },
    });
  }

  const { first_name, last_name, email, password } = body.output;
  await createUser(first_name, last_name, email, password);

  return { succes: true };
});
