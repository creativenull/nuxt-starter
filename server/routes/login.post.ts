import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { users as usersTable } from "../database/schema";
import { LoginFormSchema } from "../validators/login-form.schema";
import { useCsrf } from "../utils/useCsrf";
import { createUserSession } from "../repositories/user-session.repository";
import { setRememeberMeCookie } from "../utils/rememberMeCookie";

export default defineEventHandler(async (event) => {
  const { sqlite, db } = useDatabase();
  const session = await getUserSession(event);

  try {
    const validated = await useValidator(event, LoginFormSchema);

    if (validated.__csrf !== session.data.csrfToken) {
      throw createError({ statusCode: 403, statusMessage: "Forbidden" });
    }

    const userRecord = db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, validated.email))
      .get();

    if (!userRecord || !(await bcrypt.compare(validated.password, userRecord.password))) {
      return await sendRedirect(
        event,
        `/login?invalid=true&email=${validated.email}&remember=${validated.remember_user}`,
        302,
      );
    }

    // TODO: Remember me token
    if (validated.remember_user) {
      const { selector, validator } = await createUserSession(db, userRecord.id);
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
  } finally {
    sqlite.close();
  }
});
