import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());



app.listen(PORT,()=>{console.log(`Server Started at PORT ${PORT}`)});

