import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Messages() {
  return (
    <div>
      <h1 className="inline text-2xl font-bold">Messages</h1>
      <FontAwesomeIcon icon={faEnvelopeOpenText} className={"float-end"} />
    </div>
  );
}
