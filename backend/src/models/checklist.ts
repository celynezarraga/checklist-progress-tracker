import database from "../database";
import { Checklist, ChecklistSubitemCounter } from "../types/checklist";

class ChecklistModel {

  async create (checklist:Checklist): Promise<Checklist> {
    try {
      const { title, description, created_by, created_at } = checklist;
      const connection = await database.connect();
      const sqlQuery = `INSERT INTO checklist
        (title, description, created_by, created_at) values ($1, $2, $3, $4)
        returning id, title, description, created_at, created_by
      `;
      const result = await connection.query(
        sqlQuery,
        [
          title,
          description,
          created_by,
          created_at
        ]
      );
      connection.release();
      return result.rows[0];
    } catch (err) {
      const errMessage = (err as Error).message;
      throw new Error(`Error creating new checklist: ${errMessage}`);
    }
  }

  async getOne (userId: string, id: string): Promise<Checklist> {
    try {
      const connection = await database.connect();
      const sqlQuery = "SELECT * from checklist WHERE created_by=($1) AND id=($2)";
      const result = await connection.query(sqlQuery, [userId, id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error retrieving all checklist items: ${(err as Error).message}`);
    }
  }

  async getAll (id: string): Promise<Checklist[]> {
    try {
      const connection = await database.connect();
      const sqlQuery = "SELECT * from checklist WHERE created_by=($1)";
      const result = await connection.query(sqlQuery, [id]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error retrieving all checklist items: ${(err as Error).message}`);
    }
  }

  async getSubItemCount (parentId: string): Promise<ChecklistSubitemCounter> {
    try {
      const connection = await database.connect();
      const sqlQuery = `SELECT
        SUM(CASE WHEN parent_id = $1 THEN 1 ELSE 0 END) as subitem_count,
        SUM(CASE WHEN completed = true AND parent_id = $1 THEN 1 ELSE 0 END)
        as completed_subitems FROM sub_checklist
      `;
      const result = await connection.query(sqlQuery, [parentId]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error retrieving all checklist items: ${(err as Error).message}`);
    }
  }

  async updateOne (userId: string, checklist: Checklist): Promise<Checklist> {
    try {
      const { title, description, id, completed } = checklist;
      const connection = await database.connect();
      const sqlQuery = `UPDATE checklist
        SET title=$1, description=$2, completed=$3
        WHERE id=$4 AND created_by=$5
        RETURNING *
      `;
      const result = await connection.query(
        sqlQuery,
        [
          title,
          description,
          completed,
          id,
          userId
        ]
      );
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error updating checklist item: ${(err as Error).message}`);
    }
  }

  async deleteOne (userId: string, id: string): Promise<Checklist> {
    try {
      const connection = await database.connect();
      const sqlQuery = "DELETE FROM checklist WHERE id=($1) AND created_by=($2)";
      const result = await connection.query(sqlQuery, [id, userId]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error deleting checklist (${id}): ${(err as Error).message}`);
    }
  }

  async toggleCompleted (userId: string, id: string, isCompleted: boolean): Promise<Checklist> {
    try {
      const connection = await database.connect();
      const sqlQuery = `UPDATE checklist
        SET completed=$1
        WHERE id=$2 AND created_by=$3
        RETURNING *
      `;
      const result = await connection.query(sqlQuery, [isCompleted, id, userId]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error deleting checklist (${id}): ${(err as Error).message}`);
    }
  }
}

export default ChecklistModel;