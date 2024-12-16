import { ulid } from "ulid";
import { makePassword } from "~/server/services/password";

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
) {
  const db = knex();
  const password = await makePassword(plainTextPassword);
  const pid = ulid();
  const result = await db<User>("users")
    .returning(allowed)
    .insert({ pid, first_name, last_name, email, password });

  return result;
}

export async function findUser(id: number) {
  const db = knex();
  return await db<User>("users").select(allowed).where({ id }).first();
}

export async function deleteUser(id: number): Promise<void> {
  const db = knex();
  await db<User>("users").where({ id }).delete();
}
