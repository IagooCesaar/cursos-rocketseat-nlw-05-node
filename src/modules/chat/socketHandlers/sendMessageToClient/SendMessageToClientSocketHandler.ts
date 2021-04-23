import { Server, Socket } from "socket.io";
import { container } from "tsyringe";

import { CreateMessageUseCase } from "@modules/chat/useCases/createMessage/CreateMessageUseCase";
import { GetUserConnectionDetailUseCase } from "@modules/chat/useCases/getUserConnectionDetail/GetUserConnectionDetailUseCase";

interface IParams {
  user_id: string;
  text: string;
}

const SendMessageToClientSocketHandler = (io: Server, socket: Socket) => {
  return async ({ text, user_id }: IParams, callback): Promise<void> => {
    const createMessgeUseCase = container.resolve(CreateMessageUseCase);
    const message = await createMessgeUseCase.execute({
      admin_id: socket.id,
      text,
      user_id,
    });
    callback(message);

    const getUserConnectionUseCase = container.resolve(
      GetUserConnectionDetailUseCase
    );
    const { socket_id } = await getUserConnectionUseCase.execute(user_id);

    io.to(socket_id).emit("admin_send_to_client", {
      text,
      socket_id: socket.id,
    });
  };
};

export { SendMessageToClientSocketHandler };
