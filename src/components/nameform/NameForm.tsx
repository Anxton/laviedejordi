import "./NameForm.css";

function NameForm({ setName }: { setName: (name: string) => void }) {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          if (formData.get("name") === null) {
            return;
          }
          const name = formData.get("name") as string;
          if (name.trim() === "") {
            return;
          }
          setName(name);
        }}
      >
        <h2>
          <label htmlFor="name">Quel est ton nom ?</label>
        </h2>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          onChange={nameChangeHandler}
        />
        <br /> <br />
        <button type="submit">Envoyer</button>
      </form>
    </>
  );
}

const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  const name = event.target.value;
  if (name.trim() === "") {
    event.target.setCustomValidity("Le nom ne peut pas être vide");
  } else {
    event.target.setCustomValidity("");
  }
  if (name.length > 20) {
    event.target.value = name.slice(0, 20);
  }
};

export default NameForm;
