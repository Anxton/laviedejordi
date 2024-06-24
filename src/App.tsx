import { useState } from "react";
import "./App.css";
import Game from "./Game";
import NameForm from "./NameForm";
import Chat from "./chat/Chat";
import "./index.css";

function App() {
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

export default App;
