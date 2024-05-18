import React from "react";

const fetchData = async (id: string) => {
  try {
    console.log(id)
    const response = await fetch(`/api/event`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const SharePage = async ({ params }: { params: { id: string } }) => {
  const data = await fetchData(params.id);
  console.log(data);

  return (
    <div>XD</div>
  )
}

export default SharePage
