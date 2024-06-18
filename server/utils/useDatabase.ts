import { type BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "~/database/schema";
import Database from "better-sqlite3";

export type AppDatabase = BetterSQLite3Database<typeof schema>;

export function useDatabase(): { sqlite: Database.Database; db: AppDatabase } {
  const config = useRuntimeConfig();
  const sqlite = new Database(config.sqliteFilepath);

  return {
    sqlite,
    db: drizzle(sqlite, { schema }),
  };
}
