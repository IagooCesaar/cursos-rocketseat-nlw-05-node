import { inject, injectable } from "tsyringe";

import { Connection } from "@modules/chat/entities/Connection";
import { IConnectionsRepository } from "@modules/chat/repositories/IConnectionsRepository";

interface IRequest {
  user_id: string;
  admin_id: string;
}

@injectable()
class SetAdminToClientConnectionUseCase {
  constructor(
    @inject("ConnectionsRepository")
    private connectionsRepository: IConnectionsRepository
  ) {}

  async execute({ admin_id, user_id }: IRequest): Promise<Connection> {
    const connection = await this.connectionsRepository.findByUserId(user_id);
    connection.admin_id = admin_id;
    await this.connectionsRepository.create(connection);
    return connection;
  }
}

export { SetAdminToClientConnectionUseCase };
