import { sql } from "@vercel/postgres";

const test = async () => {
  const query = sql`SELECT * FROM users`;
  console.log(query);
}

export default test;