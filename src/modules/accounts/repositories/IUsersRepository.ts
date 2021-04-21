import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/Users";

interface IUsersRepository {
  create({ email }: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
