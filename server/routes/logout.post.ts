type UserSessionData = {
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const session = await getUserSession(event);

  await session.clear();
  await sendRedirect(event, "/", 301);
});
