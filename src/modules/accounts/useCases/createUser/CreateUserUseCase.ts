import { inject, injectable } from "tsyringe";

import { User } from "@modules/accounts/entities/Users";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(email: string): Promise<User> {
    const user = await this.usersRepository.create({ email });
    return user;
  }
}

export { CreateUserUseCase };
