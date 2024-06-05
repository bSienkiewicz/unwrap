import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

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

function shuffleParticipants(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function POST(request) {
  const data = await request.json();

  const eventName = data.eventName;
  const eventDescription = data.eventDescription;
  const eventParticipants = data.eventParticipants;

  let event;
  let participants;

  try {
    event = await sql`CREATE TABLE IF NOT EXISTS Events (
      id SERIAL PRIMARY KEY,
      eventUnique TEXT UNIQUE,
      name TEXT,
      description TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    participants = await sql`CREATE TABLE IF NOT EXISTS Participants (
      id SERIAL PRIMARY KEY,
      name TEXT,
      eventId INT,
      eventunique TEXT,
      preferences TEXT,
      drew BOOLEAN DEFAULT FALSE,
      assignedTo TEXT DEFAULT NULL,
      participantunique TEXT UNIQUE,
      FOREIGN KEY (eventId) REFERENCES Events(id),
      FOREIGN KEY (assignedTo) REFERENCES Participants(id)
    )`;
  } catch (error) {
    console.error("Error creating table:", error);
  }

  try {
    const eventUnique = `${generateRandomIdPart()}-${generateRandomIdPart()}-${generateRandomIdPart()}`;
    const event =
      await sql`INSERT INTO Events (name, description, eventUnique) VALUES (${eventName}, ${eventDescription}, ${eventUnique}) RETURNING *`;

    const shuffledParticipants = shuffleParticipants([...eventParticipants]);

    const participants = await Promise.all(
      shuffledParticipants.map(async (name, index) => {
        const assignedTo =
          shuffledParticipants[(index + 1) % shuffledParticipants.length];
        const participantunique = `u_${generateRandomIdPart()}-${generateRandomIdPart()}-${generateRandomIdPart()}`;
        return await sql`INSERT INTO Participants (name, eventunique, assignedTo, participantunique) VALUES (${name}, ${event.rows[0].eventunique}, ${assignedTo}, ${participantunique}) RETURNING *`;
      })
    );

    return NextResponse.json({ event, participants });
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.json({ error });
  }
}
