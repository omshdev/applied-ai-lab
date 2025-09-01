import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv"
import { SystemMessage,HumanMessage } from "@langchain/core/messages";


dotenv.config();

const model = new ChatGoogleGenerativeAI({
    apiKey : process.env.GOOGLE_API_KEY,
    model : "gemini-2.0-flash",
    temperature : 0
});


const messages = [
    new SystemMessage("You're an Language Translator. People Will Give You Input in English Language You will Translate it to Hindi."),
    new HumanMessage("Hi")
]

async function chat(){
    const resposne= await model.invoke(messages); 
    console.log(resposne.content);
}
chat()