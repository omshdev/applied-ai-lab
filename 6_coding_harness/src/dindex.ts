import { Ollama } from "ollama";

const ollama = new Ollama();
async function runModel(){
    console.log("Function Called...!");
    const response = await ollama.chat({
        model : "qwen3",
        messages : [{role : "system",content:"Answer briefly. Do not think step-by-step. Give direct answers."},{role : "user",content:"Why is sky blur"}],
        stream : true,
    });
    
    let message = "";
    console.log("Before Message : ",message)
    for await (const part of response){
        message+=part.message.content;
    };
    console.log("Final Message : ",message)
};

runModel();