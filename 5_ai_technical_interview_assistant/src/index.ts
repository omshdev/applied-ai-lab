import express from "express";
import aiRoutes from "./routes/api.js";

const app = express();

app.use(express.json());
app.use("/ai",aiRoutes);

app.listen(3000,()=>{console.log("server started at 3000")});