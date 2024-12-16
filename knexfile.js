import dotenv from "dotenv";

dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {
  client: process.env.NUXT_DATABASE_DRIVER,
  connection: {
    filename: process.env.NUXT_DATABASE_URL,
    useNullAsDefault: true,
  },
  migrations: {
    directory: "./src/server/database/knex/migrations",
  },
};

export default config;
