import { getRepository, Repository } from "typeorm";

import { ICreateMessageDTO } from "../dtos/ICreateMessageDTO";
import { Message } from "../entities/Message";
import { IMessageRepository } from "../infra/repositories/IMessagesRepository";

class MessagesRepository implements IMessageRepository {
  private repository: Repository<Message>;

  constructor() {
    this.repository = getRepository(Message);
  }

  async createMessage({
    user_id,
    text,
    admin_id,
  }: ICreateMessageDTO): Promise<Message> {
    const message = this.repository.create({
      user_id,
      text,
      admin_id,
    });
    await this.repository.save(message);
    return message;
  }
}

export { MessagesRepository };
