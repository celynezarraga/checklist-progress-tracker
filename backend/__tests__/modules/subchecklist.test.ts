import request from "supertest";
import app from "../../src/app";
import { USER } from "./user.test";

const ITEM_ID = "14dcbbd2-14e2-4804-b475-e5b38234f061";
const SUBITEM_ID = "d512d7c0-f5c0-443b-a312-8873c0989b15";

describe("subchecklist routes", () => {
  test("Get all subitems by parent_id", async () => {
    const res = await request(app)
      .get(`/api/item/${ITEM_ID}/subitem`)
      .set("Authorization", `Bearer ${USER.token}`);
    expect(res.body.message).toEqual("Checklist subitems retrieved successfully.");
  });

  test("create new subitem", async () => {
    const newSubItem = {
      title: "Sample subitem 1",
      parent_id: ITEM_ID
    };
    const res = await request(app)
      .post("/api/subitem")
      .send(newSubItem)
      .set("Authorization", `Bearer ${USER.token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe(newSubItem.title);
    expect(res.body.data.description).toBe(null);
  });
  
  test("update item", async () => {
    const existingItem = {
      id: SUBITEM_ID,
      title: "Sample item 1",
      description: "Description",
      created_at: "2024-04-29T08:39:45.704Z",
      created_by: "a3fa717c-796f-4265-8e52-50d4c919eac6",
      parent_id: ITEM_ID,
    };
    const res = await request(app)
      .patch(`/api/subitem/${existingItem.id}`)
      .send(existingItem)
      .set("Authorization", `Bearer ${USER.token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.description).toBe(existingItem.description);
  });

  test("delete item", async () => {
    const existingItem = {
      id: "48b2a662-e0c5-414a-84b2-3f45053665b1"
    };
    const res = await request(app)
      .delete(`/api/subitem/${existingItem.id}`)
      .set("Authorization", `Bearer ${USER.token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(existingItem.id);
  });
});