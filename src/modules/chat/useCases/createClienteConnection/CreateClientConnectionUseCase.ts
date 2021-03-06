import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { Connection } from "@modules/chat/entities/Connection";
import { IConnectionsRepository } from "@modules/chat/repositories/IConnectionsRepository";

import { CreateClientConnectionError } from "./CreateClientConnectionError";

interface IRequest {
  email: string;
  socket_id: string;
}

@injectable()
class CreateClientConnectionUseCase {
  constructor(
    @inject("ConnectionsRepository")
    private connectionsRepository: IConnectionsRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, socket_id }: IRequest): Promise<Connection> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new CreateClientConnectionError.UserNotFound();
    }

    const currentConnection = await this.connectionsRepository.findByUserId(
      user.id
    );
    if (currentConnection) {
      currentConnection.socket_id = socket_id;
      await this.connectionsRepository.create({
        socket_id: currentConnection.socket_id,
        user_id: currentConnection.user_id,
        admin_id: null,
        id: currentConnection.id,
      });
      return currentConnection;
    }

    const connection = await this.connectionsRepository.create({
      socket_id,
      user_id: user.id,
    });

    return connection;
  }
}

export { CreateClientConnectionUseCase };
