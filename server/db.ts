import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import dotenv from "dotenv";

// Load environment variables from .env file BEFORE accessing them
dotenv.config();

neonConfig.webSocketConstructor = ws;

// In production exe builds, run without database
const isProductionExe = process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL;

if (!process.env.DATABASE_URL && !isProductionExe) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = isProductionExe ? null : new Pool({ connectionString: process.env.DATABASE_URL });
export const db = isProductionExe ? null : drizzle({ client: pool, schema });