import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/better-sqlite3";
import dotenv from "dotenv";

dotenv.config();

const filepath: string = process.env.NUXT_SQLITE_FILEPATH ?? "";
if (filepath === "") {
  throw new Error("Invalid filepath for sqlite database");
}

const sqlite = new Database(filepath);
const db = drizzle(sqlite, { schema });

migrate(db, { migrationsFolder: "./server/database/migrations" });
sqlite.close();
