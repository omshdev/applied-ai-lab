import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import { markDownParser } from "./parsers/markdown.js"
import { parse } from "node-html-parser";
// import { addJobs } from "./queue/bullmq.js";
import uploadRoutes from "./api/route.js"
import cors from "cors";

dotenv.config();


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use("/api/v1/ingest",uploadRoutes);

app.get("/data",async (req:Request,res:Response)=>{
    try{
        // const data = await run();
        // const pd = await markDownParser();
        // console.log(pd);
        // const add = await addJobs();

        // const root = parse('<ul id="list"><li>Hello World</li></ul>');
        
        // console.log(root.toString());
        res.status(200).json({ msg :"hbo"});
        return;
    }catch(error){
        res.status(400).json({ msg : error});
    }
})

app.listen(PORT,()=>{console.log(`Server Started at PORT ${PORT}`)});

