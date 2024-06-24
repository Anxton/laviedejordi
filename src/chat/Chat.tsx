import "./Chat.css";
import ChatMessage from "./ChatMessage";
function Chat() {
  const messages = [
    {
      id: 1,
      nickname: "Jordi1",
      message: "1",
    },
    {
      id: 2,
      nickname: "Jordi2",
      message: "2",
    },
    {
      id: 3,
      nickname: "Jordi3",
      message: "3",
    },
    {
      id: 4,
      nickname: "Jordi4",
      message: "4",
    },
    {
      id: 5,
      nickname: "Jordi5",
      message: "5",
    },
  ];

  return (
    <div className="chat">
      <h2>Chat</h2>
      <div className="messages">
        {messages.map((message) => (
          <ChatMessage nickname={message.nickname} message={message.message} />
        ))}
      </div>
      <form>
        <input type="text" name="message" />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default Chat;
