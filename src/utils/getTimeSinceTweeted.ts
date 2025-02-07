import { Tweet } from "@/types";

export default function getTimeSinceTweeted(tweet: Tweet): string {
  const dayLengthInMillis = 86400000;
  const hourLengthInMillis = 3600000;
  const minuteLengthInMillis = 60000;
  const timeSinceTweet = Date.now() - new Date(tweet.Tweeted).getTime();
  if (timeSinceTweet < dayLengthInMillis) {
    if (timeSinceTweet < hourLengthInMillis) {
      const minutesSinceTweet = Math.round(
        timeSinceTweet / minuteLengthInMillis
      );
      return `${minutesSinceTweet} ${
        minutesSinceTweet == 1 ? "minute" : "minutes"
      } ago`;
    }
    const hoursSinceTweet = Math.round(timeSinceTweet / hourLengthInMillis);
    return `${hoursSinceTweet} ${hoursSinceTweet == 1 ? "hour" : "hours"} ago`;
  }
  const daysSinceTweet = timeSinceTweet / dayLengthInMillis;
  return `${daysSinceTweet} ${daysSinceTweet == 1 ? "day" : "days"} ago`;
}
