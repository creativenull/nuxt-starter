import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

const database = drizzle(process.env.NUXT_DATABASE_URL!);

export default database;
