import { getRepository, Repository } from "typeorm";

import { ICreateConnectionDTO } from "@modules/chat/dtos/ICreateConnectionDTO";
import { Connection } from "@modules/chat/entities/Connection";
import { IConnectionsRepository } from "@modules/chat/repositories/IConnectionsRepository";

class ConnectionsRepository implements IConnectionsRepository {
  private repository: Repository<Connection>;

  constructor() {
    this.repository = getRepository(Connection);
  }

  async findByUserEmail(email: string): Promise<Connection> {
    const connection = await this.repository
      .createQueryBuilder("connection")
      .leftJoinAndSelect("connection.user", "user")
      .where("user.email = :email", { email })
      .getOne();
    return connection;
  }

  async create({
    socket_id,
    user_id,
    admin_id,
    id,
  }: ICreateConnectionDTO): Promise<Connection> {
    const connection = this.repository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });
    await this.repository.save(connection);
    return connection;
  }
}

export { ConnectionsRepository };
