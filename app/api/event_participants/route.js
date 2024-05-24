import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const eventUnique = searchParams.get("event");
  const eventParticipants =
    await sql`SELECT * FROM Participants WHERE eventunique = ${eventUnique}`;
  return NextResponse.json({ eventParticipants });
}
