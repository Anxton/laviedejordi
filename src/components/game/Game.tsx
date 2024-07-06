function Game() {
  return (
    <div>
      <h2>Entre ton mot ici !</h2>
      <form onSubmit={guessHandler}>
        <input
          type="text"
          id="guess"
          name="guess"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <br /> <br />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
const answer = "42";
function guessHandler(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  if (formData.get("guess") === null) {
    return;
  }
  const guess = formData.get("guess") as string;
  console.log(guess);
  // send the guess to the server
  // client.emit("guess", guess);
  if (guess === answer) {
    alert("You win!");
  } else {
    alert("Try again!");
  }
}

export default Game;
