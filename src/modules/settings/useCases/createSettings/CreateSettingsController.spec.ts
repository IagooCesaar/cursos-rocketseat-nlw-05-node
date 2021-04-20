import supertest from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("CreateSettingsController", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a setting", async () => {
    const response = await supertest(app).post("/settings").send({
      username: "Test",
      chat: true,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
});
