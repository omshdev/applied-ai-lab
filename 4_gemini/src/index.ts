import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({apiKey : process.env.GOOGLE_GEMINI_API_KEY!});

async function main(){
    const response = await ai.models.generateContent({
        model : "gemini-3.5-flash",
        contents : " Who is Andrej Karpathy..",
    });

    console.log(response.text);
}

main();