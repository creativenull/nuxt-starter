import { getUserSession } from "../utils/user-session";

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  const session = await getUserSession(event);

  if (url.pathname === "/login" || url.pathname === "/register") {
    if (session.data.user) {
      await sendRedirect(event, "/", 301);
    }
  }
});
