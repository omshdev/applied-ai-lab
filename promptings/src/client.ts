import { Together } from "together-ai";
import dotenv from "dotenv";

dotenv.config();

export const together = new Together({apiKey : process.env.OPENAI_KEY});


