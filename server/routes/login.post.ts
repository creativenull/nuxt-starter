import { H3Error } from "h3";
import * as userSessionRepo from "../repositories/user-session.repository";
import * as userRepo from "../repositories/user.repository";
import { setRememeberMeCookie } from "../utils/rememberMeCookie";
import { useCsrf } from "../utils/useCsrf";
import { LoginFormSchema } from "../validators/login-form.schema";
import { ValiError } from "valibot";

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event);
    const validated = await useValidator(event, LoginFormSchema);

    if (validated.__csrf !== session.data.csrfToken) {
      throw createError({
        statusCode: 400,
        data: { email: validated.email, remember_user: validated.remember_user },
      });
      // throw createError({ statusCode: 403, statusMessage: "Forbidden" });
    }

    const userRecord = await userRepo.getValidatedUserByCredentials(
      validated.email,
      validated.password,
    );

    if (!userRecord) {
      throw createError({
        statusCode: 400,
        data: { email: validated.email, remember_user: validated.remember_user },
      });

      // return await sendRedirect(
      //   event,
      //   `/login?invalid=true&email=${validated.email}&remember=${validated.remember_user}`,
      //   302,
      // );
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
  } catch (e) {
    console.error(e);

    if (e instanceof H3Error) {
      const urlParams = new URLSearchParams();
      urlParams.set("invalid", "true");
      urlParams.set("email", e.data.email);
      urlParams.set("remember_user", e.data.remember_user);

      return await sendRedirect(event, `/login?${urlParams.toString()}`, 302);
    }

    return await sendRedirect(event, "/login?invalid=true", 302);
  }
});
