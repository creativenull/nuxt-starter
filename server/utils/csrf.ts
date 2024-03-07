import { randomBytes } from "crypto";

export default function useCsrf(): string {
  return randomBytes(32).toString("hex");
}
