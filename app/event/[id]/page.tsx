import React from "react";
import Confirm from "./confirm";

const fetchData = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/event_assignment?unique=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
    // TODO: Handle error
  }
};

const updatePreferences = async (id: string, preferences: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/event_assignment?unique=${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ preferences }),
      }
    );
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const page = async ({ params }: { params: { id: string } }) => {
  const data = await fetchData(params.id);
  const participant = data.response.rows[0];

  return (
    <div className="w-full text-center max-w-[1200px] mx-auto">
      <Confirm participant={participant} />
    </div>
  );
};

export default page;
