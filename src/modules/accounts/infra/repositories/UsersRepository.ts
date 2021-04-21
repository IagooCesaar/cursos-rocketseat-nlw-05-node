import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/entities/Users";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ email }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      email,
    });
    await this.repository.save(user);
    return user;
  }
}

export { UsersRepository };
