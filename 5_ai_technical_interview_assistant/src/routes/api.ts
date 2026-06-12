import express, { type Request, type Response } from 'express';
import { RESUME_DATA } from '../resume_data.js';
import { runModel } from '../model.js';
import { run } from 'node:test';

const router = express.Router();

// Zero Shot Prompting.
router.post("/summary",async(req:Request,res:Response)=>{
    try{
        const user_prompt = req.body.prompt;
        const prompt = `${user_prompt}${RESUME_DATA}`
        const response = await runModel(prompt,"");
        console.log(response)
        res.status(200).json({ msg : response.toString()});
        return;
    }catch(error){
        res.status(400).json({ error : "something went wrong!"});
        return;
    }
});

// Few Shot Prompting
router.post("/extract",async(req:Request,res:Response)=>{
    try{
        const user_prompt = req.body.prompt;
        const few_shot_prompt = `
        Example:
            Input:
                Alice
                3 years React

            Output:
            {
            "name":"Alice",
            "experience":3,
            "skills":["React"]
            }

            Input:
            Bob
            7 years Go

            Output:
            {
            "name":"Bob",
            "experience":7,
            "skills":["Go"]
            }

            Now extract:
            ...
        `
        const prompt = `${RESUME_DATA} ${user_prompt}`;
        const response = await runModel(prompt,few_shot_prompt);
        res.status(200).json({ msg : response});
        return;

    }catch(error){
        res.status(400).json({ error : "something went wrong...!"});
        return;
    }
})

// Role Prompting
router.post("/interview-questions",async(req:Request,res:Response)=>{
    try{
        const system_prompt = `You are a Staff Backend Engineer at Amazon.
        Generate 10 interview questions for this candidate.`

        const response = await runModel("ff",system_prompt);
        res.status(200).json({ msg : response});
        return;
    }catch(error){
        res.status(400).json({ "error" : `Something Went Wrong!,${error}`});
        return;
    }
});

// Chain of Thought.
router.post("/evaluate",async(req:Request,res:Response)=>{
    try{
        const system_prompt = `Evaluate this answer.Think step by step.
            1. Check correctness
            2. Check depth
            3. Check practical knowledge
            4. Assign score`;
        const userPrompt = req.body.prompt;
        const response = await runModel(userPrompt,system_prompt);
        res.status(200).json({ msg : response});
        return;
    }catch(error){
        res.status(400).json({ msg : "Something went Wrong!"});
        return;
    }
});
export default router;