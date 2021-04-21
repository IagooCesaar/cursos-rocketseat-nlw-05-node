import { inject, injectable } from "tsyringe";

import { Message } from "@modules/chat/entities/Message";
import { IMessageRepository } from "@modules/chat/infra/repositories/IMessagesRepository";

interface IRequest {
  user_id: string;
  admin_id?: string;
  text: string;
}

@injectable()
class CreateMessageUseCase {
  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessageRepository
  ) {}

  async execute({ admin_id, user_id, text }: IRequest): Promise<Message> {
    const message = await this.messagesRepository.createMessage({
      user_id,
      text,
      admin_id,
    });
    return message;
  }
}

export { CreateMessageUseCase };
