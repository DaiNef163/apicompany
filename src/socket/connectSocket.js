import { Server } from "http";
import { Server as SocketServer } from "socket.io";

export const connectSocket = () => {
  // Tạo một máy chủ HTTP
  const httpServer = new Server();

  // Kết nối máy chủ Socket.io với máy chủ HTTP
  const io = new SocketServer(httpServer);

  // Lắng nghe các kết nối từ máy khách
  io.on("connection", (client) => {
    console.log("A client connected");

    // Xử lý sự kiện từ máy khách
    client.on("event", (data) => {
      console.log("Received event:", data);
    });

    // Xử lý khi máy khách ngắt kết nối
    client.on("disconnect", () => {
      console.log("A client disconnected");
    });
  });

  // Lắng nghe các kết nối từ cổng 3000
  httpServer.listen(3000, () => {
    console.log("Server is running on port 3000 socket");
  });
};
