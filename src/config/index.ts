import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT,
  openaiKey: process.env.OPENAI_API_KEY!,
  qdrantUrl: process.env.QDRANT_URL!,
  qdrantKey: process.env.QDRANT_API_KEY!,
};