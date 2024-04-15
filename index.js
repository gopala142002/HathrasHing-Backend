import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes1 from "./routes/admin.js";
import routes2 from "./routes/user.js";
const app=express();
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const PORT=process.env.PORT || 8888;
app.use('/api/v1',routes1,routes2);
// app.use('/api/v1',routes2);
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
});