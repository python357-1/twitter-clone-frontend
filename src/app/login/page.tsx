"use client";

import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { checkAuth } = useAuth();

  const loginHandler = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
        }).toString(),
      }
    );

    checkAuth();
    switch (res.status) {
      case 200:
        redirect("/");
        break;
      case 401:
      case 404:
        // i hate these error messages but they are best practice
        // https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-and-error-messages
        toast.error("User not found or invalid password.");
        break;
      default:
        console.error(
          "Something unexpected happened. Failing request is below"
        );
        toast.error("Unknown error");
        break;
    }
  };

  return (
    <div className="w-1/4 mx-auto mt-10">
      <FontAwesomeIcon
        icon={faTwitter}
        className="fa-4x mb-5"
      ></FontAwesomeIcon>
      <h1 className="text-3xl font-bold mb-16">Log in to Twitter (clone)</h1>

      <input
        className="block rounded-full w-full mb-5 text-xl py-2 px-10 text-slate-900"
        placeholder="Username or email"
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="block rounded-full w-full text-xl py-2 px-10 text-slate-900"
        placeholder="Password"
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <a
        className="block text-center font-black rounded-full w-full text-xl py-2 px-10 mt-20 bg-blue-600 cursor-pointer"
        onClick={loginHandler}
      >
        Log in
      </a>
      <Link
        className="block text-center font-black rounded-full w-full text-xl py-2 px-10 mt-5 bg-slate-200 text-black cursor-pointer"
        href="/register"
      >
        Don&apos;t have an account yet? Register now!
      </Link>
    </div>
  );
}
