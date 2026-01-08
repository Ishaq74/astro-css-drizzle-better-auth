// src/lib/database/drizzle.ts
import { config } from 'dotenv';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Client, Pool, type PoolClient } from 'pg';
import * as schema from './schemas';

config();

const url = process.env.DATABASE_URL
  || (process.env.USE_PROD_DB === 'true'
    ? process.env.DATABASE_URL_PROD
    : process.env.DATABASE_URL_LOCAL);

if (!url) throw new Error('DATABASE_URL manquant');

type DrizzleDB = NodePgDatabase<typeof schema>;

// 👇 Cette fonction est INDISPENSABLE pour ton script "npm run db:migrate"
export function getPgClient() {
  return new Client({
    connectionString: url,
    ssl: url && url.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
  });
}

let cachedDrizzle: DrizzleDB | null = null;
let connecting: Promise<DrizzleDB> | null = null;

export async function getDrizzle(): Promise<DrizzleDB> {
  if (cachedDrizzle) return cachedDrizzle;
  if (connecting) return connecting;

  connecting = (async () => {
    const pool = new Pool({
      connectionString: url,
      ssl: url && url.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
      max: 5,
      idleTimeoutMillis: 10000,
    });

    try {
      const client: PoolClient = await Promise.race([
        pool.connect(),
        new Promise<PoolClient>((_, reject) => setTimeout(() => reject(new Error('Timeout PG')), 5000)),
      ]);
      client.release();

      cachedDrizzle = drizzle(pool, { schema }) as DrizzleDB;
      return cachedDrizzle;
    } catch (e) {
      connecting = null;
      throw e;
    }
  })();

  try {
    return await connecting;
  } catch (e) {
    connecting = null;
    throw e;
  }
}