import { defineConfig } from "drizzle-kit";
import postgres from "postgres";
import "dotenv/config";

export default defineConfig({
  // 1. Specify the dialect used (you are using postgresql)
  dialect: "postgresql",

  // 2. Specify the path to your Drizzle schema files
  schema: "./src/lib/db/schema/resources.ts", // Adjust this if your schema file is elsewhere

  // 3. Specify the folder where Drizzle-Kit should output the migrations
  out: "./src//lib/db/migrations",

  // If you are using Drizzle Kit push or check commands, you'll need the DB connection string here
  dbCredentials: {
    // Drizzle-Kit uses the environment variable DATABASE_URL for migrations,
    // but if you want to use 'drizzle-kit push', you must define a connection string.
    // It's often safer to use an environment variable here.

    directUrl: process.envDIRECT_URL,
    url: process.env.DATABASE_URL,
  },
});
