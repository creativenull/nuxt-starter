import { ulid } from "ulid";

type User = {
  id: number;
  pid: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
};

const allowed = ["id", "pid", "first_name", "last_name", "email", "created_at", "updated_at"];

export const routeId = "pid";

export async function createUser(
  first_name: string,
  last_name: string,
  email: string,
  plainTextPassword: string,
): Promise<User> {
  const db = knex();
  const password = await hashPassword(plainTextPassword);
  const pid = ulid();
  const created_at = new Date();

  const result = await db<User>("users")
    .returning(allowed)
    .insert<User>({ pid, first_name, last_name, email, password, created_at });

  return result;
}

export async function updateUser(id: number, attributes: Partial<User>): Promise<User> {
  const db = knex();
  const updated_at = new Date();

  return await db<User>("users")
    .returning(allowed)
    .where({ id })
    .update<User>({ ...attributes, updated_at });
}

export async function findUser(id: number): Promise<User> {
  const db = knex();

  return await db<User>("users").select(allowed).where({ id }).first<User>();
}

export async function findUserByEmail(email: string): Promise<User> {
  const db = knex();

  return await db<User>("users").select(allowed).where({ email }).first<User>();
}

export async function isUserValidForAuth(
  email: string,
  plainTextPassword: string,
): Promise<boolean> {
  const db = knex();
  const foundUser = await db<User>("users")
    .select(["email", "password"])
    .where({ email })
    .first<{ email: string; password: string }>();

  if (!foundUser) return false;

  const isPasswordValid = await verifyPassword(foundUser.password, plainTextPassword);

  return isPasswordValid;
}

export async function deleteUser(id: number): Promise<void> {
  const db = knex();
  await db<User>("users").where({ id }).delete();
}
