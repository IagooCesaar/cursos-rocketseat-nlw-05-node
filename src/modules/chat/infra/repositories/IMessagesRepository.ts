import { ICreateMessageDTO } from "@modules/chat/dtos/ICreateMessageDTO";
import { Message } from "@modules/chat/entities/Message";

interface IMessageRepository {
  createMessage({
    user_id,
    text,
    admin_id,
  }: ICreateMessageDTO): Promise<Message>;
}

export { IMessageRepository };
