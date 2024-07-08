import { ChangeEvent, FormEvent, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "./NameForm.css";

export const NameForm = () => {
  const { setUsername } = useContext(UserContext);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (formData.get("name") === null) {
      return;
    }
    const name = formData.get("name") as string;
    if (name.trim() === "") {
      return;
    }
    setUsername(name.trim());
  };

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
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

  return (
    <>
      <form onSubmit={handleFormSubmit}>
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
};

export default NameForm;
