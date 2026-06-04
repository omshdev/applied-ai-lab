import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers"


import dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
    apiKey : process.env.GOOGLE_API_KEY!,
    model : "gemini-2.0-flash",
    temperature : 0
});

const SYSTEM_PROMPT = "Your'e an Cricket Expert Having the Knowledge of All Cricket from Old to New , You Know About All Cricketers,Their Records and Stuff."

const template = ChatPromptTemplate.fromMessages([
    ["system",SYSTEM_PROMPT] , ["user","{query}"]
]);

const parser = new StringOutputParser();

(async function init(){
    const chain1 = template.pipe(model).pipe(parser);  // --> Creating Chain : promptTemplate --> model ---> parser

    const response = await chain1.invoke({
        "query":"Who holds highest ODI Score ? "
    });
    
    console.log(response);
}())
