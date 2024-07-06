import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Chat from "../chat/Chat";
import Game from "../game/Game";
import NameForm from "../nameform/NameForm";
import "./Content.css";

const Content = () => {
  const { name, setName } = useContext(UserContext);
  return (
    <div className="content">
      {!name ? (
        // no name
        <NameForm setName={setName} />
      ) : (
        // name is set
        <>
          <Game />
          <Chat username={name} />
        </>
      )}
    </div>
  );
};

export default Content;
