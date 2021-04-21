import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/entities/Users";

import { IUsersRepository } from "../IUsersRepository";

class InMemoryUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create({ email }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { email });
    this.users.push(user);
    return user;
  }
}

export { InMemoryUsersRepository };