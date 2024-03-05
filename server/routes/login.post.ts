import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { users as usersTable } from "../database/schema";
import { LoginFormSchema } from "../validators/login";
import { useUserStore } from "~/stores/user";
import { useState } from "nuxt/app";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { sqlite, db } = useDatabase();

  try {
    const validated = await useValidator(event, LoginFormSchema);
    const user = db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, validated.email))
      .get();

    if (!user || !(await bcrypt.compare(validated.password, user.password))) {
      await sendRedirect(
        event,
        `/login?invalid=true&email=${validated.email}`,
        302,
      );
      return;
    }

    const session = await getUserSession(event);

    const u = { id: user.id, name: user.name, email: user.email };
    await session.update({
      user: u,
    });

    await sendRedirect(event, "/", 302);
  } finally {
    sqlite.close();
  }
});
