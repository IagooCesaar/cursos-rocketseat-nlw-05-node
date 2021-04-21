import { ICreateMessageDTO } from "@modules/chat/dtos/ICreateMessageDTO";
import { Message } from "@modules/chat/entities/Message";

import { IMessageRepository } from "../IMessagesRepository";

class InMemoryMessageRepository implements IMessageRepository {
  private messages: Message[] = [];

  async findByUserId(user_id: string): Promise<Message[]> {
    return this.messages.filter((message) => message.user_id === user_id);
  }

  async createMessage({
    user_id,
    text,
    admin_id,
  }: ICreateMessageDTO): Promise<Message> {
    const message = new Message();
    Object.assign(message, {
      user_id,
      text,
      admin_id,
    });
    this.messages.push(message);
    return message;
  }
}

export { InMemoryMessageRepository };
