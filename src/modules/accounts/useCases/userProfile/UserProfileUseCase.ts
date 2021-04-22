import { inject, injectable } from "tsyringe";

import { User } from "@modules/accounts/entities/Users";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { UserProfileError } from "./UserProfileError";

interface IRequest {
  user_id?: string;
  email?: string;
}

@injectable()
class UserProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, email }: IRequest): Promise<User> {
    if (email) {
      return this.usersRepository.findByEmail(email);
    }

    if (!user_id) {
      throw new UserProfileError.ParametersNotProvided();
    }

    return this.usersRepository.findById(user_id);
  }
}

export { UserProfileUseCase };
