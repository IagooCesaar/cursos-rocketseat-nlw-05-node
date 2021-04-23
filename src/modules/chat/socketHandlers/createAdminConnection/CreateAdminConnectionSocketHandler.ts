import { Server, Socket } from "socket.io";
import { container } from "tsyringe";

import { Connection } from "@modules/chat/entities/Connection";
import { GetClientsWithoutAdminUseCase } from "@modules/chat/useCases/getClientsWithoutAdmin/GetClientsWithoutAdminUseCase";

const CreateAdminSocketHandler = (io: Server, socket: Socket) => {
  return async (): Promise<Connection[]> => {
    const getClientsWithoutAdminUseCase = container.resolve(
      GetClientsWithoutAdminUseCase
    );
    const connections = await getClientsWithoutAdminUseCase.execute();
    return connections;
  };
};

export { CreateAdminSocketHandler };
