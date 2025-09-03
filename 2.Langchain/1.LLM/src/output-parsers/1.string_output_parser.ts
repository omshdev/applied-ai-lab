import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
    apiKey : process.env.GOOGLE_API_KEY!,
    model : "gemini-2.0-flash",
    temperature : 0
});

const SYSTEM_TEMPLATE_1 = `Your'e an Tech Expert Having All Knowledge About All Domains in Tech Like Full Stack, AI , Cyber Security, Blockchain. user will give you {topic} and you have to provide info about that on given topic.`

const SYSTEM_TEMPLATE_2 = `Your'e an Tech Expert And Summarizer Where user will give you tech {content} so you have to summarize in a way where it would cover all the points and give you summary in just 5-6 lines.`


const template1 = ChatPromptTemplate.fromMessages([
    ["system",SYSTEM_TEMPLATE_1],["user","{topic}"]
]);

const template2 = ChatPromptTemplate.fromMessages([
    ["system",SYSTEM_TEMPLATE_2],["user","{content}"]
]);


const stringParser = new StringOutputParser();

(async function initChainWithParsers(){
        
    // python 
    // const chain = template1 | model | stringParser | template2 | model | stringParser
    
    // in ts or  js you need to usee pipe for these above like stuff.
    const chain1 = template1.pipe(model).pipe(stringParser);
    const chain2 = template2.pipe(model).pipe(stringParser);


    const response1 = await chain1.invoke({ topic : "What is WebRTC ? "});
    console.log(response1);

    const response2 = await chain2.invoke({content : response1});
    console.log("******************************************************************************************")
    console.log(response2);
}())