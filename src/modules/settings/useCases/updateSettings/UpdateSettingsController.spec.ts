import supertest from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

import { UpdateSettingsError } from "./UpdateSettingsError";

let connection: Connection;

describe("UpdateSettingsController", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to update settings with a valid username", async () => {
    await supertest(app).post("/settings").send({
      chat: true,
      username: "admin",
    });

    const response = await supertest(app).patch("/settings/admin").send({
      chat: false,
    });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("chat");
    expect(response.body.chat).toBe(false);
  });

  it("Should not be able to update settings wit a invalid username", async () => {
    const response = await supertest(app).patch("/settings/inexistent").send({
      chat: false,
    });

    const error = new UpdateSettingsError.SettingNotFound();
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(error.statusCode);
    expect(response.body.message).toBe(error.message);
  });
});
