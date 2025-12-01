import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

const database = drizzle(process.env.DRIZZLE_DATABASE_URL!);

export default database;
