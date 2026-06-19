import express, { type Request, type Response } from 'express';
import aiRoutes from "./routes/chat.js";
import cors from "cors";


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use("/api/v1",aiRoutes);

app.get("/",(req:Request,res:Response)=>{
res.status(200).json({ msg : "All Good...!"});
return;
});

app.listen(PORT,()=>{
  console.log("Server Started at ",PORT);
});
