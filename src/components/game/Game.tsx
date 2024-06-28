function Game() {
  return (
    <div>
      <h2>Game</h2>
      <p>Game content</p>
      <form onSubmit={guessHandler}>
        <input type="text" id="guess" name="guess" />
        <br /> <br />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

function guessHandler(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  console.log(formData.get("guess"));
}

export default Game;
