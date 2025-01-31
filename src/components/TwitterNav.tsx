import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBell, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export enum HighlightUrl {
  Home,
  Notifications,
  Messages,
}

export default function TwitterNav({
  className,
  highlight,
}: {
  className?: string | undefined;
  highlight?: HighlightUrl | undefined;
}) {
  return (
    <div className={className + " w-64 p-7"}>
      <ul className="text-2xl mx-2">
        <li className="mb-4 mx-2">
          <FontAwesomeIcon icon={faTwitter} className="fa-xl" />
        </li>
        <li className="mb-3 mx-2">
          <FontAwesomeIcon icon={faHouse} className="mr-2" />
          <Link
            href="/"
            className={
              "" +
              (highlight == HighlightUrl.Home
                ? "text-blue-500 font-bold"
                : undefined)
            }
          >
            Home
          </Link>
        </li>
        <li className="mb-3 mx-2">
          <FontAwesomeIcon icon={faBell} className="mr-2" />
          <Link
            href="/notifications"
            className={
              "" +
              (highlight == HighlightUrl.Notifications
                ? "text-blue-500 font-bold"
                : undefined)
            }
          >
            Notification
          </Link>
        </li>
        <li className="mb-3 mx-2">
          <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
          <Link
            href="/messages"
            className={
              "" +
              (highlight == HighlightUrl.Messages
                ? "text-blue-500 font-bold"
                : undefined)
            }
          >
            Messages
          </Link>
        </li>
        <li>
          <Link
            href="/login"
            className="bg-blue-600 rounded-3xl w-full inline-block text-center"
          >
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
}
