import { v4 as uuidV4 } from "uuid";

import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryMessageRepository } from "@modules/chat/repositories/in-memory/InMemoryMessageRepository";

import { CreateMessageError } from "./CreateMessageError";
import { CreateMessageUseCase } from "./CreateMessageUseCase";

let createMessageUseCase: CreateMessageUseCase;
let messagesRepository: InMemoryMessageRepository;
let usersRepository: InMemoryUsersRepository;

describe("CreateMessageUseCase", () => {
  beforeEach(() => {
    messagesRepository = new InMemoryMessageRepository();
    usersRepository = new InMemoryUsersRepository();
    createMessageUseCase = new CreateMessageUseCase(
      messagesRepository,
      usersRepository
    );
  });

  it("Should be able to create a message for a user", async () => {
    const user = await usersRepository.create({ email: "test@test.com" });

    const message = await createMessageUseCase.execute({
      user_id: user.id,
      text: "Need Help",
    });

    expect(message).toHaveProperty("id");
  });

  it("Should not be able to create a message for a user without text", async () => {
    const user = await usersRepository.create({ email: "test@test.com" });

    await expect(
      createMessageUseCase.execute({
        user_id: user.id,
        text: undefined,
      })
    ).rejects.toBeInstanceOf(CreateMessageError.TextMustNotBeEmpty);
  });

  it("Should not be able to create a message for a inexistent user", async () => {
    const fakeId = uuidV4();
    await expect(
      createMessageUseCase.execute({
        user_id: fakeId,
        text: "test",
      })
    ).rejects.toBeInstanceOf(CreateMessageError.UserNotFound);
  });
});
