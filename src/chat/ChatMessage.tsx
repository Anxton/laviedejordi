function ChatMessage({
  nickname,
  message,
}: {
  nickname: string;
  message: string;
}) {
  return (
    <div className="message">
      <strong>{nickname}</strong>: {message}
    </div>
  );
}

export default ChatMessage;
