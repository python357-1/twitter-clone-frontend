"use client";

import { Person } from "@/types";
import { useState } from "react";
import Timeline from "@/components/Timeline";

export default function Home() {
  const [users, setUsers] = useState<Person[] | null>([]);
  const onInputHandler = async (query: string) => {
    if (query == "") {
      setUsers([]);
      return;
    }
    const users = await (
      await fetch(`/api/users?query=${query}`, {
        method: "GET",
      })
    ).json();
    setUsers(users);
  };
  return (
    <div className="flex w-screen">
      <div className="basis-4/5">
        <Timeline></Timeline>
      </div>
      <div className="basis-1/5">
        <div id={"search-dropdown"}>
          <input
            className={
              "block mx-auto px-3 mt-4 py-2 text-lg text-black w-2/3 " +
              (users?.length ?? 0 > 1 ? "rounded-t-3xl" : "rounded-3xl")
            }
            type="text"
            placeholder="Search for users"
            onChange={(e) => onInputHandler(e.target.value)}
          />
          <ul
            className={
              "relative bg-slate-800 rounded-b-3xl w-2/3 mx-auto overflow-hidden py-2  " +
              (users?.length ?? 0 == 0 ? "" : "hidden")
            }
          >
            {users != null &&
              users.length > 0 &&
              users.map((x) => {
                return (
                  <a key={x.Id} href={`/users/${x.Id}`}>
                    <li className="bg-slate-800 px-10 hover:bg-slate-600 hover:rounded-full mx-1">
                      <img
                        src="https://placehold.co/40x40"
                        alt={`${x.Username}'s profile picture`}
                        className="inline"
                      />
                      <div className="inline ms-2">{x.Username}</div>
                    </li>
                  </a>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
