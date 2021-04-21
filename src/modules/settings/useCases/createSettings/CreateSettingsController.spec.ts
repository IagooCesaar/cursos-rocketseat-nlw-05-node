import supertest from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

import { CreateSettingsError } from "./CreateSettingsError";

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

  it("Should not be able to create a new setting if already exists for a username", async () => {
    const response = await supertest(app).post("/settings").send({
      username: "Test",
      chat: true,
    });

    const error = new CreateSettingsError.UsernameAlreadyExists();

    expect(response.status).toBe(error.statusCode);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(error.message);
  });
});
