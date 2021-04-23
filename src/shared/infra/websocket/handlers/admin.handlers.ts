import { Server, Socket } from "socket.io";

import { CreateAdminSocketHandler } from "@modules/chat/socketHandlers/createAdminConnection/CreateAdminConnectionSocketHandler";

const adminSocketHandler = async (io: Server, socket: Socket) => {
  io.emit("admin_list_all_users", await CreateAdminSocketHandler(io, socket)());
};

export { adminSocketHandler };
