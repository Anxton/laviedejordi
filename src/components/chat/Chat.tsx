import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "./Chat.css";
import ChatMessage from "./ChatMessage";
function Chat({ username }: { username: string }) {
  const [messages, setMessages] = useState([
    {
      author: "Jordi1",
      message: "Hello",
    },
    {
      author: "Jordi2",
      message:
        "Les chaussettes de l'archiduchesse sont-elles sèches, archi-sèches ?",
    },
    {
      author: "Jordi3",
      message: "hydroxypropylméthylcelluloses",
    },
    {
      author: "Jordi4",
      message:
        "invraisemblablement, les hydroxypropylméthylcelluloses sont hydrophobes, mais les hydroxyéthylcelluloses sont hydrophiles, c'est incroyable !",
    },
    {
      author: "Jordi5",
      message: "C'est incroyable !",
    },
  ]);

  useEffect(() => {
    // scroll to bottom
    const messagesDiv = document.querySelector(".messages");
    messagesDiv!.scrollTo({
      top: messagesDiv!.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newMessage = {
      author: username,
      message: formData.get("message") as string,
    };
    // optimistically add the message
    setMessages([...messages, newMessage]);
    // clear the input
    const input = event.currentTarget.querySelector("input");
    input!.value = "";
    // send the message to the server using websocket
  }

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            username={message.author}
            message={message.message}
          />
        ))}
      </div>
      <form onSubmit={sendMessage} className="send">
        <input type="text" name="message" />
        <button>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}

export default Chat;
