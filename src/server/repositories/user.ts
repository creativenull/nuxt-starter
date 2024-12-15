import { knex } from "~/server/database/knex";
import { makePassword } from "~/server/services/password";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
};

const allowed = ["id", "first_name", "last_name", "email", "created_at", "updated_at"];

export async function createUser(
  first_name: string,
  last_name: string,
  email: string,
  plainTextPassword: string,
) {
  const password = await makePassword(plainTextPassword);
  const result = knex<User>("users")
    .returning(allowed)
    .insert({ first_name, last_name, email, password });

  return result;
}

export async function findUser(id: number) {
  return knex<User>("users").select(allowed).where({ id }).first();
}

export async function deleteUser(id: number): Promise<void> {
  knex<User>("users").where({ id }).delete();
}
