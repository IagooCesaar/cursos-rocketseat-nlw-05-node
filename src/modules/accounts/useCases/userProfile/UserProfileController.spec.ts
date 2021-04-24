import supertest from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

import { UserProfileError } from "./UserProfileError";
import { UserProfileUseCase } from "./UserProfileUseCase";

const mockUserData = {
  email: "test@test.com",
};

let connection: Connection;

describe("UserProfileController", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to retrieve a user profile by ID", async () => {
    const userResponse = await supertest(app)
      .post("/accounts")
      .send(mockUserData);
    const { id, email } = userResponse.body;

    const response = await supertest(app).get(`/accounts/id/${id}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email");
    expect(response.body.email).toBe(email);
  });

  it("Should be able to retrieve a user profile by email", async () => {
    const { email } = mockUserData;

    const response = await supertest(app).get(`/accounts/email/${email}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email");
    expect(response.body.email).toBe(email);
  });

  it("Should not be able to retrieve a user profile without parameters", async () => {
    const response = await supertest(app).get("/accounts/id/");
    const error = new UserProfileError.ParametersNotProvided();

    expect(response.status).toBe(error.statusCode);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(error.message);
  });
});
