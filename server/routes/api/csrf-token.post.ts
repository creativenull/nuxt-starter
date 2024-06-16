import { useCsrf } from "~/server/utils/useCsrf";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  if (!session.data.csrfToken) {
    const csrfToken = useCsrf();
    await session.update({ csrfToken });

    return session.data.csrfToken;
  }

  return session.data.csrfToken;
});
