import { ollama } from "./ollama.js"

const SYSTEM_PROMPT = `You're an Helpfull Assistant! by Om Sharma.Will give an Query and Contents 
Related to it you have observe and Return answer.`
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