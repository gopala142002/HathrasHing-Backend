import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import cors from "cors";
const app=express();
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const PORT=process.env.PORT || 8888;
app.use('/api/v1',routes);
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
});