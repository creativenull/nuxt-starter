import * as v from "valibot";
import { RegisterFormSchema } from "~~/shared/forms/register-schema";
import { setUser } from "../services/user_service";

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) => v.safeParse(RegisterFormSchema, body));

  if (!result.success) {
    throw createError({
      statusCode: 422,
      data: result.issues,
    });
  }

  try {
    const dbResult = await setUser(result.output.name, result.output.email, result.output.password);

    return {
      user: dbResult!.id,
    };
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: (error as Error).message,
    });
  }
});
