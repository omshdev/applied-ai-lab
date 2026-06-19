import express, { type Request, type Response } from "express";
import {ollama} from "../utils/runModel.js"
import {SYSTEM_PROMPT } from "../utils/system_prompt.js"

const router = express.Router();


router.post("/ai/chat",async(req:Request,res:Response)=>{
    try{
        const prompt = req.body.prompt;
        if(!prompt) return res.status(401).json({ msg : "Prompt not Found!!"});
        res.setHeader("Content-Type","text/event-stream")
        res.setHeader("Cache-Control","no-cache")
        res.setHeader("Connection","keep-alive")
        
        const response = await ollama.chat({
                    model: "gpt-oss:120b",
                    messages: [
                        {role:"system",content : SYSTEM_PROMPT},
                        {role: "user", content: prompt } 
                    ],
                    stream: true,
            });
        
        
            for await (const part of response) {
                res.write(
                    `data:${JSON.stringify({
                        content : part.message.content
                    })}\n\n`
                );
            }
            res.write("data: [DONE]\n\n");
            res.end()

    }catch(error){
        res.status(400).json({ error : error});
        return;
    }
});

export default router;