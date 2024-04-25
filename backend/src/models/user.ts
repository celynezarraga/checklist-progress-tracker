import database from "../database";
import { User } from "../types/user";
import { encryptPass, validatePass } from "../utils/formatter";
import jwt from "jsonwebtoken";

class UserModel {

  async create (user:User): Promise<User> {
    try {
      const connection = await database.connect();
      const sqlQuery = `INSERT INTO users
        (email, first_name, last_name, password)
        values ($1, $2, $3, $4)
        returning id, email, first_name, last_name
      `;
      const result = await connection.query(
        sqlQuery,
        [
          user.email,
          user.first_name,
          user.last_name,
          encryptPass(user.password)
        ]
      );
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error creating new user (${user.email}): ${(err as Error).message}`);
    }
  }

  async getAll (): Promise<User[]> {
    try {
      const connection = await database.connect();
      const sqlQuery = "SELECT id, email, first_name, last_name from users";
      const result = await connection.query(sqlQuery);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error retrieving all users: ${(err as Error).message}`);
    }
  }

  async getOne (id: string): Promise<User> {
    try {
      const connection = await database.connect();
      const sqlQuery = "SELECT id, email, first_name, last_name FROM users WHERE id=($1)";
      const result = await connection.query(sqlQuery, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error retrieving user (${id}): ${(err as Error).message}`);
    }
  }

  async updateOne (user: User): Promise<User> {
    try {
      const connection = await database.connect();
      const sqlQuery = `UPDATE users
        SET email=$1, first_name=$2, last_name=$3, password=$4
        WHERE id=$5
        RETURNING id, email, first_name, last_name
      `;
      const result = await connection.query(
        sqlQuery,
        [
          user.email,
          user.first_name,
          user.last_name,
          encryptPass(user.password),
          user.id
        ]
      );
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error updating user (${user.email}): ${(err as Error).message}`);
    }
  }

  async deleteOne (id: string): Promise<User> {
    try {
      const connection = await database.connect();
      const sqlQuery = "DELETE FROM users WHERE id=($1)";
      const result = await connection.query(sqlQuery, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error deleting used (${id}): ${(err as Error).message}`);
    }
  }

  async authenticate (email: string, password: string): Promise<User | null> {
    try {
      const connection = await database.connect();
      const sqlQuery = "SELECT password FROM users WHERE email=($1)";
      const result = await connection.query(sqlQuery, [email]);
      connection.release();
      if (result.rows.length) {
        const { password: pass } = result.rows[0];
        const isValidPass:boolean = validatePass(password, pass);

        if (isValidPass) {
          const sqlQuery = "SELECT id, email, first_name, last_name FROM users WHERE email=($1)";
          const user = await connection.query(sqlQuery, [email]);
          return user.rows[0];
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Error authenticating used (${email}): ${(err as Error).message}`);
    }
  }

  async verify (token: string, jwtToken: string): Promise<User | null> {
    try {
      const isValidToken = jwt.verify(token, jwtToken);

      if (isValidToken) {
        const decode = jwt.decode(token, {json: true});
        return decode ? decode.user : null;
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(`Error verifying token: ${(err as Error).message}`);
    }
  }
  
}

export default UserModel;