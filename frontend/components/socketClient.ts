import { io, Socket } from "socket.io-client"

let socket: Socket | null = null

export const getSocket = () => {
  if (!socket) {
    socket = io("http://localhost:3001", {
      reconnection: true,
      randomizationFactor: 0.5,
      withCredentials: true
    })
  }
  return socket
}