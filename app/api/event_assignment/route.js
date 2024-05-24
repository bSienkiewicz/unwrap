import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const participant_unique = searchParams.get("unique");

  try {
    const response = await sql`
      UPDATE Participants 
      SET drew = TRUE 
      WHERE participantunique = ${participant_unique} 
      RETURNING *`;
      
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error getting participant:", error);
    return NextResponse.json({ Error: error });
  }
}

export async function PUT(request) {
  const data = await request.json();
  console.log(data);

  const participant_unique = data.participant_unique;
  const preferences = data.preferences;

  try {
    const response = await sql`
      UPDATE Participants 
      SET preferences = ${preferences} 
      WHERE participantunique = ${participant_unique} 
      RETURNING *`;
      
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error updating participant:", error);
    return NextResponse.json({ Error: error });
  }
}