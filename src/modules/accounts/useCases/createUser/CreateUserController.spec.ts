import supertest from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

import { CreateUserError } from "./CreateUserError";

let connection: Connection;

describe("CreateUserControler", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new user", async () => {
    const response = await supertest(app).post("/accounts").send({
      email: "test@test.com",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not be able to create a user if email already registered", async () => {
    const response = await supertest(app).post("/accounts").send({
      email: "test@test.com",
    });

    const error = new CreateUserError.UserAlreadyExists();

    expect(response.status).toBe(error.statusCode);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(error.message);
  });
});
