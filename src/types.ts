export interface Tweet {
  Id: number;
  AuthorId: number;
  RetweetedTweetId: number;
  RetweetedTweet: Tweet;
  Body: string;
  Tweeted: string; // ISO 8601 formatted date string
  HasProfilePic: boolean;
  AuthorUsername: string;
  Liked: boolean;
  Likes: number;
  Retweeted: boolean;
  Retweets: number;
}

export interface Person {
  Id: number;
  Username: string;
  Email: string;
  Tweets: Tweet[];
  Description: string;
  HasProfilePic: boolean;
}

export interface TimelineUpdate {
  Tweets: Tweet[];
  NextStartingDate: string;
}
