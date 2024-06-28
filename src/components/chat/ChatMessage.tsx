function ChatMessage({
  username,
  message,
}: {
  username: string;
  message: string;
}) {
  return (
    <div className="message">
      <strong>{username}</strong>: {message}
    </div>
  );
}

export default ChatMessage;
