import { io } from "socket.io-client";

export const useSocket = () => {
    const socket = io('http://localhost:3002', {
        withCredentials: true,
        transports: ['websocket'],
    });
    
    return {
        socket
    }
}