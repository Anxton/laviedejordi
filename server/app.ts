/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server } from "socket.io";

const io = new Server(3000);

// Listen for incoming connections
io.on("connection", (_socket) => {
    console.log("New connection");
});