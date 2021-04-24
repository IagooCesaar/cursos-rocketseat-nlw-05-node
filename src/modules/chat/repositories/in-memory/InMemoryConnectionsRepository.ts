import { ICreateConnectionDTO } from "@modules/chat/dtos/ICreateConnectionDTO";
import { Connection } from "@modules/chat/entities/Connection";

import { IConnectionsRepository } from "../IConnectionsRepository";

class InMemoryConnectionsRepository implements IConnectionsRepository {
  private connections: Connection[] = [];

  async findByUserSocketId(socket_id: string): Promise<Connection> {
    return this.connections.find(
      (connection) => connection.socket_id === socket_id
    );
  }

  async findByUserId(user_id: string): Promise<Connection> {
    return this.connections.find(
      (connection) => connection.user_id === user_id
    );
  }

  async findWithoutAdmin(): Promise<Connection[]> {
    const connections = this.connections.filter(
      (connection) => !connection.admin_id
    );
    return connections;
  }

  async findByUserEmail(email: string): Promise<Connection> {
    const connection = this.connections.find((connection) => {
      if (connection.user) {
        if (connection.user.email === email) return true;
        return false;
      }
      return false;
    });
    return connection;
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
