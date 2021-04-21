import { inject, injectable } from "tsyringe";

import { User } from "@modules/accounts/entities/Users";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { CreateUserError } from "./CreateUserError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(email: string): Promise<User> {
    const alreadyExists = await this.usersRepository.findByEmail(email);
    if (alreadyExists) {
      throw new CreateUserError.UserAlreadyExists();
    }

    const user = await this.usersRepository.create({ email });
    return user;
  }
}

export { CreateUserUseCase };
