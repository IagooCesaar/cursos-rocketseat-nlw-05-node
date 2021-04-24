import { Server, Socket } from "socket.io";
import { container } from "tsyringe";

import { SetAdminToClientConnectionUseCase } from "@modules/chat/useCases/setAdminToClientConnection/SetAdminToClientConnectionUseCase";

interface IParams {
  user_id: string;
}

const SetAdminToClientSocketHandler = (io: Server, socket: Socket) => {
  return async (params: IParams, callback): Promise<void> => {
    const { user_id } = params;

    const setAdminToClientConnectionUseCase = container.resolve(
      SetAdminToClientConnectionUseCase
    );
    await setAdminToClientConnectionUseCase.execute({
      user_id,
      admin_id: socket.id,
    });
  };
};

export { SetAdminToClientSocketHandler };
