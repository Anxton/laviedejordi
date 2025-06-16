import { readFileSync } from "fs";
import { createServer } from "https";
import { Server, Socket } from "socket.io";

// Only load .env when not running inside Docker
if (!process.env.IN_DOCKER) {
    import('dotenv').then(dotenv => {
        dotenv.config({ path: ".env.development" });
        console.log('✅ Loaded local environment from dotenv');
    });
} else {
    console.log('🚀 Running in Docker — skipping dotenv');
}

const MAX_MESSAGE_LENGTH = 100; // Define the maximum message length
const MAX_HISTORY_LENGTH = 100; // Define the maximum history length
const gameAnswer = process.env.VITE_ANSWER || "wawa";

let options = {};

if (process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH) {
    options = {
        key: readFileSync(process.env.SSL_KEY_PATH),
        cert: readFileSync(process.env.SSL_CERT_PATH),
    };
    console.log('✅ SSL enabled');
} else {
    console.log('❌ SSL not enabled');
}
const server = createServer(options);

const io = new Server(server, {
    cors: {
        origin: process.env.VITE_URL,
    }
});

type Message = {
    author: string;
    message: string;
    server?: boolean;
    join?: string;
    leave?: string;
    win?: string;
}

type User = {
    username: string;
    hasJoined: boolean;
    hasWon: boolean;
    socket: Socket;
}

const createServerMessage = (message: string): Message => {
    return {
        "author": "Server",
        "message": message,
        "server": true,
    }
};

const createWinMessage = (username: string): Message => {
    return {
        "author": "Server",
        "message": " a trouvé le mot !",
        "server": true,
        "win": username,
    }
}

const createJoinMessage = (username: string): Message => {
    return {
        "author": "Server",
        "message": " a rejoint le chat",
        "server": true,
        "join": username,
    }
};

const createLeaveMessage = (username: string): Message => {
    return {
        "author": "Server",
        "message": " a quitté le chat",
        "server": true,
        "leave": username,
    }
}

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

const addMessageListener = (user: User) => {
    user.socket.on("message", (message: Message) => {
        // verify message
        if (isUserMessageInvalid(message)) {
            return;
        }
        if (message.message.toLowerCase().trim() === gameAnswer && !user.hasWon) {
            user.hasWon = true;
            user.socket.emit("guess", "correct");
            broadcast("message", createWinMessage(user.username));
            return;
        }
        if (message.message === "/clear") {
            messageHistory.length = 0;
            io.emit("history", messageHistory);
            log(`Clear: ${user.username}`);
            return;
        }
        if (message.message === "/who") {
            const usernames = users.map(user => user.username);
            user.socket.emit("message", createServerMessage(`Utilisateurs connectés: ${usernames.join(", ")}`));
            log(`Users: ${user.username}`);
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

const addGuessListener = (user: User) => {
    user.socket.on("guess", (guess: string) => {
        if (!user.hasWon && guess === gameAnswer) {
            user.hasWon = true;
            user.socket.emit("guess", "correct");
            broadcast("message", createWinMessage(user.username));
        } else {
            user.socket.emit("guess", "incorrect");
        }
        log(`Guess: ${user.username} | ${guess}`);
    });
}

const listenForJoin = (user: User) => {
    user.socket.on("join", (username: string) => {
        // If user has already joined, ignore
        if (user.hasJoined) {
            return;
        }
        // If username is invalid, ignore
        if (username.trim() === "") {
            return;
        }
        // Set username and add user to connected users
        user.username = username;
        user.hasJoined = true;
        users.push(user);
        // Add event listeners for user
        addMessageListener(user);
        addGuessListener(user);
        addDisconnectListener(user);
        // Send message history to user
        user.socket.emit("history", messageHistory);
        // Broadcast join message
        broadcast("message", createJoinMessage(username));
        log("Join: " + username);
    })
}

// Listen for incoming connections
io.on("connection", (socket: Socket) => {
    const user: User = { username: "", hasJoined: false, hasWon: false, socket };
    listenForJoin(user);
    log(`Connecting.`);
});

log("Starting the server");

server.listen(parseInt(process.env.VITE_BACKEND_PORT || "3000"), '0.0.0.0', () => {
    log(`Server is listening on port ${process.env.VITE_BACKEND_PORT}`);
});