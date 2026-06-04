import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { StringOutputParser } from "@langchain/core/output_parsers"
import { RunnableParallel } from "@langchain/core/runnables"
import dotenv from "dotenv";

/*
```
      +-------+
      | topic |
      +-------+
      /       \
     /         \
Notes           Quiz
   /             \
  v               v
+-----+         +-----+
| LLM1 |         | LLM2 |
+-----+         +-----+
  \             /
   \           /
    \         /
     v       v
   +-----------+
   | Notes + Quiz |
   |    LLM    |
   +-----------+
```



*/
dotenv.config();


const model = new ChatGoogleGenerativeAI({
    apiKey : process.env.GOOGLE_API_KEY!,
    model : "gemini-2.0-flash",
    temperature : 0
});

const model2 = new ChatGoogleGenerativeAI({
    apiKey : process.env.GOOGLE_API_KEY!,
    model : "gemini-2.0-flash",
    temperature : 0
});


const notesTemplate = PromptTemplate.fromTemplate(
    "Your're an Notes Maker where User will give you {topic}.You have to generate notes of it."
);

const quizTemplate = PromptTemplate.fromTemplate(
    "Your're an quiz Maker where User will give you {topic}.You have to generate quiz of it."
);

const mergeResponsesPrompt = PromptTemplate.fromTemplate(
    "Your'e an Summarizer of Quiz and Notes Which Will be given by User. Notes : {notes} , Quizes : {quiz}. You Have to Merge and Give Both quizzes and Notes."
);




const parser = new StringOutputParser();

const chain1 = notesTemplate.pipe(model).pipe(parser);
const chain2 = quizTemplate.pipe(model2).pipe(parser);

const parallelChain = RunnableParallel.from({
    notes : chain1,
    quiz : chain2
});

const mergeChain = parallelChain.pipe(mergeResponsesPrompt).pipe(model).pipe(parser);




(async function init(){
    const response = await mergeChain.invoke({topic : "What is WebRTC ? "});
    // console.log("************************************************************************************")
    
    // console.log("************************************************************************************")
    
    // console.log("************************************************************************************")
    console.log(response);
}())