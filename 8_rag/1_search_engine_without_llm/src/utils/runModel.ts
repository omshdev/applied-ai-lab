import { Ollama } from "ollama";
import dotenv from "dotenv";

dotenv.config();

export const ollama = new Ollama({
    host:"https://ollama.com",
    headers : {
        Authorization: "Bearer " + process.env.OLLAMA_API_KEY,
    }
});

export async function runModel(prompt : string){
    const response:any = await ollama.chat({ 
        model : "nomic-embed-text",
        messages : [
            { role : "user",content : "Convert to embedding..."}
        ]
    });
    let finalEmbeddings = '';
    for await (const chunk of response){
        finalEmbeddings+=chunk.message.content;
    }
    console.log("Final EMbeeding",finalEmbeddings);
    return finalEmbeddings;

}