"use client";

import type { Person, Tweet } from "@/types";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import TweetComponent from "./Tweet";
import EditProfileModal from "./EditProfileModal";
import { PROFILE_PIC_ENDPOINT } from "@/constants";
import Image from "next/image";

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
    <div className="flex flex-col bg-blue-300" key={user != null ? user.Id : 1}>
      <img
        className="block w-full m-auto"
        src="https://placehold.co/1920x300"
        alt="banner"
      />
      <div className="flex flex-row justify-between ml-0 m-5 bg-blue-400 rounded-2xl p-3">
        <div>
          <div className="flex p-2 rounded-2xl">
            <Image
              src={
                PROFILE_PIC_ENDPOINT +
                `${
                  user.HasProfilePic
                    ? user.Id.toString()
                    : "twtrclone-default-prof-pic"
                }?v=${crypto.randomUUID()}`
              }
              alt="profile picture"
              width="60"
              height="60"
              className="size-[80px] m-2"
            ></Image>
            <h1 className="text-xl">{user != null && "@" + user.Username}</h1>
          </div>
          <div className="pl-4">
            <h2 className="text-lg inline whitespace-pre-wrap">
              {user != null && user.Description}
            </h2>
          </div>
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
      <div className="pr-5">
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
