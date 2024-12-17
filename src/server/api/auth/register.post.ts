import { safeParser } from "valibot";
import { createUser } from "~/server/repositories/user";
import { RegisterSchema } from "~/server/validations/auth/register";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, safeParser(RegisterSchema));

  if (!body.success) {
    throw createError({
      statusCode: 422,
      data: { ...body.issues },
    });
  }

  const { first_name, last_name, email, password } = body.output;
  const newUser = await createUser(first_name, last_name, email, password);

  await setUserSession(event, {
    user: {
      pid: newUser.pid,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
    },
  });

  return { succes: true };
});
