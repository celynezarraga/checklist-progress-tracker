import database from "../database";
import { SubChecklist } from "../types/subChecklist";

class SubChecklistModel {

  async create (subChecklist:SubChecklist): Promise<SubChecklist> {
    try {
      const { title, description, created_by, created_at, parent_id } = subChecklist;
      const connection = await database.connect();
      const sqlQuery = "INSERT INTO sub_checklist (title, description, created_by, created_at, parent_id) values ($1, $2, $3, $4, $5) returning id, title, description, created_at, created_by, parent_id";
      const result = await connection.query(
        sqlQuery,
        [
          title,
          description,
          created_by,
          created_at,
          parent_id
        ]
      );
      connection.release();
      return result.rows[0];
    } catch (err) {
      const errMessage = (err as Error).message;
      throw new Error(`Error creating new subitem: ${errMessage}`);
    }
  }

  async getAll (userId: string): Promise<SubChecklist[]> {
    try {
      const connection = await database.connect();
      const sqlQuery = "SELECT * from sub_checklist WHERE created_by=($1)";
      const result = await connection.query(sqlQuery, [userId]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error retrieving all subitems: ${(err as Error).message}`);
    }
  }

  async getAllByParent (userId: string, parentId: string): Promise<SubChecklist[]> {
    try {
      const connection = await database.connect();
      const sqlQuery = "SELECT * from sub_checklist WHERE created_by=($1) and parent_id=($2)";
      const result = await connection.query(sqlQuery, [userId, parentId]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error retrieving all subitems: ${(err as Error).message}`);
    }
  }

  async updateOne (userId: string, subChecklist: SubChecklist): Promise<SubChecklist> {
    try {
      const { title, description, id, completed } = subChecklist;
      const connection = await database.connect();
      const sqlQuery = `UPDATE sub_checklist
        SET title=$1, description=$2, completed=$3
        WHERE id=$4 AND created_by=$5 
        RETURNING id, title, description, completed, created_at, parent_id
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
      throw new Error(`Error updating subitem: ${(err as Error).message}`);
    }
  }

  async deleteOne (userId: string, id: string): Promise<SubChecklist> {
    try {
      const connection = await database.connect();
      const sqlQuery = "DELETE FROM sub_checklist WHERE id=($1) AND created_by=($2)";
      const result = await connection.query(sqlQuery, [id, userId]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error deleting subitem (${id}): ${(err as Error).message}`);
    }
  }

  async deleteByParent (userId: string, parent_id: string): Promise<SubChecklist> {
    try {
      const connection = await database.connect();
      const sqlQuery = "DELETE FROM sub_checklist WHERE parent_id=($1) AND created_by=($2)";
      const result = await connection.query(sqlQuery, [parent_id, userId]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error deleting all subitems of (${parent_id}): ${(err as Error).message}`);
    }
  }

  async toggleCompletedByParent (userId: string, parent_id: string, isCompleted: boolean): Promise<SubChecklist[]> {
    try {
      const connection = await database.connect();
      const sqlQuery = `UPDATE sub_checklist
        SET completed=$1
        WHERE parent_id=($2) AND created_by=($3) AND completed=($4)
        RETURNING id, title, description, completed, created_at, parent_id
      `;
      const result = await connection.query(
        sqlQuery,
        [isCompleted, parent_id, userId, !isCompleted]
      );
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error toggling completed for subitems of (${parent_id}): ${(err as Error).message}`);
    }
  }
}

export default SubChecklistModel;