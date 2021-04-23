import { Server, Socket } from "socket.io";

import { adminSocketHandler } from "./handlers/admin.handlers";
import { clientSocketHandler } from "./handlers/cliente.handlers";

const webSocketHandlers = (io: Server, socket: Socket): void => {
  clientSocketHandler(io, socket);
  adminSocketHandler(io, socket);
};

export { webSocketHandlers };
