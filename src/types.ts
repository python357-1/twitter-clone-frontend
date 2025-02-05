import { UUID } from "crypto";

export interface Tweet {
  Id: number;
  AuthorId: number;
  RetweetedTweetId: number;
  Body: string;
}

export interface Person {
  Id: number;
  Username: string;
  Email: string;
  Tweets: Tweet[];
}
