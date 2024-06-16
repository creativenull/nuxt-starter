import { getUserSession } from "~/server/utils/userSession";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  if (!session.data.user) {
    throw createError({ statusCode: 403, statusMessage: "Forbidden" });
  }

  return session.data.user;
});
