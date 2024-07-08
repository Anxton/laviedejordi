import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import "./Game.css";

const Game = ({ client }: { client: Socket | null }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [guessInput, setGuessInput] = useState<string>("");
  const guessInputRef = useRef<HTMLInputElement>(null);
  const guessButtonRef = useRef<HTMLButtonElement>(null);

  const answer =
    process.env.REACT_APP_ANSWER === undefined
      ? "wawa"
      : (process.env.REACT_APP_ANSWER as string);

  // listen for guess event (in case answer is correct through chat and server sends the event)
  useEffect(() => {
    if (!client) {
      return;
    }
    // add a listener for guess event
    client.on("guess", (message: string) => {
      if (message === "correct") {
        handleWin();
      } else {
        handleLoss();
      }
    });
    return () => {
      client.off("guess");
    };
  }, [client]);

  const handleWin = () => {
    // disable
    guessInputRef.current?.setAttribute("disabled", "true");
    // set correct
    guessInputRef.current?.classList.add("correct");
    // disable button
    guessButtonRef.current?.setAttribute("disabled", "true");
    // change title
    titleRef.current!.textContent = "Bravo, tu as trouvé ! 🎉";
  };

  const handleLoss = () => {
    // restart css animation
    guessInputRef.current?.classList.remove("wrong");
    void guessInputRef.current?.offsetWidth;
    guessInputRef.current?.classList.add("wrong");
    // clear input
    setGuessInput("");
  };

  const guessHandler = () => {
    if (!guessInput) {
      return;
    }
    if (!client || client.disconnected) {
      // disconnected
      if (guessInput.toLowerCase().trim() === answer.toLowerCase().trim()) {
        handleWin();
      } else {
        handleLoss();
      }
      return;
    }
    // connected
    // send guess to server
    client.emit("guess", guessInput.toLowerCase().trim());
  };

  return (
    <div className="game">
      <h2 ref={titleRef}>Entre ton mot ici !</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          type="text"
          ref={guessInputRef}
          value={guessInput}
          onChange={(e) => setGuessInput(e.target.value)}
        />
        <br /> <br />
        <button ref={guessButtonRef} onClick={guessHandler}>
          Envoyer
        </button>
      </form>
    </div>
  );
};
export default Game;
