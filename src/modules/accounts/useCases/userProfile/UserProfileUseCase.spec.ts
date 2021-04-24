import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository";

import { UserProfileError } from "./UserProfileError";
import { UserProfileUseCase } from "./UserProfileUseCase";

let usersRepository: InMemoryUsersRepository;
let userProfileUseCase: UserProfileUseCase;

const mockUserData = {
  email: "test@test.com",
};

describe("UserProfileUseCase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    userProfileUseCase = new UserProfileUseCase(usersRepository);
  });

  it("Should be able to retrieve a user's profile by ID", async () => {
    const user = await usersRepository.create(mockUserData);
    const profile = await userProfileUseCase.execute({ user_id: user.id });

    expect(profile).toHaveProperty("id");
    expect(profile).toHaveProperty("email");
    expect(profile.email).toBe(user.email);
  });

  it("Should be able to retrieve a user's profile by email", async () => {
    const user = await usersRepository.create(mockUserData);
    const profile = await userProfileUseCase.execute({ email: user.email });

    expect(profile).toHaveProperty("id");
    expect(profile).toHaveProperty("email");
    expect(profile.email).toBe(user.email);
  });

  it("Should not be able to retrieve a user's without valid parameters", async () => {
    await usersRepository.create(mockUserData);
    await expect(userProfileUseCase.execute({})).rejects.toBeInstanceOf(
      UserProfileError.ParametersNotProvided
    );
  });
});
