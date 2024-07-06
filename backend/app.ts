/* eslint-disable @typescript-eslint/no-unused-vars */
import { readFileSync } from "fs";
import { createServer } from "https";
import { Server, Socket } from "socket.io";

const options = {
    key: readFileSync('/etc/letsencrypt/live/alcoolis.me-0002/privkey.pem'),
    cert: readFileSync('/etc/letsencrypt/live/alcoolis.me-0002/fullchain.pem')
};
const httpsServer = createServer(options);
const io = new Server(httpsServer, {
    cors: {
        origin: "https://laviedejordi.me",
    }
});

type Message = {
    author: string;
    message: string;
    server?: boolean;
}

type User = {
    username: string;
    hasJoined: boolean;
    socket: Socket;
}

const createServerMessage = (message: string): Message => {
    return {
        "author": "Server",
        "message": message,
        "server": true,
    }
};

const createJoinMessage = (username: string): Message => {
    // return createServerMessage(`${username} has joined the chat`);
    return createServerMessage(`${username} a rejoint le chat 😻`);
};

const createLeaveMessage = (username: string): Message => {
    // return createServerMessage(`${username} has left the chat`);
    return createServerMessage(`${username} est parti du chat 😿`);
}

const MAX_MESSAGE_LENGTH = 100; // Define the maximum message length
const MAX_HISTORY_LENGTH = 100; // Define the maximum history length

const isUserMessageInvalid = (message: Message): boolean => {
    return message.message.trim() === "" || message.author.trim() === "" || message.message.length > MAX_MESSAGE_LENGTH || message.server === true;
}

const users: User[] = [];

const messageHistory: Message[] = [];

const addToMessageHistory = (message: Message) => {
    messageHistory.push(message);
    if (messageHistory.length > MAX_HISTORY_LENGTH) {
        messageHistory.shift();
    }
}

const broadcast = (ev: string, message: Message) => {
    io.emit(ev, message);
    addToMessageHistory(message);
}

const log = (message: string) => {
    const timestamp = new Date().toUTCString();
    console.info(`[${timestamp}] ${message}`);
}

const listenForJoin = (user: User) => {
    user.socket.on("join", (username) => {
        // If the user has already joined, ignore the message
        if (user.hasJoined) {
            return;
        }
        // If the username is invalid, ignore the message
        if (username.trim() === "") {
            return;
        }
        // Set the username and add the user to the list
        user.username = username;
        user.hasJoined = true;
        users.push(user);
        // Send the history to the user
        user.socket.emit("history", messageHistory);
        addMessageListener(user);
        addDisconnectListener(user);
        broadcast("message", createJoinMessage(username));
        log("Join: " + username);
    })
}

const addMessageListener = (user: User) => {
    user.socket.on("message", (message) => {
        // verify message
        if (isUserMessageInvalid(message)) {
            return;
        }
        // Broadcast the message to all users
        broadcast("message", message);
        log(`Message: ${user.username} | ${message.message}`);
    });
}

const addDisconnectListener = (user: User) => {
    user.socket.on("disconnect", () => {
        // Remove the user from the list
        const index = users.indexOf(user);
        if (index > -1) {
            users.splice(index, 1);
        }
        // Broadcast the disconnection message
        broadcast("message", createLeaveMessage(user.username));
        log(`Disconnection: ${user.username} | ${users.length} users connected`);
    });
}

// Listen for incoming connections
io.on("connection", (socket) => {
    const user = { username: "", socket, hasJoined: false };
    listenForJoin(user);
    // Ask the user to join
    socket.emit("join");

    log(`Connecting.`);
});

log("Starting the server");

httpsServer.listen(3000, '0.0.0.0', () => {
    log("Server is listening on port 3000");
});