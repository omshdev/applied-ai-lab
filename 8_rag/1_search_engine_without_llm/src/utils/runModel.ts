import { ollama } from "./ollama.js"

export async function runModel(prompt : string){
    const response:any = await ollama.chat({ 
        model : "gpt-oss:120b",
        messages : [
            {role : "system" , content: "YOU'RE AN HELPFULL ASSISTANT OF OM SHARMA."},
            { role : "user",content : prompt}
        ]
    });
    // console.log(response);        
    return response.message.content;
}