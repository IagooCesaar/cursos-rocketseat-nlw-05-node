import { ICreateConnectionDTO } from "@modules/chat/dtos/ICreateConnectionDTO";
import { Connection } from "@modules/chat/entities/Connection";

import { IConnectionsRepository } from "../IConnectionsRepository";

class InMemoryConnectionsRepository implements IConnectionsRepository {
  private connections: Connection[] = [];

  async create({
    socket_id,
    user_id,
    admin_id,
    id,
  }: ICreateConnectionDTO): Promise<Connection> {
    const connection = new Connection();
    Object.assign(connection, {
      socket_id,
      user_id,
      admin_id,
      id,
    });
    this.connections.push(connection);
    return connection;
  }
}

export { InMemoryConnectionsRepository };