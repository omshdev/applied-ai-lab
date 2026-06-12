import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({apiKey : process.env.GOOGLE_GEMINI_API_KEY!});

async function modelResponse(prompt : string,SYSTEM_PROMPT:any){
  const response = await ai.models.generateContentStream({
      model : "gemini-2.5-flash",
      contents : [prompt], // always user's prompt
      config : {  // the config section where you provide system prompt.
        systemInstruction : SYSTEM_PROMPT
      }
    });

    let str = "";
    for await (const chunk of response){
      // @ts-ignore
      // process.stdout.write(chunk.text);
      str+=chunk.text;
    }
    return str;
}
// prompting techniques.

// 1.zero shot prompting : where you cannot give any examples or instruction just stratight forward prompts and the model
// will response based on your prompts , it's pretrained data based on that it will give you answer....
async function zeroShotPrompting(prompt : string){
    const response = await modelResponse(prompt,"");
    return response;
}
const answerZeroShotPrompting = await zeroShotPrompting("Translate to French: Hello, how are you?"); // here we didn't gave any example just raw question..
// console.log("ZSP",answerZeroShotPrompting);

// 2. Few Shot Prompting : where you give few examples before asking actual questions and here where
// we understand system_prompt here you gave examples in system_prompt. real world usage : Classification : Data extraction,Labeling, Formatting;
// .ex let's take 
// sentimental analysis. 
// Text: I love this product.
// Sentiment: Positive

// Text: Worst experience ever.
// Sentiment: Negative

// Text: Delivery was fast and packaging was good.
// Sentiment:

async function fewShotPrompting(prompt:string){
  const SYSTEM_PROMPT =  `sentimental analysis. 
    Text: I love this product.
    Sentiment: Positive

    Text: Worst experience ever.
    Sentiment: Negative
  `

  const response = await modelResponse(prompt,SYSTEM_PROMPT);
  return response;
}

const answerFewShotPrompting = await fewShotPrompting("Text: Delivery was fast and packaging was good. Sentiment:");
// console.log("FSP",answerFewShotPrompting);

// 3. Role Prompting/Personas : Here you assign a role , ex : `You are a senior backend engineer.`,`Act as a cybersecurity consultant.` , by giving role for prompting the model will perform better.
// example i ask query like redis so it will give response like generic response but if we give it a role 
// your'e an great You are a distributed systems architect. Explain Redis.the response will be More architecture-focused so this is importance of role or persona promting stuff.

async function roleOrPersonaPrompting(prompt:string){
  const SYSTEM_PROMPT =  `You are a distributed systems architect`
  const response = await modelResponse(prompt,SYSTEM_PROMPT);
  return response;
}

const answerRoleOrPersonalPrompting = await roleOrPersonaPrompting("Explain Redis? ");
console.log("Without role : 🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡")
console.log("Without Role ",answerRoleOrPersonalPrompting);
console.log("With Role💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀")
console.log("With Role💀💀💀💀💀💀💀💀💀💀💀💀",answerRoleOrPersonalPrompting);

// logs : ◇ injected env (1) from .env // tip: ◈ secrets for agents [www.dotenvx.com]
// Without role : 🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡
// Without Role  Alright, let's break down Redis from a distributed systems architect's perspective. It's much more than just a cache; it's a versatile tool that can play many roles in a complex system.

// ---

// ## Redis: The Swiss Army Knife of In-Memory Data Management

// At its core, **Redis (Remote Dictionary Server)** is an open-source, in-memory data structure store that can be used as a database, cache, and message broker. It's renowned for its blazing fast performance, rich set of data structures, and robust feature set for high availability and distributed scaling.

// ### Key Characteristics & Architectural Differentiators:

// 1.  **In-Memory Operation (Primary Store):**
//     *   **Performance:** This is Redis's biggest advantage. By operating primarily on data in RAM, it achieves incredibly low latency (sub-millisecond) and high throughput (hundreds of thousands of op 