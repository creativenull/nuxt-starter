import dotenv from "dotenv";

dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {
  client: process.env.NUXT_DATABASE_DRIVER,
  useNullAsDefault: true,
  connection: { filename: process.env.NUXT_DATABASE_URL },
  migrations: { directory: "./src/server/database/knex/migrations" },
};

export default config;
