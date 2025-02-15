import type { Tweet } from "@/types";
import getTimeSinceTweeted from "@/utils/getTimeSinceTweeted";
import Image from "next/image";
import { PROFILE_PIC_ENDPOINT } from "@/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faRetweet } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Tweet({ tweet }: { tweet: Tweet }) {
  const [likes, setLikes] = useState(tweet.Likes);
  const [isLiked, setIsLiked] = useState(tweet.Liked);

  const [retweets, setRetweets] = useState(tweet.Retweets);
  const [isRetweeted, setIsRetweeted] = useState(tweet.Retweeted);

  const handleLikeButton = async () => {
    const action = isLiked ? "DELETE" : "POST";
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + `/tweets/${tweet.Id}/like`,
      {
        method: action,
      }
    );

    switch (res.status) {
      case 200:
        const data: { Likes: number; IsLiked: boolean } = await res.json();
        console.log(data);
        setLikes(data.Likes);
        setIsLiked(data.IsLiked);
    }
  };

  const handleRetweetButton = async () => {
    const action = isRetweeted ? "DELETE" : "POST";
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + `/tweets/${tweet.Id}/retweet`,
      {
        method: action,
      }
    );

    switch (res.status) {
      case 200:
        const data: { Retweets: number; IsRetweeted: boolean } =
          await res.json();
        setRetweets(data.Retweets);
        setIsRetweeted(data.IsRetweeted);
    }
  };
  return (
    <div className="mb-4 hover:bg-blue-300 bg-blue-200 p-3 rounded-xl w-full border-4 border-blue-500">
      <div className="flex flex-col">
        <div className="flex flex-row" key={"tweet body"}>
          <div>
            <Image
              src={
                PROFILE_PIC_ENDPOINT +
                `${
                  tweet.HasProfilePic
                    ? tweet.AuthorId.toString()
                    : "twtrclone-default-prof-pic"
                }?v=${crypto.randomUUID()}`
              }
              className="mr-5 size-[80px]"
              alt="profile picture"
              width="120"
              height="120"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-gray-600">@{tweet.AuthorUsername}</div>
            <div className="block text-sm text-gray-500">
              {getTimeSinceTweeted(tweet)}
            </div>
            <div className="text-black">{tweet.Body}</div>
          </div>
        </div>
        {tweet.RetweetedTweet != null && <Tweet tweet={tweet.RetweetedTweet} />}
        <div key={"tweet data"} className="mt-2 flex flex-row">
          <div onClick={handleLikeButton}>
            <FontAwesomeIcon
              icon={faHeart}
              style={isLiked ? { color: "#e01b24" } : undefined}
              className="mr-1 text-gray-500 ml-2"
            ></FontAwesomeIcon>
            <p className="inline text-black">{likes}</p>
          </div>
          <div onClick={handleRetweetButton}>
            <FontAwesomeIcon
              icon={faRetweet}
              style={isRetweeted ? { color: "#529e7b" } : undefined}
              className="mr-1 text-gray-500 ml-2"
            ></FontAwesomeIcon>
            <p className="inline text-black">{retweets}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
