import { createHash, randomBytes } from "crypto";
import { sql } from "drizzle-orm";
import { ulid } from "ulidx";
import { user_sessions } from "../../database/schema";

export function destroyUsingUserId(userId: number) {
  const { sqlite, db } = useDatabase();

  try {
    db.delete(user_sessions).where(sql`${user_sessions.userId} = ${userId}`);
  } finally {
    sqlite.close();
  }
}

export async function createUsingUserId(userId: number) {
  const { sqlite, db } = useDatabase();

  try {
    const selector = ulid();
    const validator = randomBytes(64).toString("hex");
    const hashedValidator = createHash("sha256").update(validator).digest("hex");

    await db
      .insert(user_sessions)
      .values({
        selector,
        validator: hashedValidator,
        userId,
      })
      .onConflictDoUpdate({
        target: user_sessions.userId,
        set: {
          selector,
          validator: hashedValidator,
        },
      });

    return { selector, validator };
  } finally {
    sqlite.close();
  }
}
