import { safeParser as validate } from "valibot";
import { RegisterSchema } from "~/server/validations/auth/register";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, validate(RegisterSchema));

  if (!body.success) {
    throw createError({
      statusCode: 422,
      data: { ...body.issues },
    });
  }

  return { succes: true };
});
