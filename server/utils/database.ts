import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../database/schema";
import Database from "better-sqlite3";

export function useDatabase() {
  const config = useRuntimeConfig();
  const sqlite = new Database(config.sqliteFilepath);

  return {
    sqlite,
    db: drizzle(sqlite, { schema }),
  };
}
