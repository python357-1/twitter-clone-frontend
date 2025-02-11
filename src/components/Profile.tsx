"use client";

import type { Person, Tweet } from "@/types";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import TweetComponent from "./Tweet";
import EditProfileModal from "./EditProfileModal";

export default function Profile({ user }: { user: Person }) {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [ownProfile, setOwnProfile] = useState<boolean>(false);
  const [showProfilePicModal, setShowProfilePicModal] = useState(false);

  useEffect(() => {
    const getCurrentUserId = async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/users/me"
      );
      const currentUserId = ((await res.json()) as Person).Id;
      if (currentUserId == (user?.Id ?? 0)) {
        setOwnProfile(true);
      }
    };
    const fetchTweets = async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + `/tweets?by=${user.Id}`,
        {
          method: "GET",
        }
      );
      switch (res.status) {
        case 200:
          setTweets(await res.json());
          break;

        default:
          toast.error(await res.text());
      }
    };
    fetchTweets();
    getCurrentUserId();
  }, []);

  const followHandler = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/follows", {
      method: "POST",
      body: new URLSearchParams(`userid=${user.Id}`),
    });
    switch (res.status) {
      //TODO: handle fail
      default:
        console.error("fuck");
        toast.error("fuck");
        break;
    }
  };

  return (
    <div className="flex flex-col" key={user != null ? user.Id : 1}>
      <img
        className="block w-full m-auto"
        src="https://placehold.co/1920x300"
        alt="banner"
      />
      <div className="flex flex-row justify-between mt-5">
        <div>
          <h1 className="text-xl">{user != null && "@" + user.Username}</h1>
          <h2 className="text-lg inline whitespace-pre-wrap">
            {user != null && user.Description}
          </h2>
        </div>
        {ownProfile ? (
          <>
            <button
              className="w-30 bg-slate-500 rounded-full p-2 inline h-9 mr-10"
              onClick={() => setShowProfilePicModal(true)}
            >
              Edit Profile
            </button>
            <EditProfileModal
              user={user}
              isOpen={showProfilePicModal}
              setIsOpen={setShowProfilePicModal}
            ></EditProfileModal>
          </>
        ) : (
          <button onClick={followHandler}>Follow</button>
        )}
      </div>
      <div className="w-1/4">
        {user != null && tweets && tweets.length > 0 ? (
          tweets.map((x) => (
            <TweetComponent tweet={x} key={x.Id}></TweetComponent>
          ))
        ) : (
          <p>No tweets yet.</p>
        )}
      </div>
    </div>
  );
}
