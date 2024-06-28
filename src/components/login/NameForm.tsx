import "../../App.css";
import "./NameForm.css";

function NameForm({
  handleSubmit,
}: {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <h2>
          <label htmlFor="name">Quel est ton nom ?</label>
        </h2>
        <input type="text" id="name" name="name" />
        <br /> <br />
        <button type="submit">Envoyer</button>
      </form>
    </>
  );
}

export default NameForm;
