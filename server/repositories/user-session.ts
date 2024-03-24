import { ulid } from "ulidx";
import { randomBytes, createHash } from "crypto";
import { type AppDatabase } from "../utils/database";
import { user_sessions as userSessionsTable } from "../database/schema";
import { sql } from "drizzle-orm";

export async function createUserSession(
  db: AppDatabase,
  userId: number,
): Promise<{ selector: string; validator: string }> {
  const selector = ulid();
  const validator = randomBytes(64).toString("hex");
  const hashedValidator = createHash("sha256").update(validator).digest("hex");

  await db
    .insert(userSessionsTable)
    .values({
      selector,
      validator: hashedValidator,
      userId,
    })
    .onConflictDoUpdate({
      target: userSessionsTable.userId,
      set: {
        selector,
        validator: hashedValidator,
      },
    });

  return { selector, validator };
}

export async function deleteUserSession(
  db: AppDatabase,
  userId: number,
): Promise<void> {
  await db
    .delete(userSessionsTable)
    .where(sql`${userSessionsTable.userId} = ${userId}`);
}
