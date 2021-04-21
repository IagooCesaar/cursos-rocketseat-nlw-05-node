import { v4 as uuidV4 } from "uuid";

import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryMessageRepository } from "@modules/chat/repositories/in-memory/InMemoryMessageRepository";

import { ListUserMessageUseCase } from "./ListUserMessagesUseCase";

let usersRepository: InMemoryUsersRepository;
let messagesRepository: InMemoryMessageRepository;
let listUserMessageUseCase: ListUserMessageUseCase;

describe("ListUserMessagesUseCase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    messagesRepository = new InMemoryMessageRepository();
    listUserMessageUseCase = new ListUserMessageUseCase(messagesRepository);
  });

  it("Should be able to get all messages by a valid user id", async () => {
    const user = await usersRepository.create({ email: "test@test.com" });

    await messagesRepository.createMessage({
      user_id: user.id,
      text: "Test 1",
    });

    await messagesRepository.createMessage({
      user_id: user.id,
      text: "Test 2",
    });

    const messages = await listUserMessageUseCase.execute(user.id);
    expect(messages).toHaveLength(2);
  });

  it("Should not be able to get messages for a inexistent user id", async () => {
    const user = await usersRepository.create({ email: "test@test.com" });

    await messagesRepository.createMessage({
      user_id: user.id,
      text: "Test 1",
    });

    await messagesRepository.createMessage({
      user_id: user.id,
      text: "Test 2",
    });

    const fakeId = uuidV4();

    const messages = await listUserMessageUseCase.execute(fakeId);
    expect(messages).toHaveLength(0);
  });
});
