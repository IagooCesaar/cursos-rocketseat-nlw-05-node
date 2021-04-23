import { Server, Socket } from "socket.io";

import { CreateClientConnectionSocketHandler } from "@modules/chat/socketHandlers/createClientConnection/CreateClientConnectionSocketHandler";

const clientSocketHandler = (io: Server, socket: Socket) => {
  socket.on(
    "client_first_access",
    CreateClientConnectionSocketHandler(io, socket)
  );
};

export { clientSocketHandler };
