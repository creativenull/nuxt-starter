import { randomBytes } from "crypto";

export function useCsrf(): string {
  return randomBytes(32).toString("hex");
}
