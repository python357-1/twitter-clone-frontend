"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

export default function TweetModal() {
  let [isOpen, setIsOpen] = useState(false);
  let [tweetText, setTweetText] = useState("");

  const handleTweet = () => {
    fetch("/api/tweets/", {
      method: "POST",
      body: new URLSearchParams({
        tweetText,
      }),
    });
    setIsOpen(false);
    setTweetText("");
  };

  return (
    <>
      <Link
        href="#"
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 rounded-3xl w-full inline-block text-center"
      >
        Tweet
      </Link>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setTweetText("");
        }}
        className="relative z-50 w-xl"
      >
        <DialogPanel>
          <DialogBackdrop className="fixed inset-0 bg-black/70" />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="w-fit space-y-4 border bg-zinc-900 p-12">
              <DialogTitle className="font-bold">New Tweet</DialogTitle>
              <div className="relative">
                <textarea
                  onInput={(e) => setTweetText(e.currentTarget.value)}
                  placeholder="What are you thinking?"
                  maxLength={280}
                  className={`p-5 rounded-xl bg-zinc-800 resize-none border-4 ${
                    tweetText.length < 281
                      ? "border-zinc-800"
                      : "border-red-600"
                  }`}
                ></textarea>
                <span
                  className={`absolute bottom-2 right-2 text-sm ${
                    tweetText.length > 250
                      ? tweetText.length > 270
                        ? "text-red-600"
                        : "text-yellow-500"
                      : ""
                  }`}
                >
                  {tweetText.length}/280
                </span>
              </div>
              <div className="flex gap-4">
                <button
                  className="rounded-full bg-blue-600 px-2"
                  onClick={handleTweet}
                >
                  Tweet
                </button>
                <button
                  className="rounded-full bg-white px-2 text-black"
                  onClick={() => {
                    setIsOpen(false);
                    setTweetText("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}
