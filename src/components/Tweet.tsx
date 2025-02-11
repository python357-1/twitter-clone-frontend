import type { Tweet } from "@/types";
import getTimeSinceTweeted from "@/utils/getTimeSinceTweeted";
import Image from "next/image";
import { PROFILE_PIC_ENDPOINT } from "@/constants";

export default function Tweet({ tweet }: { tweet: Tweet }) {
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
        <div key={"tweet data"}>likes, retweets, etc</div>
      </div>
    </div>
  );
}
