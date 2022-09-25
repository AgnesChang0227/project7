import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
//passport
import passport from "passport";
import passportConfig from "./config/passport.js";
passportConfig(passport);

import authRoute from "./routes/auth.js";
import courseRoute from "./routes/course.js";

//connect to MongoDB
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
//path,middleware(保護route，經過驗證才能進入),route
app.use("/api/course",passport.authenticate("jwt",{session:false}),courseRoute);

app.listen(8080,()=>{
    console.log("server is listening on port 8080");
})
