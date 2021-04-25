import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryConnectionsRepository } from "@modules/chat/repositories/in-memory/InMemoryConnectionsRepository";

import { GetUserConnectionDetailUseCase } from "./GetUserConnectionDetailUseCase";

let connectionsRepository: InMemoryConnectionsRepository;
let usersRepository: InMemoryUsersRepository;
let getUserConnectionDetailUseCase: GetUserConnectionDetailUseCase;

describe("GetUserConnectionDetailUseCase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    connectionsRepository = new InMemoryConnectionsRepository();
    getUserConnectionDetailUseCase = new GetUserConnectionDetailUseCase(
      connectionsRepository
    );
  });

  it("Should be able to get connection's user detail", async () => {
    const { id: user_id } = await usersRepository.create({
      email: "test@test.com",
    });
    const socket_id = "socket_id";

    await connectionsRepository.create({
      socket_id,
      user_id,
    });

    const detail = await getUserConnectionDetailUseCase.execute({
      socket_id,
      user_id,
    });

    expect(detail).toHaveProperty("id");
  });
});
