import { Server, Socket } from "socket.io";
import { container } from "tsyringe";

import { CreateMessageUseCase } from "@modules/chat/useCases/createMessage/CreateMessageUseCase";
import { GetUserConnectionDetailUseCase } from "@modules/chat/useCases/getUserConnectionDetail/GetUserConnectionDetailUseCase";

interface IParams {
  admin_id: string;
  text: string;
}

const SendMessageToAdminSocketHandler = (io: Server, socket: Socket) => {
  return async ({ text, admin_id }: IParams): Promise<void> => {
    const socket_id = socket.id;
    console.log("aqui", admin_id);

    const getUserConnectionUseCase = container.resolve(
      GetUserConnectionDetailUseCase
    );
    const { user_id } = await getUserConnectionUseCase.execute({ socket_id });

    const createMessageUseCase = container.resolve(CreateMessageUseCase);
    const message = await createMessageUseCase.execute({
      text,
      user_id,
    });
    console.log(message);

    io.to(admin_id).emit("client_send_to_admin", message);
  };
};

export { SendMessageToAdminSocketHandler };
