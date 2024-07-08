import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "./Logout.css";

const Logout = () => {
  const { username, setUsername } = useContext(UserContext);
  return (
    <div className="logout">
      <h2>Bonjour {username} !</h2>
      <button onClick={() => setUsername("")}>Changer de nom</button>
    </div>
  );
};

export default Logout;
