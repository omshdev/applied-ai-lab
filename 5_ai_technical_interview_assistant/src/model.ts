import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey : process.env.GOOGLE_GEMINI_API_KEY!});

export async function runModel(prompt : string,SYSTEM_PROMPT : string){
    const response = await ai.models.generateContentStream({
        model : "gemini-3.5-flash",
        contents : [prompt],
        config : {
            systemInstruction : SYSTEM_PROMPT
        }
    });

    let str = "";
    for await (const chunk of response){
       str+=chunk.text
    }
    return str;
};