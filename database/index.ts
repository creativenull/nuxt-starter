import { drizzle } from "drizzle-orm/libsql";

let db: ReturnType<typeof drizzle> | null = null;

export function useDatabase(): ReturnType<typeof drizzle> {
  if (db) {
    return db;
  }

  const newDb = drizzle(process.env.NUXT_DATABASE_URL!);
  db = newDb;

  return db;
}
