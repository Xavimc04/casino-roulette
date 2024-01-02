import { io } from "socket.io-client";

export function wsConnect() {
    return io("http://localhost:3456")
}