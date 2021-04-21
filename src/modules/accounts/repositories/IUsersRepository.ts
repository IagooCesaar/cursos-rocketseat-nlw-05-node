import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/Users";

interface IUsersRepository {
  create({ email }: ICreateUserDTO): Promise<User>;
}

export { IUsersRepository };
