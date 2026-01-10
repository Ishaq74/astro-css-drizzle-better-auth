import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDrizzle } from "@database/drizzle";

export async function getAuth() {
  const db = await getDrizzle();
  return betterAuth({
    database: drizzleAdapter(db, { provider: "pg" }),
  });
}

// Instance pour le CLI (sync, sans await)
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "@database/schemas";
import { drizzleAdapter as drizzleAdapterSync } from "better-auth/adapters/drizzle";

const url = process.env.DATABASE_URL
  || (process.env.USE_PROD_DB === 'true'
    ? process.env.DATABASE_URL_PROD
    : process.env.DATABASE_URL_LOCAL);

let auth;
if (url) {
  const client = new Client({ connectionString: url });
  // On ne connecte pas, juste pour le CLI
  const db = drizzle(client, { schema });
  auth = betterAuth({
    database: drizzleAdapterSync(db, { provider: "pg" }),
  });
}

export { auth };
export default auth;