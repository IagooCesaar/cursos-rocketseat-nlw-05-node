import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { Connection } from "@modules/chat/entities/Connection";
import { IConnectionsRepository } from "@modules/chat/repositories/IConnectionsRepository";

import { CreateConnectionError } from "./CreateConnectionError";

interface IRequest {
  email: string;
  socket_id: string;
}

@injectable()
class CreateConnectionUseCase {
  constructor(
    @inject("ConnectionsRepository")
    private connectionsRepository: IConnectionsRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, socket_id }: IRequest): Promise<Connection> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new CreateConnectionError.UserNotFound();
    }

    const connection = await this.connectionsRepository.create({
      socket_id,
      user_id: user.id,
    });
    return connection;
  }
}

export { CreateConnectionUseCase };
