import { resolve } from "path";

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {
  client: "better-sqlite3",
  useNullAsDefault: true,
  connection: {
    // filename: "../storage/db.sqlite",
    filename: resolve(__dirname, "..", "storage", "db.sqlite"),
  },
  migrations: {
    // directory: "server/database/knex/migrations",
    directory: resolve(__dirname, "server", "database", "knex", "migrations"),
  },
};

export default config;
