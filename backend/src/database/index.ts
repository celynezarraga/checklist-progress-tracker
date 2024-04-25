import { Pool } from "pg";
import config from "../config";

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASS
} = config;

const pool = new Pool({
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASS,
  port: Number(DB_PORT as string)
});

pool.on("error", (error: Error) => {
  // eslint-disable-next-line no-console
  console.error(error.message);
});

export default pool;