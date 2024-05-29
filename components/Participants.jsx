"use client";
import { truncate } from "@/lib/functions";
import React, { useEffect, useState } from "react";

const Participants = (props) => {
  const [shared, setShared] = useState([]);

  const handleParticipantClicked = (participantUnique) => {
    setShared([...shared, participantUnique]);

    const url = `${process.env.NEXT_PUBLIC_URL}/event/${participantUnique}`;
    navigator.clipboard.writeText(url);
    console.log("URL copied to clipboard");
  };

  const isShared = (participantUnique) => {
    return shared.includes(participantUnique);
  }

  return (
    <>
      {Object.values(props.participants).map((participant, index) => (
        <div
          className={`${isShared(participant.participantunique) && "bg-neutral-800"} border-neutral-600 rounded-md border px-3 py-1 text-xl cursor-pointer shadow-md hover:shadow-lg transition-all flex items-center gap-5`}
          onClick={() =>
            handleParticipantClicked(participant.participantunique)
          }
          key={index}
        >
          <p className="flex-1">{truncate(participant.name, 30)}</p>
          <div
            className={`h-2 w-2 ${
              participant.drew ? "bg-green-500" : "bg-red-500"
            } rounded-full`}
          ></div>
          {!shared.includes(participant.participantunique) ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentcolor"
                d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"
              />
            </svg>
          ) : (
            <p className="text-xs">Copied!</p>)}
        </div>
      ))}
    </>
  );
};

export default Participants;
