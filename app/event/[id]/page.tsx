import React from "react";

const fetchData = async (id: string) => {
  try {
    console.log(id);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/event_assignment?unique=${id}`,
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/event_assignment?unique=${id}`,
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
  console.log(participant);

  return (
    <div className="">
      <div>name:{participant.name}</div>
      <div>assigned_to: {participant.assignedto}</div>
      <div>event: {participant.drew.toString()}</div>
      <div>preferences: {participant.preferences}</div>
    </div>
  );
};

export default page;
