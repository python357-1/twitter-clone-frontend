"use client";

import { Person } from "@/types";
import { useEffect, useState } from "react";
import Profile from "@/components/Profile";

export default function UserProfile({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const [user, setUser] = useState<Person | null>(null);
  useEffect(() => {
    let currentUserId = 0;
    const getProfileUser = async () => {
      const res = await fetch(`/api/users/${(await params).id}`);
      setUser(await res.json());
    };
    getProfileUser();
  }, []);
  //TODO: handle what happens if user request fails

  return user != null && <Profile user={user}></Profile>;
}
