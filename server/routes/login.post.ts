import * as userSessionRepo from "../repositories/user-session.repository";
import * as userRepo from "../repositories/user.repository";
import { setRememeberMeCookie } from "../utils/rememberMeCookie";
import { useCsrf } from "../utils/useCsrf";
import { LoginFormSchema } from "../validators/login-form.schema";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  try {
    const validated = await useValidator(event, LoginFormSchema);

    if (validated.__csrf !== session.data.csrfToken) {
      throw createError({ statusCode: 403, statusMessage: "Forbidden" });
    }

    const userRecord = await userRepo.getValidatedUserByCredentials(
      validated.email,
      validated.password,
    );

    if (!userRecord) {
      return await sendRedirect(
        event,
        `/login?invalid=true&email=${validated.email}&remember=${validated.remember_user}`,
        302,
      );
    }

    // TODO: Remember me token
    if (validated.remember_user) {
      const { selector, validator } = await userSessionRepo.createUsingUserId(userRecord.id);
      setRememeberMeCookie(event, selector, validator);
    }

    // Create session and login user
    const csrfToken = useCsrf();
    const { password: _, createdAt: __, ...user } = userRecord;
    await session.update({ user, csrfToken });

    return await sendRedirect(event, "/", 302);
  } catch (_e) {
    console.error(_e);
    return await sendRedirect(event, `/login?invalid=true`, 302);
  }
});
