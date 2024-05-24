import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const response = await sql`ALTER TABLE Participants
    DROP COLUMN eventid`;

    const check =
      await sql`SELECT * FROM pg_catalog.pg_tables WHERE tablename = 'Events'`;
    return NextResponse.json({ response, check });
  } catch (error) {
    console.error("Error dropping table:", error);
    return NextResponse.json({ Error: error });
  }
}