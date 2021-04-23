import "reflect-metadata";

import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { webSocketHandlers } from "../websocket";
import { app } from "./app";

const http = createServer(app);
const io = new Server(http);

io.on("connection", (socket: Socket) => {
  console.log("Nova conexão WS => ", socket.id);
  webSocketHandlers(io, socket);
});

http.listen(3333, () => console.log("Server is running 🚀"));
