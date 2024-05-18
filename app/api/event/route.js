import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb.ts";

function generateRandomIdPart() {
  let idPart = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 6; i++) {
    idPart += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return idPart;
}

function shuffleParticipants(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function GET(request) {
  let isConnected;
  let client;

  try {
    client = await clientPromise;
    isConnected = true;
  } catch (err) {
    isConnected = false;
    return NextResponse.json({ error: err });
  }

  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "No event ID provided" });
  }
  
  const db = client.db("base");
  const collection = db.collection("events");
  const objectId = ObjectId.createFromHexString(id);

  const event = await collection.findOne({ _id: objectId });
  console.log(event)

  if (!event) {
    return NextResponse.json({ error: "Event not found" });
  }

  return NextResponse.json(event);
}

export async function POST(request) {
  let isConnected;
  let client;

  const data = await request.json();
  console.log(data);

  try {
    client = await clientPromise;
    isConnected = true;
  } catch (err) {
    isConnected = false;
    return NextResponse.json({ error: err });
  }
  const db = client.db("base");
  const collection = db.collection("events");

  const participants = data.eventParticipants.map((name) => ({
    id: `${generateRandomIdPart()}-${generateRandomIdPart()}-${generateRandomIdPart()}-${generateRandomIdPart()}`,
    name: name,
    drew: false,
  }));

  const shuffledParticipants = shuffleParticipants([...participants]);

  const newEvent = {
    name: data.eventName,
    description: data.eventDescription,
    dateCreated: new Date(),
    participants: participants.map((participant, index) => ({
      ...participant,
      assigned:
        shuffledParticipants[(index + 1) % shuffledParticipants.length].name,
    })),
  };

  await collection.insertOne(newEvent);
  const insertedDocument = await collection.findOne({ _id: newEvent._id });
  return NextResponse.json(insertedDocument);
}
