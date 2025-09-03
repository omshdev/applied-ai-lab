import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatPromptTemplate } from "@langchain/core/prompts";

import dotenv from "dotenv";
dotenv.config();

// chain 

// topic --> LLM ---> Give Info about given Topic ---> LLM ---> Summarize given Content to 5 Lines.

const model = new ChatGoogleGenerativeAI({
    apiKey : process.env.GOOGLE_API_KEY!,
    model : "gemini-2.0-flash",
    temperature : 0
});
const SYSTEM_TEMPLTE = `Your're an Good Topic Info Provider.`

const template = ChatPromptTemplate.fromMessages([
    ["system",SYSTEM_TEMPLTE],["human","{topic}"]
])

const SYSTEM_TEMPLTE2 = `Your'e an Summarizer for Given topic with five lines. You will cover all Topic stuff and summarize into five lines.`
const summarizerToFiveLinetemplate = ChatPromptTemplate.fromMessages([
    ["system",SYSTEM_TEMPLTE2],["user","{info}"]
]);


async function chat(){
    // const response = await model.invoke("What is Your Name ? "); 
    // console.log(response.content) 
    const promptValue = await template.invoke({ topic : "What is kafka ? " });
    // console.log(promptValue);

    const response = await model.invoke(promptValue);
    // console.log(response.content);
   
    const promptValue2 = await summarizerToFiveLinetemplate.invoke({
        info : response.content
    });
    console.log("prompt value 2",promptValue2);
    const finalSummarzizedContent = await model.invoke(promptValue2);
    
    console.log("*********************** Final Output ***********************")
    console.log(finalSummarzizedContent.content);

    
}

chat();
