import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts"
import dotenv from "dotenv"
dotenv.config();



const SYSTEM_TEMPLATE = `
Your're an Reaserch Paper Analyzer. User Will give you {research_paper_input} , {style_input} , {length_input}. You have to provide response based on these Given Topics.
`



const model = new ChatGoogleGenerativeAI({
    apiKey : process.env.GOOGLE_API_KEY,
    model : "gemini-2.0-flash",
    temperature : 0
});

const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system",SYSTEM_TEMPLATE],["user"," {research_paper_input},{style_input} , {length_input}"]
    
])
async function chat(){
    const d = await promptTemplate.invoke({
        research_paper_input : "The attention all You Need, Trasnformers Architecuture.",
        style_input : "Research Heavy",
        length_input : "Short"
    });
    console.log(d);
    const response = await model.invoke(d);
    console.log(response.content);
}
chat()
