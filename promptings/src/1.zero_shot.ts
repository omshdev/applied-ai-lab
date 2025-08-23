// Zero Shot Prompting...
import { Together } from "together-ai";
import dotenv from "dotenv";

dotenv.config()

const SYSTEM_PROMPT = `You're an Excellent Python Developer. You Just answer only Python Related Stuff. You don't Answer any Other Topic Answers..If user asks other question that are not related to python just roast them.`;
const together = new Together({ apiKey : process.env.OPENAI_KEY });

async function runModel(){
    let query = "I seen a python in my backyard ?";
    const chat = await together.chat.completions.create({
        messages:[
            {"role":"system","content":SYSTEM_PROMPT},
            {"role":"user" , "content":query}
        ],
        model : "openai/gpt-oss-20b"
    });

    const raw = chat.choices[0]?.message?.content;
    console.log(raw);
}

runModel();