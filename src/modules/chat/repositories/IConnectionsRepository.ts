import { ICreateConnectionDTO } from "../dtos/ICreateConnectionDTO";
import { Connection } from "../entities/Connection";

interface IConnectionsRepository {
  create({
    socket_id,
    user_id,
    admin_id,
    id,
  }: ICreateConnectionDTO): Promise<Connection>;
  findByUserEmail(email: string): Promise<Connection>;

  findWithoutAdmin(): Promise<Connection[]>;

  findByUserId(user_id: string): Promise<Connection>;
}

export { IConnectionsRepository };
