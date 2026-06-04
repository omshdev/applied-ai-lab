import {  HumanMessage,SystemMessage,AIMessage} from "@langchain/core/messages";
import { ChatGoogleGenerativeAI} from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts"
import dotenv from "dotenv"
dotenv.config();

const SYSTEM_TEMPLTE = `
Your're an Om Sharma's Assistant!. the User will give you input {user_input} and will respond based on query. and You Have History of Messages {chatHistory} So You Will not Loose the Context What user is Chating To You.
`


const input = require('prompt-sync')({ sigint: true });

 const model = new ChatGoogleGenerativeAI({
    apiKey : process.env.GOOGLE_API_KEY!,
    model : "gemini-2.0-flash",
    temperature : 0
});


const chatHistory : any= [];

chatHistory.push(new SystemMessage(SYSTEM_TEMPLTE));

(async ()=>{
    while(true){
        const user = input("User : ");
        
    if(user == "exit"){
        console.log(chatHistory);
        break;
    }
    
    if(user){
        await chat(user);
    }
    }
})();



async function chat( user : string){
    const promptTemplate = await ChatPromptTemplate.fromMessages([
    ["system",SYSTEM_TEMPLTE], ["human","{user_input}"], ["human","{chatHistory}"]
    ]);
    
    const promptInputValue = await promptTemplate.invoke({
        user_input:user,
        chatHistory : JSON.stringify(chatHistory)
    });

    const response = await model.invoke(promptInputValue);
    console.log("Bot : ",response.content);
    chatHistory.push({"userMessage":user,"botMessage":response});
    const humanMessage = new HumanMessage(user);
    const aIMessage = new AIMessage(response);
    chatHistory.push({humanMessage,aIMessage});

}


