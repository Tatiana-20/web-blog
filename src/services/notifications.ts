import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (token: string): Socket => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000", {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    socket.on("connect", () => {
      console.log("Conectado al servidor de notificaciones");
    });

    socket.on("disconnect", () => {
      console.log("Desconectado del servidor de notificaciones");
    });

    socket.on("error", (error: unknown) => {
      console.error("Error en la conexión de socket:", error);
    });
  }
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const joinPostRoom = (postId: string): void => {
  if (socket) {
    socket.emit("joinPostRoom", postId);
  }
};

export const leavePostRoom = (postId: string): void => {
  if (socket) {
    socket.emit("leavePostRoom", postId);
  }
};

export const onNewPostNotification = (
  callback: (data: unknown) => void
): void => {
  if (socket) {
    socket.on("newPostNotification", callback);
  }
};

export const onPostUpdate = (callback: (data: unknown) => void): void => {
  if (socket) {
    socket.on("postUpdated", callback);
  }
};

export const offNewPostNotification = (
  callback: (data: unknown) => void
): void => {
  if (socket) {
    socket.off("newPostNotification", callback);
  }
};

export const offPostUpdate = (callback: (data: unknown) => void): void => {
  if (socket) {
    socket.off("postUpdated", callback);
  }
};
