import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./db/conn.js";
import userRouter from "./routes/user.route.js";
import companyRouter from "./routes/company.route.js";
import jobRouter from "./routes/job.route.js";
import applicationRouter from "./routes/application.route.js";

const app = express();

connectDb();

app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.use(cookieParser())

app.get("/",(req,res)=>{
    return res.json({
        message:"Api working"
    })
})

app.use("/api/users",userRouter)
app.use("/api/companies",companyRouter)
app.use("/api/jobs",jobRouter)
app.use("/api/applications",applicationRouter)


const port = process.env.PORT || 3000;


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
    
})