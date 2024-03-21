import type { H3Event, EventHandlerRequest } from "h3";

export function setRememeberMeCookie(
  event: H3Event<EventHandlerRequest>,
  selector: string,
  validator: string,
): void {
  setCookie(event, "__remember_me", `${selector}:${validator}`, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
}

export function deleteRememeberMeCookie(
  event: H3Event<EventHandlerRequest>,
): void {
  deleteCookie(event, "__remember_me");
}
