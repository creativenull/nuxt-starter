import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { users as usersTable } from "../../database/schema";
import { LoginFormSchema } from "../../validators/login";
import { getUserSession } from "~/server/utils/user-session";

export default defineEventHandler(async (event) => {
  const { sqlite, db } = useDatabase();

  try {
    const validated = await useRequestValidator(event, LoginFormSchema);

    const userRecord = db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, validated.email))
      .get();

    if (
      !userRecord ||
      !(await bcrypt.compare(validated.password, userRecord.password))
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid email/password",
      });
    }

    const { password: _, createdAt: __, ...user } = userRecord;

    const session = await getUserSession(event);
    await session.update({ user });

    return user;
  } finally {
    sqlite.close();
  }
});
