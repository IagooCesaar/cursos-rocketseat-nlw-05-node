import { Server, Socket } from "socket.io";

import { CreateAdminSocketHandler } from "@modules/chat/socketHandlers/createAdminConnection/CreateAdminConnectionSocketHandler";
import { ListUserMessagesForAdminSocketHandler } from "@modules/chat/socketHandlers/listUserMessagesForAdmin/ListUserMessagesForAdminSocketHandler";

const adminSocketHandler = async (io: Server, socket: Socket) => {
  io.emit("admin_list_all_users", await CreateAdminSocketHandler(io, socket)());

  socket.on(
    "admin_list_messages_by_user",
    ListUserMessagesForAdminSocketHandler(io, socket)
  );
};

export { adminSocketHandler };
