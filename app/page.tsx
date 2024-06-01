"use client";
import Image from "next/image";
import { eventNames } from "process";
import { useState } from "react";
import Input from "@/components/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [eventName, setEventName] = useState("");

  const handleEventNameChange = (e: string) => {
    setEventName(e);

    if (typeof window !== "undefined") {
      localStorage.setItem("event", JSON.stringify({ name: e }));
    }
  };

  return (
    <div className="flex w-full h-full p-12">
      <div className="flex justify-center w-full mt-20">
        <div className="flex flex-col gap-5 text-4xl md:text-8xl">
          <h2 className="font-bold">ORGANIZE</h2>
          <h2 className="font-bold">YOUR SECRET SANTA</h2>
          <div className="flex items-center justify-between">
            <a
              href="/create"
              className="bg-orange-550 text-black rounded-full text-nowrap px-10 py-3 text-xl"
            >
              <FontAwesomeIcon icon={faArrowUp} className="mr-5 rotate-[135deg]" /> Start new event
            </a>
            <h2 className="font-bold">WITH EASE</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
