import request from "supertest";
import app from "../../src/app";

const register_user = {
  first_name: "Johnny",
  last_name: "Doe",
  email: "johnny.doe@gmail.com",
  password: "Johnny01!",
};

export const USER = {
  id: "a3fa717c-796f-4265-8e52-50d4c919eac6",
  email: "johnny.doe@gmail.com",
  first_name: "Johnny",
  last_name: "Doe",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYTNmYTcxN2MtNzk2Zi00MjY1LThlNTItNTBkNGM5MTllYWM2IiwiZW1haWwiOiJqb2hubnkuZG9lQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJKb2hubnkiLCJsYXN0X25hbWUiOiJEb2UifSwiaWF0IjoxNzE0Mzc5MDAyfQ.ZMmsiYhpjuBooEQmTO02lHj9bl52OUhAN9USl_IX9uQ"
};

describe("checklist routes", () => {
  test("Get all items by user", async () => {
    const res = await request(app).get("/api/user");
    expect(res.body).toEqual({});
  });

  // test("create new user", async () => {
  //   const res = await request(app).post("/api/user").send(register_user);
  //   expect(res.status).toBe(200);
  //   expect(res.body.data.token).toBeTruthy();
  // });

  test("create user with duplicate email", async () => {
    const res = await request(app).post("/api/user").send(register_user);
    expect(res.status).toBe(500);
  });

  test("login user", async () => {
    const res = await request(app).post("/api/user/login").send({
      email: register_user.email,
      password: register_user.password
    });
    expect(res.status).toBe(200);
    expect(res.body.data.token).toBeTruthy();
    expect(res.body.data.id).toBe(USER.id);
  });

  test("verify user", async () => {
    const res = await request(app).post("/api/user/verify").send({
      token: USER.token
    });
    expect(res.status).toBe(200);
    expect(res.body.data.token).toBeTruthy();
    expect(res.body.data.id).toBe(USER.id);
  });
});