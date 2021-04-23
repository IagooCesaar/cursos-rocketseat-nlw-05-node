import { Server, Socket } from "socket.io";
import { container } from "tsyringe";

import { GetClientsWithoutAdminUseCase } from "@modules/chat/useCases/getClientsWithoutAdmin/GetClientsWithoutAdminUseCase";

const CreateAdminSocketHandler = (io: Server, socket: Socket) => {
  return async (): Promise<void> => {
    const getClientsWithoutAdminUseCase = container.resolve(
      GetClientsWithoutAdminUseCase
    );
    const connections = await getClientsWithoutAdminUseCase.execute();
    io.emit("admin_list_all_users", connections);
  };
};

export { CreateAdminSocketHandler };
