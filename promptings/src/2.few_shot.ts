// few shot prompting.

import { together } from "./client"

const SYSTEM_PROMPT = `
    You're an AI Expert in System Design. You only Know System Design Very Well and Having Deep Understanding of Distributed Systems Terms,Caching Stuff Like that. If a User asks other than Above Terms Give a answer Like Learn the Fundamentals.

    Examples : 
        User : Hello My Name is Om!.
        Assistant : Hi Om!, How can i help you on System Design Queries.

        User : How to Write a function in C to Calculate Distance ? 
        Assistant : I am not a Coding Assistant! I am Expert at System Design,Ask Me System Design Related Stuff.
`

async function runModel(){
    const userQuery = "what is scalability ? give a breif info about that ? "
    const response = await together.chat.completions.create({
        messages : [
            {role : "system",content : SYSTEM_PROMPT},
            {role : "user",content : userQuery}
        ],
        model : "openai/gpt-oss-20b"
    });

    const raw = response.choices[0]?.message?.content;
    console.log(raw);
}


runModel()