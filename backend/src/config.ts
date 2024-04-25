import dotenv from "dotenv";

dotenv.config();

const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASS,
  BCRYPT_PASS_KEY,
  BCRYPT_ROUNDS,
  TOKEN
} = process.env;

export default {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME: DB_NAME ?? "test",
  DB_USER,
  DB_PASS,
  HASH_KEY: BCRYPT_PASS_KEY,
  HASH_ROUNDS: BCRYPT_ROUNDS,
  TOKEN
};