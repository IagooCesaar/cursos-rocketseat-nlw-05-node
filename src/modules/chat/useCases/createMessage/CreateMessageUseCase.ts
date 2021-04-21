import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { Message } from "@modules/chat/entities/Message";
import { IMessageRepository } from "@modules/chat/infra/repositories/IMessagesRepository";

import { CreateMessageError } from "./CreateMessageError";

interface IRequest {
  user_id: string;
  admin_id?: string;
  text: string;
}

@injectable()
class CreateMessageUseCase {
  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessageRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ admin_id, user_id, text }: IRequest): Promise<Message> {
    const userExists = await this.usersRepository.findById(user_id);
    if (!userExists) {
      throw new CreateMessageError.UserNotFound();
    }

    const message = await this.messagesRepository.createMessage({
      user_id,
      text,
      admin_id,
    });
    return message;
  }
}

export { CreateMessageUseCase };
