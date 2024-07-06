import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Chat from "../chat/Chat";
import Game from "../game/Game";
import NameForm from "../login/NameForm";
import "./Content.css";

const Content = () => {
  const { name, setName } = useContext(UserContext);
  const jordiClass = `img-jordi pixelart ${name ? "img-top" : "img-bottom"}`;
  const jordetteClass = `img-jordette ${name ? "img-top" : "img-bottom"}`;
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
      <div className="img-container">
        <img className={jordetteClass} src="jordette.png" alt="jordette" />
        <img className={jordiClass} src="jordi.png" alt="jordi" />
      </div>
    </div>
  );
};

export default Content;
