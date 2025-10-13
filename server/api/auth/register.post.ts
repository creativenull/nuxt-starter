import * as v from "valibot";
import { createUser } from "~~/server/repositories/user";
import { RegisterSchema } from "~~/server/validations/auth/register";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, v.safeParserAsync(RegisterSchema));

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
    loggedInAt: new Date(),
  });

  return { succes: true };
});
