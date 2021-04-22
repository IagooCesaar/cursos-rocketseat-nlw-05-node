import "reflect-metadata";

import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { clientSocketHandler } from "../websocket/handlers/client";
import { app } from "./app";

const http = createServer(app);
const io = new Server(http);

io.on("connection", (socket: Socket) => {
  console.log("Nova conexão", socket.id);

  clientSocketHandler(io, socket);
});

http.listen(3333, () => console.log("Server is running 🚀"));
