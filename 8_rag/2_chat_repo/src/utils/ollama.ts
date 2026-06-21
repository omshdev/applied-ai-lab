import { Ollama } from "ollama";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.OLLAMA_API_KEY!);

// For Cloud Ollama Use
export const ollama = new Ollama({
    host : "https://ollama.com",
    headers : {
        Authorization: "Bearer " + process.env.OLLAMA_API_KEY!,
    }
});

// For Local Ollama Use
export const embeddingOllama = new Ollama({
    host : "http://localhost:11434",
});