import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { app } from "./app";

const http = createServer(app);
const io = new Server(http);

io.on("connection", (socket: Socket) => {
  console.log("Nova conexão", socket.id);
});

http.listen(3333, () => console.log("Server is running 🚀"));
