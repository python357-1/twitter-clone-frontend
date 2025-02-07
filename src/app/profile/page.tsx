"use client";

import { Person } from "@/types";
import ProfileComponent from "@/components/Profile";
import { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState<Person | null>(null);
  useEffect(() => {
    const getPerson = async () => {
      const res = await fetch("/api/users/me", {
        method: "GET",
      });
      setUser(await res.json());
    };
    getPerson();
  }, []);

  return user != null && <ProfileComponent user={user}></ProfileComponent>;
}
