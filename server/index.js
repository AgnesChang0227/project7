import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log("Connect to mongoDB")
    }).catch((err) => {
    console.log(err);
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.send("Homepage")
});

app.listen(8080,()=>{
    console.log("server is listening on port 6000");
})
