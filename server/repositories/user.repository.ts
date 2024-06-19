import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { users } from "../../database/schema";

const defaultSelects = {
  id: users.id,
  name: users.name,
  email: users.email,
  avatarUrl: users.avatarUrl,
  createdAt: users.createdAt,
};

const defaultReturns = { ...defaultSelects };

export async function create(attrs: Omit<typeof users.$inferInsert, "id" | "createdAt">) {
  const { sqlite, db } = useDatabase();
  const config = useRuntimeConfig();

  try {
    const salt = await bcrypt.genSalt(config.saltRounds);
    const hashedPassword = await bcrypt.hash(attrs.password, salt);

    return db
      .insert(users)
      .values({ ...attrs, password: hashedPassword })
      .returning(defaultReturns)
      .get();
  } finally {
    sqlite.close();
  }
}

export function get(id: number) {
  const { sqlite, db } = useDatabase();

  try {
    return db.select(defaultSelects).from(users).where(eq(users.id, id)).get();
  } finally {
    sqlite.close();
  }
}

export function getByEmail(email: string) {
  const { sqlite, db } = useDatabase();

  try {
    return db.select(defaultSelects).from(users).where(eq(users.email, email)).get();
  } finally {
    sqlite.close();
  }
}

export async function getValidatedUserByCredentials(email: string, plainTextPassword: string) {
  const { sqlite, db } = useDatabase();

  try {
    const user = db
      .select({ ...defaultSelects, password: users.password })
      .from(users)
      .where(eq(users.email, email))
      .get();

    if (!user || !(await bcrypt.compare(plainTextPassword, user.password))) {
      return null;
    }

    return user;
  } catch (e) {
    return null;
  } finally {
    sqlite.close();
  }
}

export function update(id: number, attrs: Omit<typeof users.$inferInsert, "id" | "createdAt">) {
  const { sqlite, db } = useDatabase();

  try {
    return db
      .update(users)
      .set({ ...attrs })
      .where(eq(users.id, id))
      .returning(defaultReturns)
      .get();
  } finally {
    sqlite.close();
  }
}

export function updateByEmail(
  email: string,
  attrs: Omit<typeof users.$inferInsert, "id" | "createdAt">,
) {
  const { sqlite, db } = useDatabase();

  try {
    return db
      .update(users)
      .set({ ...attrs })
      .where(eq(users.email, email))
      .returning(defaultReturns)
      .get();
  } finally {
    sqlite.close();
  }
}

export function softDelete(id: number) {
  const { sqlite, db } = useDatabase();

  try {
    return db
      .update(users)
      .set({ deletedAt: new Date() })
      .where(eq(users.id, id))
      .returning({ deletedId: users.id })
      .get();
  } finally {
    sqlite.close();
  }
}

export function softDeleteByEmail(email: string) {
  const { sqlite, db } = useDatabase();

  try {
    return db
      .update(users)
      .set({ deletedAt: new Date() })
      .where(eq(users.email, email))
      .returning({ deletedId: users.id })
      .get();
  } finally {
    sqlite.close();
  }
}

export function destroy(id: number) {
  const { sqlite, db } = useDatabase();

  try {
    return db.delete(users).where(eq(users.id, id)).returning({ deletedId: users.id }).get();
  } finally {
    sqlite.close();
  }
}

export function destroyByEmail(email: string) {
  const { sqlite, db } = useDatabase();

  try {
    return db.delete(users).where(eq(users.email, email)).returning({ deletedId: users.id }).get();
  } finally {
    sqlite.close();
  }
}
