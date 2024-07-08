import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "./Images.css";

const Images = () => {
  const { username: isLoggedIn } = useContext(UserContext);
  const jordiClasses = classNames(
    "img-jordi",
    "pixelart",
    { "img-top": isLoggedIn },
    { "img-bottom": !isLoggedIn }
  );
  const jordetteClasses = classNames(
    "img-jordette",
    "pixelart",
    { "img-top": isLoggedIn },
    { "img-bottom": !isLoggedIn }
  );
  return (
    <>
      <img className={jordetteClasses} src="jordette.png" alt="jordette" />
      <img className={jordiClasses} src="jordi.png" alt="jordi" />
      <a
        href="https://github.com/Anxton/laviedejordi"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faGithub} className="img-github" />
      </a>
    </>
  );
};

export default Images;
