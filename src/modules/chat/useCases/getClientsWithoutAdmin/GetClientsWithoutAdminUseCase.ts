import { inject, injectable } from "tsyringe";

import { Connection } from "@modules/chat/entities/Connection";
import { IConnectionsRepository } from "@modules/chat/repositories/IConnectionsRepository";

@injectable()
class GetClientsWithoutAdminUseCase {
  constructor(
    @inject("ConnectionsRepository")
    private connectionsRepository: IConnectionsRepository
  ) {}
  async execute(): Promise<Connection[]> {
    const connections = await this.connectionsRepository.findWithoutAdmin();
    return connections;
  }
}

export { GetClientsWithoutAdminUseCase };
