type UserSessionData = {
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const session = await useSession<UserSessionData>(event, {
    name: "user_token",
    password: config.sessionKey,
  });

  await session.clear();
  await sendRedirect(event, "/", 301);
});
