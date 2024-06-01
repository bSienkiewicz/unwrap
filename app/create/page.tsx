"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { truncate } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faPlus, faTimes, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const page = () => {
  const [eventName, setEventName] = React.useState<string>("");
  const [eventDescription, setEventDescription] = React.useState<string>("");
  const [eventParticipants, setEventParticipants] = React.useState<string[]>(
    []
  );
  const [newParticipant, setNewParticipant] = React.useState<string>("");
  const participantRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();
  const submitButton = React.useRef<HTMLButtonElement>(null);

  const updateLocalStorage = (
    newName: string,
    newDescription: string,
    newParticipants: string[]
  ) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "event",
        JSON.stringify({
          name: newName,
          description: newDescription,
          participants: newParticipants,
        })
      );
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let event = localStorage.getItem("event");
      try {
        if (event) {
          const eventData = JSON.parse(event);
          setEventName(eventData.name);
          setEventDescription(eventData.description);
          setEventParticipants(eventData.participants || []);
        } else {
          setEventParticipants([]);
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        setEventParticipants([]);
      }
    }
  }, []);

  useEffect(() => {
    if (eventParticipants.length >= 3 && eventName !== "") {
      if (submitButton.current) submitButton.current.disabled = false;
    } else {
      if (submitButton.current) submitButton.current.disabled = true;
    }
  }, [eventParticipants, eventName]);

  const handleEventNameChange = (e: string) => {
    setEventName(e);
    updateLocalStorage(e, eventDescription, eventParticipants);
  };

  const handleEventDescriptionChange = (e: string) => {
    setEventDescription(e);
    updateLocalStorage(eventName, e, eventParticipants);
  };

  const handleAddParticipant = (e: string) => {
    if (e.length < 2) return;
    const newParticipants = [...eventParticipants, e];
    setEventParticipants(newParticipants);
    updateLocalStorage(eventName, eventDescription, newParticipants);
    setNewParticipant("");
  };

  const handleRemoveParticipant = (index: number) => {
    const newParticipants = eventParticipants.filter((_, i) => i !== index);
    setEventParticipants(newParticipants);
    updateLocalStorage(eventName, eventDescription, newParticipants);
  };

  const handleSubmit = async () => {
    const data = { eventName, eventDescription, eventParticipants };
    if (eventParticipants.length < 3 || eventName === "") return;

    if (submitButton.current) submitButton.current.disabled = true;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/hello`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        const eventID = result.event.rows[0].eventunique;
        console.log(result);
        if (typeof window !== "undefined") localStorage.removeItem("event");
        if (eventID) {
          router.push(`/share/${eventID}`);
        } else {
          console.error("Error creating event:", result.error);
          // TODO: Handle error
        }
      } else {
        const result = await response.json();
        console.log(result);
      }
    } catch (error) {
      // TODO: Handle error
    }
  };

  return (
    <div className="w-full overflow-auto py-8 max-w-[1200px] mx-auto">
      <h3 className="text-2xl mb-4 overflow-auto">Create a new event</h3>
      <div className="">
        <div className="flex flex-col gap-3">
          <label htmlFor="eventName">Event Name</label>
          <input
            type="text"
            className="border border-neutral-600 rounded-md px-3 py-2 bg-black placeholder:opacity-50"
            value={eventName}
            id="eventName"
            placeholder="Great corporate gift-giving"
            maxLength={30}
            onChange={(e) => handleEventNameChange(e.target.value)}
          />
          <label htmlFor="eventDescription">Event Description</label>
          <textarea
            rows={6}
            className="border border-neutral-600 rounded-md px-3 py-2 bg-black placeholder:opacity-50"
            value={eventDescription}
            id="eventDescription"
            placeholder="The theme of this year's event - holidays"
            maxLength={200}
            onChange={(e) => handleEventDescriptionChange(e.target.value)}
          />
          <label htmlFor="eventParticipants">Participants</label>
          <div className="flex gap-2 items-center">
            <input
              ref={participantRef}
              type="text"
              id="eventParticipants"
              className="border border-neutral-600 rounded-md px-3 py-2 bg-black flex-1 placeholder:opacity-50"
              value={newParticipant}
              placeholder="John"
              maxLength={50}
              onChange={(e) => setNewParticipant(e.target.value)}
            />
            <button
              type="button"
              className="bg-orange-550 text-black h-fit py-2 px-2 rounded-md shadow-md hover:bg-orange-600 transition-all"
              onClick={() => {
                handleAddParticipant(newParticipant);
                if (participantRef.current) participantRef.current.focus(); //refocus on input
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          {eventParticipants && (
            <div className="flex flex-wrap gap-3">
              {eventParticipants.map((participant, index) => (
                <div
                  key={index}
                  className="border-orange-550 text-white border p-2 rounded-full flex items-center gap-2 cursor-pointer text-xs"
                  onClick={() => handleRemoveParticipant(index)}
                >
                  {truncate(participant, 30)}
                  <FontAwesomeIcon icon={faTimesCircle} className="text-lg" />
                </div>
              ))}
            </div>
          )}
          <button
            className="bg-orange-550 text-black h-fit py-2 px-2 rounded-full shadow-md disabled:!bg-orange-550/40 disabled:cursor-not-allowed hover:bg-orange-550/80 transition-all text-2xl mt-8"
            onClick={handleSubmit}
            ref={submitButton}
          >Create an event
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
