import { useState } from "react";
import Game from "../game/Game";
import NameForm from "../login/NameForm";
import Chat from "../chat/Chat";
import "./Root.css";
import "../../index.css";

function Root() {
  const [name, setName] = useState("");
  return (
    <>
      <h1 className="logo">LA VIE DE JORDI</h1>

      <div className="content">
        {!name ? (
          // no name
          <NameForm
            handleSubmit={(e) => {
              const formData = new FormData(e.currentTarget);
              setName(formData.get("name") as string);
            }}
          />
        ) : (
          // name is set
          <>
            <div>
              <h2>Bonjour {name} !</h2>
              <button onClick={() => setName("")}>Changer de nom</button>
            </div>
            <Game />
            <Chat username={name} />
          </>
        )}
      </div>
    </>
  );
}

export default Root;
