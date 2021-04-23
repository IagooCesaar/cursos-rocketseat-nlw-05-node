import { ICreateConnectionDTO } from "@modules/chat/dtos/ICreateConnectionDTO";
import { Connection } from "@modules/chat/entities/Connection";

import { IConnectionsRepository } from "../IConnectionsRepository";

class InMemoryConnectionsRepository implements IConnectionsRepository {
  private connections: Connection[] = [];

  async findWithoutAdmin(): Promise<Connection[]> {
    const connections = this.connections.filter(
      (connection) => !connection.admin_id
    );
    return connections;
  }

  async findByUserEmail(email: string): Promise<Connection> {
    throw new Error("Method not implemented.");
  }

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
