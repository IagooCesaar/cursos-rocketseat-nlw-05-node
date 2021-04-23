import { inject, injectable } from "tsyringe";

import { Connection } from "@modules/chat/entities/Connection";
import { IConnectionsRepository } from "@modules/chat/repositories/IConnectionsRepository";

@injectable()
class GetUserConnectionDetailUseCase {
  constructor(
    @inject("ConnectionsRepository")
    private connectionsRepository: IConnectionsRepository
  ) {}

  async execute(user_id: string): Promise<Connection> {
    const connection = await this.connectionsRepository.findByUserId(user_id);
    return connection;
  }
}

export { GetUserConnectionDetailUseCase };
