import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryConnectionsRepository } from "@modules/chat/repositories/in-memory/InMemoryConnectionsRepository";

import { SetAdminToClientConnectionUseCase } from "./SetAdminToClientConnectionUseCase";

let usersRepository: InMemoryUsersRepository;
let connectionsRepository: InMemoryConnectionsRepository;
let setAdminToClientConnectionUseCase: SetAdminToClientConnectionUseCase;

describe("SetAdminToClientConnectionUseCase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    connectionsRepository = new InMemoryConnectionsRepository();
    setAdminToClientConnectionUseCase = new SetAdminToClientConnectionUseCase(
      connectionsRepository
    );
  });

  it("Should be able to set a admin socket id for a client connection", async () => {
    const { id: user_id } = await usersRepository.create({
      email: "test@test.com",
    });
    const socket_id = "socket_id";
    const conn = await connectionsRepository.create({
      socket_id,
      user_id,
    });

    const connWithAdmin = await setAdminToClientConnectionUseCase.execute({
      user_id,
      admin_id: "admin_id",
    });

    expect(connWithAdmin.id).toBe(conn.id);
    expect(connWithAdmin.admin_id).not.toBe(undefined);
  });
});
