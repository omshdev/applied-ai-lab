import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { JsonOutputParser, parsePartialJson, StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate,PromptTemplate} from "@langchain/core/prompts";

import dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
    apiKey : process.env.GOOGLE_API_KEY!,
    model : "gemini-2.0-flash",
    temperature : 0
});


const SYSTEM_TEMPLATE_1 = `Your're an Top Software Engineer. You Know Everything in Tech Like CYBER SECURITY, FULL STACK, AI , RUST , LangChain, Low Level Stuff. User Will Give you {topic} you have to return info in json like key value pair!.\n also user will give you {format_instruction} you need to return response based on format_instructions `

const template1 = ChatPromptTemplate.fromMessages([
    ["system",SYSTEM_TEMPLATE_1],["user","{topic}"]
]);


const json_parser = new JsonOutputParser();

(async function init(){

    const chain1 = template1.pipe(model).pipe(json_parser);
    
    const response = await chain1.invoke({
        topic : "what is WebRTC ? ", 
        format_instruction : json_parser.getFormatInstructions()
    })
    console.log(response);
    
}())