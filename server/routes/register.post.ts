import { eq } from "drizzle-orm";
import { users as usersTable } from "../database/schema";
import bcrypt from "bcrypt";
import { RegisterFormSchema } from "../validators/register";
import { ValiError } from "valibot";

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

    const checkUser = db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, validated.email))
      .get();

    if (checkUser) {
      await sendRedirect(
        event,
        `/register?exists=true&name=${validated.name}`,
        302,
      );
      return;
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
      });

    const session = await getUserSession(event);
    await session.update({ user: newUser.values()[0] });

    console.log(session.data.user);

    await sendRedirect(event, "/", 302);
  } finally {
    sqlite.close();
  }
});
