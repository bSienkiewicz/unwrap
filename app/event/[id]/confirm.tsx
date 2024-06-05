"use client";
import React, { useEffect } from "react";
import { Salsa } from "next/font/google";
const salsa = Salsa({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false
});

const Confirm = (props: any) => {
  const [clicked, setClicked] = React.useState(false);
  const [preferences, setPreferences] = React.useState(
    props.participant.preferences
  );

  const handleClick = () => {
    setClicked(true);
  };

  const updatePreferences = async (id: string, preferences: string) => {
    setPreferences(preferences);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/event_assignment?unique=${props.participant.participantunique}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            preferences,
            participant_unique: props.participant.participantunique,
          }),
        }
      );
      return response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <div className="my-11">
      <h2 className="text-3xl md:text-7xl font-bold">
        {props.participant.name}
      </h2>
      {!clicked && (
        <>
          <h4 className="text-xl md:text-3xl mt-4 font-bold">is that you?</h4>
          <button
            className="bg-orange-550 text-black h-fit py-4 px-8 rounded-full shadow-md disabled:!bg-orange-550/40 disabled:cursor-not-allowed hover:bg-orange-550/80 transition-all text-md md:text-2xl mt-8"
            onClick={handleClick}
          >
            Start the draw!
          </button>
        </>
      )}
      {clicked && (
        <div>
          <h2 className="text-3xl mt-32 font-bold">
            You are making a gift for
          </h2>
          <h2 className="text-3xl md:text-5xl font-bold text-orange-550 mt-4">
            {props.participant.assignedto}!
          </h2>

          <p className="mt-4 text-neutral-500 text-sm">
            Surprise them with a nice gift, and remember to keep it a secret!
          </p>
        </div>
      )}
    </div>
  );
};

{
  /* Messages feature WIP */
}
{
  /* <div className="mt-4">
            {props.participant.preferences ? (
              <>
                <h3 className="text-xl font-bold mt-8">His message for you:</h3>
                <p className="italic mt-2 text-neutral-400">
                  {props.participant.preferences}No siema chce fajny prezent
                  okok?
                </p>
              </>
            ) : (
              <p className="italic mt-2 text-neutral-400">
                Your friend didn't leave any message for you. Surprise them! Or check back
                later to see if they added one!
              </p>
            )}
          </div>
          
          <div className="mt-4 flex flex-col gap-4">
            <h3 className="text-xl font-bold mt-8">
              Want to update your message?
            </h3>
            <textarea
              className="border border-neutral-600 rounded-md px-3 py-2 bg-black w-full"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
            />
            <button
              className="bg-orange-550 text-black h-fit py-2 px-4 rounded-full shadow-md hover:bg-orange-600 transition-all"
              onClick={() =>
                updatePreferences(props.participant.id, preferences)
              }
            >
              Update
            </button>
          </div> */
}

export default Confirm;
