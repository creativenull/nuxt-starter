import type { H3Event, EventHandlerRequest } from "h3";

type UserSessionData = {
  user: {
    id: number;
    name: string;
    email: string;
    avatarUrl: string | null;
  };
};

export async function getUserSession(event: H3Event<EventHandlerRequest>) {
  const config = useRuntimeConfig();

  return await useSession<UserSessionData>(event, {
    password: config.sessionKey,
    name: "__user",
    maxAge: 3600,
    cookie: { sameSite: "strict" },
  });
}
