"use client";
import { truncate } from "@/lib/utils";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Participants = (props) => {
  const [shared, setShared] = useState([]);

  const handleParticipantClicked = (participantUnique) => {
    setShared([...shared, participantUnique]);

    try {
      const url = `${process.env.NEXT_PUBLIC_URL}/event/${participantUnique}`;
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      toast.error("Error copying to clipboard");
    }
  };

  const isShared = (participantUnique) => {
    return shared.includes(participantUnique);
  };

  return (
    <>
      {Object.values(props.participants).map((participant, index) => (
        <div
          className={`${
            isShared(participant.participantunique) && "bg-neutral-800"
          } border-neutral-600 rounded-md border px-3 py-1 text-xl cursor-pointer shadow-md hover:shadow-lg transition-all flex items-center gap-5`}
          onClick={() =>
            handleParticipantClicked(participant.participantunique)
          }
          key={index}
        >
          <p
            className={`flex-1 ${
              participant.drew && "text-neutral-500 flex items-center"
            }`}
          >
            {truncate(participant.name, 30)}
            {participant.drew && (
              <span className="text-xs">&nbsp;- opened</span>
            )}
          </p>
          {!shared.includes(participant.participantunique) ? (
            <FontAwesomeIcon icon={faShare} className="text-neutral-500" />
          ) : (
            <p className="text-xs">Copied!</p>
          )}
          <div
            className={`h-2 w-2 ${
              participant.drew ? "bg-white" : "bg-black border border-white"
            } rounded-full`}
          ></div>
        </div>
      ))}
    </>
  );
};

export default Participants;
