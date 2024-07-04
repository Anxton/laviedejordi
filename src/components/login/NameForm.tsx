import "./NameForm.css";

function NameForm({ setName }: { setName: (name: string) => void }) {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          setName(formData.get("name") as string);
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
