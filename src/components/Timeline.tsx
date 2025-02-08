"use client";

import { useEffect, useState } from "react";
import { Tweet, TimelineUpdate } from "@/types";
import { toast } from "react-toastify";
import TweetComponent from "@/components/Tweet";

export default function Timeline() {
  const [currentStartingDate, setCurrentStartingDate] = useState("");
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const getMoreTweets = async () => {
    const res = await fetch(
      `/api/timeline${
        currentStartingDate != "" ? "startingDate=" + currentStartingDate : ""
      }`
    );

    switch (res.status) {
      case 200:
        const newTweets: TimelineUpdate = await res.json();
        console.log({ newTweets });
        setTweets(tweets.concat(newTweets.Tweets));
        console.log({ tweets, newTweets: newTweets });
        setCurrentStartingDate(newTweets.NextStartingDate);
        break;
    }
  };

  useEffect(() => {
    const target = document.querySelector("#endOfPage");
    if (target == null) {
      toast.error("Could not find infinite scroll element.");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            getMoreTweets();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
  }, []);

  return (
    <>
      <ul>
        {tweets.length > 0 &&
          tweets.map((x) => (
            <TweetComponent tweet={x} key={x.Id}></TweetComponent>
          ))}
      </ul>
      <span id="endOfPage"></span>
    </>
  );
}
