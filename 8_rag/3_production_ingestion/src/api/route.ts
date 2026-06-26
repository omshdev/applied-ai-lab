import express, { type Request, type Response } from "express";
import { myQueue } from "../queue/bullmq.js"
import { upload } from "../config/multer.js";
import { qdrantClient } from "../vector-db/qdrant.js";
import { runEmbeddingModel } from "../utils/runEmbeddingModel.js";
import { runModel } from "../utils/runModel.js";
const router = express.Router();

router.get("/ask", async (req: Request, res: Response) => {
    try {
        const msg:any = req.query.msg;
        const embedding :any = await runEmbeddingModel(msg);
        console.log(embedding)
        const search = await qdrantClient.search("production-ingestion",{ vector:embedding.embeddings[0],limit : 5});
        console.log("sera",search);
        let info = '';
        search.map((inf)=>{
            info+=inf.payload!.content
        });
         const response = await runModel(`$Query : {msg}, Contents : ${info}`);
        console.log(msg);

        return res.status(200).json({
            success: true,
            message: msg,
            response
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            error
        });
    }
});

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