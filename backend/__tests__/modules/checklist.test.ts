import request from "supertest";
import app from "../../src/app";
import { USER } from "./user.test";


describe("checklist routes", () => {
  test("Get all items", async () => {
    const res = await request(app)
      .get("/api/item")
      .set("Authorization", `Bearer ${USER.token}`);
    expect(res.body.message).toEqual("Checklist items retrieved successfully.");
    expect(res.body.data[0].subitem_count).toBe("0");
    expect(res.body.data[0].completed_subitems).toBe("0");
  });

  test("create new item", async () => {
    const newItem = {
      title: "Sample item 1",
      description: "Sample descriprion 1"
    };
    const res = await request(app)
      .post("/api/item")
      .send(newItem)
      .set("Authorization", `Bearer ${USER.token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe(newItem.title);
  });
  
  test("update item", async () => {
    const existingItem = {
      id: "14dcbbd2-14e2-4804-b475-e5b38234f061",
      title: "Sample item 1",
      description: "",
      created_at: "2024-04-29T08:39:45.704Z",
      created_by: "a3fa717c-796f-4265-8e52-50d4c919eac6"
    };
    const res = await request(app)
      .patch(`/api/item/${existingItem.id}`)
      .send(existingItem)
      .set("Authorization", `Bearer ${USER.token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.description).toBe("");
  });

  test("delete item", async () => {
    const existingItem = {
      id: "44d82422-b907-4fab-948c-a17cc763b92e"
    };
    const res = await request(app)
      .delete(`/api/item/${existingItem.id}`)
      .set("Authorization", `Bearer ${USER.token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(existingItem.id);
  });
});