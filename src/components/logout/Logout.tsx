import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "./Logout.css";

const Logout = () => {
  const { name, setName } = useContext(UserContext);
  return (
    <div className="logout">
      <h2>Bonjour {name} !</h2>
      <button onClick={() => setName("")}>Changer de nom</button>
    </div>
  );
};

export default Logout;
