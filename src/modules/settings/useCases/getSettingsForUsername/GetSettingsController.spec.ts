import supertest from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("GetSettingsController", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to get settings by id", async () => {
    await supertest(app).post("/settings").send({
      username: "admin",
      chat: true,
    });

    const response = await supertest(app).get(`/settings/admin`);
    expect(response.body).toHaveProperty("id");
    expect(response.body.username).toBe("admin");
  });
});
