import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
import authRoute from "./routes/auth.js";


mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log("Connect to mongoDB")
    }).catch((err) => {
    console.log(err);
})

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.send("Homepage")
});
//routes
app.use("/api/user",authRoute);//api:方便整合前後端

app.listen(8080,()=>{
    console.log("server is listening on port 8080");
})
