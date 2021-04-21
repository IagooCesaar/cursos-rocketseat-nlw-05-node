import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository";

import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("CreateUserUseCase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it("Should be able to create a new user", async () => {
    const userData = {
      email: "test@test.com",
    };

    const user = await createUserUseCase.execute(userData.email);
    expect(user).toHaveProperty("id");
  });

  it("Should not be able to create a user if email already registered", async () => {
    const userData = {
      email: "test@test.com",
    };
    await createUserUseCase.execute(userData.email);

    await expect(
      createUserUseCase.execute(userData.email)
    ).rejects.toBeInstanceOf(CreateUserError.UserAlreadyExists);
  });
});
