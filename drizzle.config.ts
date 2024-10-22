import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({
  path: ".env.local",
});

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./lib/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // url: import.meta.env.VITE_POSTGRES_URL!,
    url: process.env.VITE_POSTGRES_URL!,
  },
});
