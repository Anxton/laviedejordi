import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { UserContext } from "../../context/UserContext";
import "./Chat.css";
import ChatMessage from "./ChatMessage";

export type Message = {
  author: string;
  message: string;
  server?: boolean;
  join?: string;
  leave?: string;
  win?: string;
};

function Chat({ client }: { client: Socket | null }) {
  const { username } = useContext(UserContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  const showServerOffline = () => {
    setMessages(() => [
      {
        author: "Client",
        message: "Le serveur est actuellement hors ligne... 🛌",
        server: true,
      },
    ]);
  };

  // setup the client
  useEffect(() => {
    if (!client) {
      console.log("Client is null");
      return;
    }
    console.log("Client is not null");

    const joinChat = () => {
      console.log("Join chat");
      client.emit("join", username);
    };

    // listen for the history from the server
    client.on("history", (history: Message[]) => {
      console.log("Received the history from the server");
      setMessages(history);
    });

    // listen for messages from the server
    client.on("message", (message: Message) => {
      console.log("Received a message from the server");
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    const reconnectListener = () => {
      joinChat();
    };
    // handle reconnection
    client.on("connect", reconnectListener);

    const disconnectListener = () => {
      showServerOffline();
    };
    // handle disconnection
    client.on("disconnect", disconnectListener);

    // join the chat
    joinChat();

    // cleanup function
    return () => {
      client.off("message");
      client.off("history");
      client.off("connect", reconnectListener);
      client.off("disconnect", disconnectListener);
      console.log("Disconnected from the server");
    };
  }, [client, username]);

  // scroll to bottom when messages change
  useEffect(() => {
    const messagesDiv = document.querySelector(".message-container");
    messagesDiv!.scrollTo({
      top: messagesDiv!.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const chatSubmitHandler = () => {
    if (!client || client.disconnected || !inputValue.trim()) {
      return;
    }
    // send the message to the server using socket.io
    client.emit("message", {
      author: username,
      message: inputValue.trim(),
    });
    // clear the input
    setInputValue("");
  };

  const chatHandleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    // limit to 100 characters
    if (newText.length > 100) {
      return;
    }
    setInputValue(newText);
  };

  return (
    <div className="chat">
      <div className="message-container">
        {messages.map((message, index) => (
          <ChatMessage key={index} messageData={message} />
        ))}
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="send">
        <input
          placeholder="Tapez un message..."
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          type="text"
          value={inputValue}
          onChange={chatHandleInput}
        />
        <button onClick={chatSubmitHandler}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}

export default Chat;
