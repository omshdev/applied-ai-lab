import { ollama } from "./ollama.js"

const SYSTEM_PROMPT = ``
export async function runModel(prompt : string){
    const response:any = await ollama.chat({ 
        model : "gpt-oss:120b",
        messages : [
            {role : "system" , content: SYSTEM_PROMPT},
            { role : "user",content : prompt}
        ]
    });
    // console.log(response);        
    return response.message.content;
}