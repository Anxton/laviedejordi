function ChatMessage({
  username,
  message,
}: {
  username: string;
  message: string;
}) {
  return (
    <span className="message">
      <strong>{username}</strong>: {message}
    </span>
  );
}

export default ChatMessage;
