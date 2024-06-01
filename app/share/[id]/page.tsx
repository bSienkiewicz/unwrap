import React from "react";
import Participants from "@/components/Participants";

const fetchData = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/event?event=${id}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    // TODO: Error with passing the data to server. Fix it.
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const SharePage = async ({ params }: { params: { id: string } }) => {
  const data = await fetchData(params.id);
  const participants = data.eventParticipants.rows;
  const details = data.eventDetails.rows[0];
  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="my-11">
        <h1 className="text-3xl font-bold text-center">
          Share the links with your friends!
        </h1>
        <h1 className="text-2xl mt-12 font-bold">{details.name}</h1>
        {details.description && (
          <p className="italic text-neutral-600">{details.description}</p>
        )}
      </div>

      <p className="mb-3">Click your friend's name to copy his unique link:</p>
      <div className="flex flex-col gap-3">
          <Participants participants={participants} />
      </div>
    </div>
  );
};

export default SharePage;
