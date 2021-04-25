import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryConnectionsRepository } from "@modules/chat/repositories/in-memory/InMemoryConnectionsRepository";

import { GetClientsWithoutAdminUseCase } from "./GetClientsWithoutAdminUseCase";

let connectionsRepository: InMemoryConnectionsRepository;
let usersRespository: InMemoryUsersRepository;
let getClientWithoutAdminUseCase: GetClientsWithoutAdminUseCase;

describe("GetClientsWithoutAdminUseCase", () => {
  beforeEach(() => {
    usersRespository = new InMemoryUsersRepository();
    connectionsRepository = new InMemoryConnectionsRepository();
    getClientWithoutAdminUseCase = new GetClientsWithoutAdminUseCase(
      connectionsRepository
    );
  });

  it("Should be able to get list of all clients with no admin relationship", async () => {
    const user1 = await usersRespository.create({
      email: "user1@test.com",
    });
    const conn1 = await connectionsRepository.create({
      socket_id: "user1",
      user_id: user1.id,
    });

    const user2 = await usersRespository.create({
      email: "user2@test.com",
    });
    const conn2 = await connectionsRepository.create({
      socket_id: "user2",
      user_id: user2.id,
    });

    const allUsers = await getClientWithoutAdminUseCase.execute();
    expect(allUsers).toStrictEqual([conn1, conn2]);
  });
});
