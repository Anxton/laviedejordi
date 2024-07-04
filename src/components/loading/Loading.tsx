import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Loading.css";

const Loading = () => {
  return <FontAwesomeIcon className="spinner" icon={faSpinner} spin />;
};

export default Loading;
