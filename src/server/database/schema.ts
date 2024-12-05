import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "./helper";

export const users = t.sqliteTable("users", {
  id: t.int().primaryKey({ autoIncrement: true }),
  pubid: t.text().unique().notNull(),
  firstName: t.text("first_name"),
  lastName: t.text("last_name"),
  email: t.text().unique().notNull(),
  password: t.text().notNull(),
  emailVerifiedOn: t.text(),
  ...timestamps,
});

