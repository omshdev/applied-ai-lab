import { Ollama } from "ollama";
import dotenv from "dotenv";
import { SYSTEM_PROMPT } from "./system_prompt.js";

dotenv.config();

const ollama = new Ollama({
  host: "https://ollama.com",
  headers: {
    Authorization: "Bearer " + process.env.OLLAMA_API_KEY,
  },
});

export async function runModel(prompt : string){
    const response = await ollama.chat({
            model: "gpt-oss:120b",
            messages: [
                {role:"system",content : SYSTEM_PROMPT},
                {role: "user", content: prompt } 
            ],
            stream: true,
    });

    let result = "";

    for await (const part of response) {
        // process.stdout.write(part.message.content);
        result+=part.message.content;
    }

    return result;
}


