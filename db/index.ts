import "server-only";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "@/db/schema";

const globalForDb = globalThis as unknown as { mysqlPool?: mysql.Pool };

function createPool() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured.");
  return mysql.createPool({ uri: process.env.DATABASE_URL, waitForConnections: true, connectionLimit: 10, maxIdle: 10, idleTimeout: 60_000, enableKeepAlive: true, keepAliveInitialDelay: 0 });
}

export const pool = globalForDb.mysqlPool ?? createPool();
if (process.env.NODE_ENV !== "production") globalForDb.mysqlPool = pool;
export const db = drizzle(pool, { schema, mode: "default" });
