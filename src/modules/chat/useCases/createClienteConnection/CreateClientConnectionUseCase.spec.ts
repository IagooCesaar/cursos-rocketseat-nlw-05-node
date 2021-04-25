import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryConnectionsRepository } from "@modules/chat/repositories/in-memory/InMemoryConnectionsRepository";

import { CreateClientConnectionError } from "./CreateClientConnectionError";
import { CreateClientConnectionUseCase } from "./CreateClientConnectionUseCase";

let createClientConnectionUseCase: CreateClientConnectionUseCase;
let connectionsRepository: InMemoryConnectionsRepository;
let usersRepository: InMemoryUsersRepository;

describe("CreateClientConnectionUseCase", () => {
  beforeEach(() => {
    connectionsRepository = new InMemoryConnectionsRepository();
    usersRepository = new InMemoryUsersRepository();
    createClientConnectionUseCase = new CreateClientConnectionUseCase(
      connectionsRepository,
      usersRepository
    );
  });

  it("Should be able to create a connection for a client", async () => {
    const user = await usersRepository.create({ email: "test@test.com" });
    const connection = await createClientConnectionUseCase.execute({
      email: user.email,
      socket_id: "test_socket_id",
    });

    expect(connection).toHaveProperty("id");
  });

  it("Should be able to create a connection for a client", async () => {
    await expect(
      createClientConnectionUseCase.execute({
        email: "test@test.com",
        socket_id: "test_socket_id",
      })
    ).rejects.toBeInstanceOf(CreateClientConnectionError.UserNotFound);
  });

  it("Should be able to use already created connection for a client", async () => {
    const user = await usersRepository.create({ email: "test@test.com" });
    const firstConn = await createClientConnectionUseCase.execute({
      email: user.email,
      socket_id: "test_socket_id",
    });
    const secondConn = await createClientConnectionUseCase.execute({
      email: user.email,
      socket_id: "test_socket_id",
    });

    expect(secondConn.id).toBe(firstConn.id);
  });
});
