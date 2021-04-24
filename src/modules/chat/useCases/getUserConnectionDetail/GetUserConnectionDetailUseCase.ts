import { inject, injectable } from "tsyringe";

import { Connection } from "@modules/chat/entities/Connection";
import { IConnectionsRepository } from "@modules/chat/repositories/IConnectionsRepository";

interface IRequest {
  user_id?: string;
  socket_id?: string;
}

@injectable()
class GetUserConnectionDetailUseCase {
  constructor(
    @inject("ConnectionsRepository")
    private connectionsRepository: IConnectionsRepository
  ) {}

  async execute({ socket_id, user_id }: IRequest): Promise<Connection> {
    if (socket_id) {
      const connection = await this.connectionsRepository.findByUserSocketId(
        socket_id
      );
      return connection;
    }
    const connection = await this.connectionsRepository.findByUserId(user_id);
    return connection;
  }
}

export { GetUserConnectionDetailUseCase };
