import { Server, Socket } from "socket.io";

import { CreateConnectionSocketHandler } from "@modules/chat/socketHandlers/createConnection/CreateConnectionSocketHandler";

const clientSocketHandler = (io: Server, socket: Socket) => {
  socket.on("client_first_access", CreateConnectionSocketHandler(io, socket));
};

export { clientSocketHandler };
