import { Pool } from "pg";

describe("Postgres DB Connection", () => {
  it("should establish db connection", async () => {
    const pool = new Pool({
      user: "postgres",
      password: "",
      host: "localhost",
      port: 5432,
      database: "dev",
    });

    const client = await pool.connect();
    expect(client).toBeTruthy();
    client.release();
  });
});