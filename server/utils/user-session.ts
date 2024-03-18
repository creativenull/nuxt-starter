import type { H3Event, EventHandlerRequest } from "h3";

type UserSessionData = {
  user: {
    id: number;
    name: string;
    email: string;
    avatarUrl: string | null;
  };
  csrfToken: string;
};

export async function getUserSession(event: H3Event<EventHandlerRequest>) {
  const config = useRuntimeConfig();

  return await useSession<UserSessionData>(event, {
    password: config.sessionKey,
    name: "__session",
    maxAge: 604800, // 1 week
    cookie: { sameSite: "strict" },
  });
}
