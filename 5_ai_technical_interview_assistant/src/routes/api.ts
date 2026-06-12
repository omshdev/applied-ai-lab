import express, { type Request, type Response } from 'express';
import { RESUME_DATA } from '../resume_data.js';
import { runModel } from '../model.js';

const router = express.Router();

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
})

export default router;