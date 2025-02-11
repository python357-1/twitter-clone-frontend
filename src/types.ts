export interface Tweet {
  Id: number;
  AuthorId: number;
  RetweetedTweetId: number;
  Body: string;
  Tweeted: string; // ISO 8601 formatted date string
  HasProfilePic: boolean;
  AuthorUsername: string;
}

export interface Person {
  Id: number;
  Username: string;
  Email: string;
  Tweets: Tweet[];
  Description: string;
}

export interface TimelineUpdate {
  Tweets: Tweet[];
  NextStartingDate: string;
}
