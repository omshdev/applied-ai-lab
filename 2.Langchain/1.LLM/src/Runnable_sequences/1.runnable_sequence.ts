import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { StringOutputParser } from "@langchain/core/output_parsers"
import dotenv from "dotenv";
import { RunnableSequence } from "@langchain/core/runnables"
dotenv.config();


const model = new ChatGoogleGenerativeAI({
    apiKey : process.env.GOOGLE_API_KEY!,
    model : "gemini-2.0-flash",
    temperature : 0
});

const parser = new StringOutputParser();


const promptTemplate1 =  PromptTemplate.fromTemplate(
    "generate info on {topic}",
);

const promptTemplate2 = PromptTemplate.fromTemplate(
    "generate five pointer summary following text : {text}",
    
);


(async function init(){
    // const chain = promptTemplate1.pipe(model).pipe(parser).pipe(promptTemplate2).pipe(model).pipe(parser);

    const chain = RunnableSequence.from([
        {topic : (input: {topic : string})=>input.topic,},
        promptTemplate1,
        model,
        parser,
        (report : string) => ({text : report}),
        promptTemplate2,
        model,
        parser
    ])

    const response = await chain.invoke({topic : "What is WebRTC ? "});
    console.log(response);
}())