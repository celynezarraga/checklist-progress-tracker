import bcrypt from "bcrypt";
import config from "../config";

export const encryptPass = (password: string): string => {
  const rounds = parseInt(config.HASH_ROUNDS as string, 10);
  return bcrypt.hashSync(`${password}${config.HASH_KEY}`, rounds);
};

export const validatePass = (password: string, encryptedPass:string): boolean => {
  return bcrypt.compareSync(`${password}${config.HASH_KEY}`, encryptedPass);
};