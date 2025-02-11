"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBell,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import TweetModal from "./TweetModal";
import { usePathname } from "next/navigation";

export default function TwitterNav({
  className,
}: {
  className?: string | undefined;
}) {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  return (
    <div className={className + " w-72 p-7 bg-blue-300"}>
      <ul className="text-2xl mx-2">
        <li className="mb-4 mx-2">
          <FontAwesomeIcon icon={faTwitter} className="fa-xl" />
        </li>
        <li className="mb-3 mx-2">
          <Link
            href="/"
            className={
              "" + (pathname == "/" ? "text-white font-bold" : undefined)
            }
          >
            <FontAwesomeIcon icon={faHouse} className="mr-2" />
            Home
          </Link>
        </li>
        <li className="mb-3 mx-2">
          <Link
            href="/notifications"
            className={
              "" +
              (pathname.startsWith("/notifications")
                ? "text-white font-bold"
                : undefined)
            }
          >
            <FontAwesomeIcon icon={faBell} className="mr-2" />
            Notifications
          </Link>
        </li>
        <li className="mb-3 mx-2">
          <Link
            href="/messages"
            className={
              "" +
              (pathname.startsWith("/messages")
                ? "text-white font-bold"
                : undefined)
            }
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            Messages
          </Link>
        </li>
        {isAuthenticated && (
          <li className="mb-3 mx-2">
            <Link
              href="/profile"
              className={
                "" +
                (pathname.startsWith("/profile")
                  ? "text-white font-bold"
                  : undefined)
              }
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Profile
            </Link>
          </li>
        )}
        <li>
          {isAuthenticated == null || isAuthenticated == false ? (
            <Link
              href="/login"
              className="bg-blue-600 rounded-3xl w-full inline-block text-center"
            >
              Login
            </Link>
          ) : (
            <TweetModal />
          )}
        </li>
      </ul>
    </div>
  );
}
