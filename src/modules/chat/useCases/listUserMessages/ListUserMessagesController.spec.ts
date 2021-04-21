import supertest from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("ListUserMessagesController", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to get all messages sending by a valid user", async () => {
    const responseUser = await supertest(app).post("/accounts").send({
      email: "test@test.com",
    });
    const { id: user_id } = responseUser.body;

    await supertest(app).post("/chat").send({
      user_id,
      text: "test",
    });

    await supertest(app).post("/chat").send({
      user_id,
      text: "test",
    });

    const response = await supertest(app).get(`/chat/${user_id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it("Should not be able to get messages for a inexistent user id", async () => {
    const fakeId = uuidV4();

    const response = await supertest(app).get(`/chat/${fakeId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });
});
