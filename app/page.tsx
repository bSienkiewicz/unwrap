"use client";
import Image from "next/image";
import { eventNames } from "process";
import { useState } from "react";
import Input from "@/components/input";

export default function Home() {
  const [eventName, setEventName] = useState("");

  const handleEventNameChange = (e: string) => {
    setEventName(e);

    if (typeof window !== "undefined") {
      localStorage.setItem("event", JSON.stringify({ name: e }));
    }
  };

  return (
    <div className="flex w-full h-full items-end p-12">
      <div className="flex justify-center items-center w-full">
        {/* <h1 className="text-6xl font-bold">ORGANIZE <span className="text-red-900">SECRET SANTA</span> WITH EASE</h1>
        <a
          href="/create"
          className="bg-black text-white rounded-full text-nowrap text-xl px-3 py-1 "
        >
          Start new event
        </a> */}
        <a
          href="/create"
          className="bg-black text-white rounded-full text-nowrap text-xl px-3 py-1 "
        >
          Start new event
        </a>
      </div>
    </div>
  );
}
