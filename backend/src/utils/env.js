import { config } from "dotenv";

config({ path: ".env" });

export const {
  PORT,
  MONGO_URI,
  NODE_ENV,
  BASE_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  COOKIE_NAME,
  CSRF_COOKIE_NAME,
  CSRF_HEADER_NAME,
  FRONTEND_ORIGIN,
  GEMINI_API_KEY,
  GEMINI_MODEL,
  GEMINI_MAX_TOKENS,
} = process.env;
