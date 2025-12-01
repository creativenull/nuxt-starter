import { int, text, sqliteTable } from "drizzle-orm/sqlite-core";

const timestamps = {
  createdAt: int().notNull().default(new Date().getTime()),
  updatedAt: int(),
};

export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  ...timestamps,
});

export const sessionsTable = sqliteTable("sessions", {
  id: text().primaryKey(),
  userId: int().notNull(),
  ...timestamps,
});
