import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts"
import dotenv from "dotenv"
dotenv.config();

const model = new ChatGoogleGenerativeAI({
    apiKey : process.env.GOOGLE_API_KEY,
    model : "gemini-2.0-flash",
    temperature : 0
});

const SYSTEM_TEMPLTE = 'Translate the Following from English into {language}';
const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system",SYSTEM_TEMPLTE],["user","{text}"]
]);



async function chat(){
const promptValue = await promptTemplate.invoke({
    language : "Italian",
    text : "Om How are You ? "
});
console.log(promptValue);
const response = await model.invoke(promptValue);
console.log(response.content);
}
chat()
