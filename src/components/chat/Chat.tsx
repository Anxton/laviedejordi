import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import "./Chat.css";
import ChatMessage from "./ChatMessage";

export type Message = {
  author: string;
  message: string;
  server?: boolean;
};

function Chat({ username }: { username: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      author: "Test",
      message: "Hello",
    },
  ]);

  const [client, setClient] = useState<Socket | null>(null);

  useEffect(() => {
    console.log("Connecting to the server");

    // connect to the server using socket.io
    setClient(() => io("https://laviedejordi.me:3000"));
    // the effect should only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (client === null) {
      console.log("Client is null");
      return;
    }
    console.log("Client is not null");

    // listen for the join event from the server
    client.on("join", () => {
      console.log("Sending a join message to the server");
      client.emit("join", username);
    });

    // listen for messages from the server
    client.on("message", (message) => {
      console.log("Received a message from the server");
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // listen for the history from the server
    client.on("history", (history) => {
      console.log("Received the history from the server");
      console.log(history);
      setMessages(history);
    });
    // cleanup function
    return () => {
      client.disconnect();
      console.log("Disconnected from the server");
    };
  }, [username, client]);

  useEffect(() => {
    // scroll to bottom
    const messagesDiv = document.querySelector(".message-container");
    messagesDiv!.scrollTo({
      top: messagesDiv!.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    if (client === null) {
      return;
    }
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const text = formData.get("message") as string;
    if (text.trim() === "") {
      return;
    }
    const newMessage = {
      author: username,
      message: text,
    };
    // clear the input
    const input = event.currentTarget.querySelector("input");
    input!.value = "";
    // send the message to the server using socket.io
    client.emit("message", newMessage);
  }

  return (
    <div className="chat">
      <div className="message-container">
        {client === null && <span>Connecting to the server...</span>}
        {messages.map((message, index) => (
          <ChatMessage key={index} messageData={message} />
        ))}
      </div>
      <form onSubmit={sendMessage} className="send">
        <input type="text" name="message" onChange={handleInput} />
        <button>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}

const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.value.length > 100) {
    event.target.value = event.target.value.slice(0, 100);
  }
};

export default Chat;
