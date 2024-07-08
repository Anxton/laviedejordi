import classNames from "classnames";
import { Message } from "./Chat";
import "./ChatMessage.css";

const ChatMessage = ({ messageData }: { messageData: Message }) => {
  const classes = classNames(
    "message",
    { "server-message": messageData.server },
    { "join-message": messageData.join },
    { "leave-message": messageData.leave },
    { "win-message": messageData.win }
  );
  if (messageData.join) {
    return (
      <span className={classes}>
        <b>{messageData.join}</b> a rejoint le chat
      </span>
    );
  } else if (messageData.leave) {
    return (
      <span className={classes}>
        <b>{messageData.leave}</b> a quitté le chat
      </span>
    );
  } else if (messageData.win) {
    return (
      <span className={classes}>
        <b>{messageData.win}</b> a trouvé le mot !
      </span>
    );
  } else {
    return (
      <span className={classes}>
        {!messageData.server && <b>{messageData.author} : </b>}
        {messageData.message}
      </span>
    );
  }
};

export default ChatMessage;
