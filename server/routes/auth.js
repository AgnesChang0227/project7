import express from "express";
const router = express.Router();

//middleware
//每當有人進入這邊認證的path時，就會觸發這個middleware
router.use((req,res,next)=>{
    console.log("A request is coming in to auth.js");
    next();
});

//使用postman跟server互動，這個可以確認有連結
router.get("/testAPI",(req,res)=>{
    const msgObj ={
        message:"Test API is working",
    }
    return res.json(msgObj);//這邊用res.send()也一樣
})





export default router;
