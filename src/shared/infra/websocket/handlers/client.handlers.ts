import { Server, Socket } from "socket.io";

import { CreateClientConnectionSocketHandler } from "@modules/chat/socketHandlers/createClientConnection/CreateClientConnectionSocketHandler";
import { SendMessageToAdminSocketHandler } from "@modules/chat/socketHandlers/sendMessageToAdmin/SendMessageToAdminSocketHandler";

const clientSocketHandler = (io: Server, socket: Socket) => {
  socket.on(
    "client_first_access",
    CreateClientConnectionSocketHandler(io, socket)
  );
  socket.on(
    "client_send_to_admin",
    SendMessageToAdminSocketHandler(io, socket)
  );
};

export { clientSocketHandler };
