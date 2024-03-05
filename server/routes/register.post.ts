import { eq } from "drizzle-orm";
import { users as usersTable } from "../database/schema";
import bcrypt from "bcrypt";
import { RegisterFormSchema } from "../validators/register";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { sqlite, db } = useDatabase();

  try {
    const validated = await useValidator(event, RegisterFormSchema);

    if (validated.password !== validated.confirm_password) {
      return await sendRedirect(
        event,
        `/register?password_mismatch=true&name=${validated.name}&email=${validated.email}`,
        302,
      );
    }

    const userRecord = db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, validated.email))
      .get();

    if (userRecord) {
      return await sendRedirect(
        event,
        `/register?exists=true&name=${validated.name}`,
        302,
      );
    }

    const { confirm_password: _, ...userAttrs } = validated;
    const salt = await bcrypt.genSalt(config.saltRounds);
    const hashedPassword = await bcrypt.hash(userAttrs.password, salt);
    const newUser = db
      .insert(usersTable)
      .values({ ...userAttrs, password: hashedPassword })
      .returning({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        avatarUrl: usersTable.avatarUrl,
      })
      .get();

    const session = await getUserSession(event);
    await session.update({ user: newUser });

    return await sendRedirect(event, "/", 302);
  } finally {
    sqlite.close();
  }
});
