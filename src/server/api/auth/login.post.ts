import { safeParser } from "valibot";
import { findUserByEmail, isUserValidForAuth } from "~/server/repositories/user";
import { LoginSchema } from "~/server/validations/auth/login";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, safeParser(LoginSchema));

  if (!body.success) {
    throw createError({
      statusCode: 422,
      data: { ...body.issues },
    });
  }

  const { email, password } = body.output;
  console.log({ email, password })
  const isValid = await isUserValidForAuth(email, password);
  if (!isValid) {
    throw createError({
      statusCode: 422,
      message: "Invalid email or password",
    });
  }

  const user = await findUserByEmail(email);
  await setUserSession(event, {
    user: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    },
  });

  return { succes: true };
});
