import { deleteUserSession } from "../repositories/user-session";
import { deleteRememeberMeCookie } from "../utils/remember-me-session";

export default defineEventHandler(async (event) => {
  const { sqlite, db } = useDatabase();
  const session = await getUserSession(event);
  const formData = await readFormData(event);
  const rememberMeCookie = getCookie(event, "__remember_me");

  try {
    const __csrf = formData.get("__csrf") ?? "";

    if (!__csrf || __csrf !== session.data.csrfToken) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid token provided",
      });
    }

    if (rememberMeCookie) {
      deleteRememeberMeCookie(event);
      await deleteUserSession(db, session.data.user.id);
    }

    await session.clear();

    return await sendRedirect(event, "/");
  } finally {
    sqlite.close();
  }
});
