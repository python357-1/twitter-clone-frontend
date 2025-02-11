"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import Link from "next/link";
import { ErrorResponse, ErrorType } from "@/ResponseTypes";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

export default function Register() {
  const { checkAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [usernameProblem, setUsernameProblem] = useState(false);
  const [emailProblem, setEmailProblem] = useState(false);

  const registrationHandler = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
          email,
        }).toString(),
      }
    );

    switch (res.status) {
      case 200:
        checkAuth();
        //TODO: redirect to profile screen or timeline or something
        break;

      case 400:
        const body: ErrorResponse = await res.json();
        console.log(body);

        for (const error of body.types) {
          if (error == ErrorType.emailInvalid) {
            setEmailProblem(true);
            toast.error("Email is not valid");
          }
          if (error == ErrorType.emailInUse) {
            setEmailProblem(true);
            toast.error("Email in use");
          }
          if (error == ErrorType.usernameInUse) {
            setUsernameProblem(true);
            toast.error("Username in use");
          }
        }
        break;
    }
  };

  return (
    <div className="w-1/4 mx-auto mt-10">
      <FontAwesomeIcon
        icon={faTwitter}
        className="fa-4x mb-5"
      ></FontAwesomeIcon>
      <h1 className="text-3xl font-bold mb-16">Create new account</h1>

      <input
        className={`block rounded-full w-full mb-5 text-xl py-2 px-10 text-slate-900 border-4 ${
          usernameProblem ? "border-red-500" : "border-slate-50"
        }`}
        placeholder="Username"
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setUsernameProblem(false);
        }}
      />

      <input
        className={`block rounded-full w-full mb-5 text-xl py-2 px-10 text-slate-900 border-4 ${
          emailProblem ? "border-red-500" : "border-slate-50"
        }`}
        placeholder="Email"
        type="text"
        id="email"
        name="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailProblem(false);
        }}
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
        onClick={registrationHandler}
      >
        Register
      </a>
      <Link
        className="block text-center font-black rounded-full w-full text-xl py-2 px-10 mt-5 bg-slate-200 text-black cursor-pointer"
        href="/login"
      >
        Already have an account?
      </Link>
    </div>
  );
}
