import express, { type Request, type Response } from "express";
import { runModel } from "../utils/runModel.js";

const router = express.Router();


router.post("/ai/chat",async(req:Request,res:Response)=>{
    try{
        const prompt = req.body.prompt;
        if(!prompt) return res.status(401).json({ msg : "Prompt not Found!!"});
        const response = await runModel(prompt);
        return res.status(200).json({ msg : response});
    }catch(error){
        res.status(400).json({ error : error});
        return;
    }
});

export default router;