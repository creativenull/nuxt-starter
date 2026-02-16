import bcrypt from "bcrypt";
import "dotenv/config";
import { eq } from "drizzle-orm";
import { useDatabase } from "~~/database";
import { usersTable } from "~~/database/schema";

export async function getUser(id: number) {
  const db = useDatabase();

  const result = await db
    .select({ id: usersTable.id, name: usersTable.name, email: usersTable.email })
    .from(usersTable)
    .where(eq(usersTable.id, id));

  return result && result[0] ? result[0] : null;
}

export async function getUserByEmail(email: string) {
  const db = useDatabase();

  const result = await db
    .select({ id: usersTable.id, name: usersTable.name, email: usersTable.email })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return result && result[0] ? result[0] : null;
}

export async function setUser(name: string, email: string, plainTextPassword: string) {
  const db = useDatabase();
  const saltRounds = parseInt(process.env.NUXT_BCRYPT_SALT_ROUNDS ?? "12", 10);
  const salt = await bcrypt.genSalt(saltRounds);
  const password = await bcrypt.hash(plainTextPassword, salt);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await db
    .insert(usersTable)
    .values({ name, email, password })
    .returning({ id: usersTable.id, name: usersTable.name, email: usersTable.email });

  return user && user[0] ? user[0] : null;
}

export async function deleteUser(id: number) {
  const db = useDatabase();

  const result = await db
    .delete(usersTable)
    .where(eq(usersTable.id, id))
    .returning({ id: usersTable.id });

  return result && result[0] ? result[0] : null;
}
