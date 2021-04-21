import { getRepository, Repository } from "typeorm";

import { ICreateMessageDTO } from "../../dtos/ICreateMessageDTO";
import { Message } from "../../entities/Message";
import { IMessageRepository } from "../../repositories/IMessagesRepository";

class MessagesRepository implements IMessageRepository {
  private repository: Repository<Message>;

  constructor() {
    this.repository = getRepository(Message);
  }

  async findByUserId(user_id: string): Promise<Message[]> {
    const messages = await this.repository.find({
      where: { user_id },
      order: {
        created_at: "DESC",
      },
      relations: ["user"],
    });
    return messages;
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
