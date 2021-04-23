import { inject, injectable } from "tsyringe";

import { Message } from "@modules/chat/entities/Message";
import { IMessageRepository } from "@modules/chat/repositories/IMessagesRepository";

@injectable()
class ListUserMessagesUseCase {
  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessageRepository
  ) {}

  async execute(user_id: string): Promise<Message[]> {
    const messages = await this.messagesRepository.findByUserId(user_id);
    return messages;
  }
}

export { ListUserMessagesUseCase };
