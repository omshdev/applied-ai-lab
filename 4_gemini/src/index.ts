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
// we understand system_prompt here you gave examples in system_prompt.
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
console.log("FSP",answerFewShotPrompting);