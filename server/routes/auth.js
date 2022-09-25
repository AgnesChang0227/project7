import express from "express";
const router = express.Router();
import validation from "../validation.js";
const registerValidation = validation.registerValidation;
const loginValidation = validation.loginValidation;

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

router.post("/register",(req,res)=>{
    console.log("Registering");
    // console.log(registerValidation(req.body));
    //如果通過，則會傳送{value:{...}};
    // 否則傳送{value:{...},error:[Error[ValidationError]:"..."]{...}}
    const {error} = registerValidation(req.body);
    // console.log(error.details);//[{message:...}]
    if (error)return res.status(400).send(error.details[0].message);

})



export default router;
