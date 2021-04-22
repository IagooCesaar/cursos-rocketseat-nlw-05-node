import { inject, injectable } from "tsyringe";

import { Connection } from "@modules/chat/entities/Connection";
import { IConnectionsRepository } from "@modules/chat/repositories/IConnectionsRepository";

interface IReqyest {
  user_id: string;
  socket_id: string;
}

@injectable()
class CreateConnecionUseCase {
  constructor(
    @inject("ConnectionsRepository")
    private connectionsRepository: IConnectionsRepository
  ) {}

  async execute({ user_id, socket_id }: IReqyest): Promise<Connection> {
    const connection = await this.connectionsRepository.create({
      socket_id,
      user_id,
    });
    return connection;
  }
}

export { CreateConnecionUseCase };
