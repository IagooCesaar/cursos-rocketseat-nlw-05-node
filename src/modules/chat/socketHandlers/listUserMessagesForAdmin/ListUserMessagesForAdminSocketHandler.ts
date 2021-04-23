import { Server, Socket } from "socket.io";
import { container } from "tsyringe";

import { ListUserMessagesUseCase } from "@modules/chat/useCases/listUserMessages/ListUserMessagesUseCase";

interface IParams {
  user_id: string;
}

const ListUserMessagesForAdminSocketHandler = (io: Server, socket: Socket) => {
  return async (params: IParams, callback): Promise<void> => {
    const { user_id } = params;

    const listUserMessagesUseCase = container.resolve(ListUserMessagesUseCase);

    const messages = await listUserMessagesUseCase.execute(user_id);

    callback(messages);
  };
};

export { ListUserMessagesForAdminSocketHandler };
