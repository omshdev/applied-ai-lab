import express, { type Request, type Response } from "express";

const router = express.Router();

router.post("/upload",async(req:Request,res:Response)=>{
    try{

    }catch(error){
        res.status(400).json({ error : error});
        return;
    }
});

export default router;