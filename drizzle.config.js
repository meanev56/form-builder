import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://emekanjoku86:xUWIkf9rF1Oh@ep-odd-mouse-02284549.eu-central-1.aws.neon.tech/form-builder?sslmode=require'
  }
});