import { Message } from "./Chat";

function ChatMessage({ messageData }: { messageData: Message }) {
  return messageData.server ? (
    <span className="message server-message">{messageData.message}</span>
  ) : (
    <span className="message">
      <strong>{messageData.author}</strong>: {messageData.message}
    </span>
  );
}

export default ChatMessage;
