"use client";

import { Person } from "@/types";
import Tweet from "@/components/Tweet";
import { useState, useEffect } from "react";

export default function Profile() {
  const [person, setPerson] = useState<Person>();
  const getUserAndTweets = async () => {
    const res = await fetch("/api/tweets/me", {
      method: "GET",
    });
    const user: Person = await res.json();
    setPerson(user);
  };

  useEffect(() => {
    getUserAndTweets();
  }, []);

  return (
    <div className="flex flex-col" key={person != null ? person.Id : 1}>
      <img
        className="block w-full m-auto"
        src="https://placehold.co/1920x300"
        alt="banner"
      />
      <h1 className="text-xl">{person != null && "@" + person.Username}</h1>
      {person != null && person.Tweets.length > 0 ? (
        person.Tweets.map((x) => <Tweet tweet={x} key={x.Id}></Tweet>)
      ) : (
        <p></p>
      )}
    </div>
  );
}
