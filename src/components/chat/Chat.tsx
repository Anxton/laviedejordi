import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "./Chat.css";
import ChatMessage from "./ChatMessage";
function Chat({ username }: { username: string }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: "Jordi1",
      message: "Hello",
    },
    {
      id: 2,
      author: "Jordi2",
      message:
        "Les chaussettes de l'archiduchesse sont-elles sèches, archi-sèches ?",
    },
    {
      id: 3,
      author: "Jordi3",
      message: "hydroxypropylméthylcelluloses",
    },
    {
      id: 4,
      author: "Jordi4",
      message:
        "invraisemblablement, les hydroxypropylméthylcelluloses sont hydrophobes, mais les hydroxyéthylcelluloses sont hydrophiles, c'est incroyable !",
    },
    {
      id: 5,
      author: "Jordi5",
      message: "C'est incroyable !",
    },
  ]);

  useEffect(() => {
    // scroll to bottom
    const messagesDiv = document.querySelector(".messages");
    if (messagesDiv) {
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  }, [messages]);

  function randomId() {
    return Math.floor(Math.random() * 1000000);
  }

  function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newMessage = {
      id: randomId(),
      author: username,
      message: formData.get("message") as string,
    };
    // optimistically add the message
    setMessages([...messages, newMessage]);
    // clear the input
    const input = event.currentTarget.querySelector("input");
    if (input) {
      input.value = "";
    }
    // send the message to the server using websockets
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
