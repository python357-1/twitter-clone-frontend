import type { Tweet } from "@/types";
import getTimeSinceTweeted from "@/utils/getTimeSinceTweeted";
import Image from "next/image";
import { PROFILE_PIC_ENDPOINT } from "@/constants";

export default function Tweet({ tweet }: { tweet: Tweet }) {
  return (
    <div className="mb-4 hover:bg-slate-600 bg-slate-700 p-3 rounded-xl">
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
              className="mr-5"
              alt="profile picture"
              width="60"
              height="60"
            />
          </div>
          <div className="flex flex-col">
            <div>@{tweet.AuthorUsername}</div>
            <div className="block text-sm text-gray-500">
              {getTimeSinceTweeted(tweet)}
            </div>
            <div className="text-white">{tweet.Body}</div>
          </div>
        </div>
        <div key={"tweet data"}>likes, retweets, etc</div>
      </div>
    </div>
  );
}
