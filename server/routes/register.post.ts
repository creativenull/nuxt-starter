import { eq } from "drizzle-orm";
import { users as usersTable } from "../database/schema";
import bcrypt from "bcrypt";
import { RegisterFormSchema } from "../validators/register";
import { ValiError } from "valibot";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { sqlite, db } = useDatabase();
  const formDataPromise = readFormData(event);

  try {
    const validated = await useValidator(event, RegisterFormSchema);

    if (validated.password !== validated.confirm_password) {
      return await sendRedirect(
        event,
        `/register?password_mismatch=true&name=${validated.name}&email=${validated.email}`,
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
        `/register?exists=true&name=${validated.name}&email=${validated.email}`,
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

    return await sendRedirect(event, "/");
  } catch (e) {
    if (e instanceof ValiError) {
      const formData = Object.fromEntries(await formDataPromise);

      return await sendRedirect(
        event,
        `/register?name=${formData.name}&email=${formData.email}&validation_failed=true&reason=${e.message}`,
      );
    }
  } finally {
    sqlite.close();
  }
});
