import type { Tweet } from "@/types";
import getTimeSinceTweeted from "@/utils/getTimeSinceTweeted";

export default function Tweet({ tweet }: { tweet: Tweet }) {
  return (
    <div className="mb-4">
      <div className="flex flex-col">
        <div className="flex flex-row" key={"tweet body"}>
          <div>
            <img src="https://placehold.co/80x80" alt="profile picture" />
          </div>
          <div className="flex flex-col">
            <div className="block">{getTimeSinceTweeted(tweet)}</div>
            <div>{tweet.Body}</div>
          </div>
        </div>
        <div key={"tweet data"}>likes, retweets, etc</div>
      </div>
    </div>
  );
}
