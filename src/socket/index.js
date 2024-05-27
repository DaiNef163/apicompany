import { io } from "socket.io-client";

export const socketClient = io("http://localhost:4000");

export const connect = () => {
  socketClient.on("connect", function () {
    console.log("connect success");
  });
};

export const create = () => {
  socketClient.emit("create", { success: true });
};

export const edit = () => {
  socketClient.emit("edit", { success: true });
};

export const remove = () => {
  socketClient.emit("remove", { success: true });
};

export const hello = () => {
  socketClient.on("reload", () => {
    console.log("hello");
  });
};

const socketServer = (io) => {
  io.on("connection", (socket) => {
    console.log("connect socket");
    socket.on("create", ({ success = null }) => {
      if (success) socket.broadcast.emit("reload", { success: true });
    });
    socket.on("edit", ({ success = null }) => {
      if (success) socket.broadcast.emit("reload", { success: true });
    });
    socket.on("remove", ({ success = null }) => {
      if (success) socket.broadcast.emit("reload", { success: true });
    });
  });
};

module.exports = socketServer;
