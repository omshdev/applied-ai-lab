import express, { type Request, type Response } from "express";
import { myQueue } from "../queue/bullmq.js"
import { upload } from "../config/multer.js";
const router = express.Router();

router.post("/upload",upload.single('pdfFile'),async(req:Request,res:Response)=>{
    try{
        
        if(!req.file) return;
        
        await myQueue.add('addDocToQueue',{fileName : req.file.filename});
        res.status(200).json({ message : "Pdf uplodade",fileName : req.file.filename});
        return;

    }catch(error){
        res.status(400).json({ msg : error});
        return;
    }
});

export default router;