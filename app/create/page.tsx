"use client";
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation'

const page = () => {
  const [eventName, setEventName] = React.useState<string>("");
  const [eventDescription, setEventDescription] = React.useState<string>("");
  const [eventParticipants, setEventParticipants] = React.useState<string[]>([]);
  const [newParticipant, setNewParticipant] = React.useState<string>("");
  const participantRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter()

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

  const handleEventNameChange = (e: string) => {
    setEventName(e);
    updateLocalStorage(e, eventDescription, eventParticipants);
  };

  const handleEventDescriptionChange = (e: string) => {
    setEventDescription(e);
    updateLocalStorage(eventName, e, eventParticipants);
  };

  const handleAddParticipant = (e: string) => {
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

  const handleSubmit = async() => {
    const data = { eventName, eventDescription, eventParticipants };
    try {

      const response = await fetch("/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        if (typeof window !== "undefined") localStorage.removeItem("event");
        router.push(`/share/${result._id}`);
        
      } else {
        const result = await response.json();
        console.log(result);
      }
    } catch (error) {
      // Handle network error
    }
  };

  return (
    <main className="w-svw h-svh flex justify-center items-center bg-white">
      <div className="flex flex-col text-black gap-3">
        <label htmlFor="eventName">Event Name</label>
        <input
          type="text"
          className="border border-black"
          value={eventName}
          onChange={(e) => handleEventNameChange(e.target.value)}
        />
        <label htmlFor="eventDescription">Event Description</label>
        <textarea
          rows={6}
          className="border border-black"
          value={eventDescription}
          onChange={(e) => handleEventDescriptionChange(e.target.value)}
        />
        <label htmlFor="eventParticipants">Participants</label>
        <div className="flex gap-2">
          <input
            ref={participantRef}
            type="text"
            className="border border-black"
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
          />
          <button
            type="button"
            className="bg-teal-500 text-black mt-4"
            onClick={() => {
              handleAddParticipant(newParticipant);
              if (participantRef.current) participantRef.current.focus(); //refocus on input
            }}
          >
            Add Participant
          </button>
        </div>
        {eventParticipants && (
          <div className="flex flex-wrap">
            {eventParticipants.map((participant, index) => (
              <div
                key={index}
                className="bg-red-400 text-white p-2 rounded-lg"
                onClick={() => handleRemoveParticipant(index)}
              >
                {participant}
              </div>
            ))}
          </div>
        )}
        <button className="bg-teal-500 text-black mt-4" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </main>
  );
};

export default page;
