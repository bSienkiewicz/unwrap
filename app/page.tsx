"use client";
import Image from "next/image";
import { eventNames } from "process";
import { useState } from "react";

export default function Home() {
  const [eventName, setEventName] = useState("");

  const handleEventNameChange = (e: string) => {
    setEventName(e);
  
    if (typeof window !== "undefined") {
      localStorage.setItem("event", JSON.stringify({ name: e }));
    }
  }

  return (
    <main className="w-svw h-svh flex justify-center items-center">
      <input
        type="text"
        value={eventName}
        onChange={(e) => handleEventNameChange(e.target.value)}
      />
      <a href="/create" className="text-black">
        <button type="submit" className="bg-teal-500 text-black mt-4">
          Submit
        </button>
      </a>
    </main>
  );
}
