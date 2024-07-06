import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "./Images.css";

const Images = () => {
  const { name } = useContext(UserContext);
  const jordiClass = `img-jordi pixelart ${name ? "img-top" : "img-bottom"}`;
  const jordetteClass = `img-jordette pixelart ${
    name ? "img-top" : "img-bottom"
  }`;
  return (
    <>
      <img className={jordetteClass} src="jordette.png" alt="jordette" />
      <img className={jordiClass} src="jordi.png" alt="jordi" />
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
