import supertest from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";

import { CreateMessageError } from "./CreateMessageError";

let connection: Connection;
let user_id: string;

describe("CreateMessageController", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a message for a existent user", async () => {
    const responseUser = await supertest(app).post("/accounts").send({
      email: "test@test.com",
    });
    user_id = responseUser.body.id;

    const response = await supertest(app).post("/chat").send({
      user_id,
      text: "Need Help",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not be able to create a message with empty text", async () => {
    const response = await supertest(app).post("/chat").send({
      user_id,
      text: "",
    });

    const error = new CreateMessageError.TextMustNotBeEmpty();
    expect(response.status).toBe(error.statusCode);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(error.message);
  });

  it("Should not be able to create a message for inexistent user", async () => {
    const response = await supertest(app).post("/chat").send({
      user_id: uuidV4(),
      text: "test",
    });

    const error = new CreateMessageError.UserNotFound();
    expect(response.status).toBe(error.statusCode);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(error.message);
  });
});
