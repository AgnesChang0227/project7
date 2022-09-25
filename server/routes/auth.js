import express, {raw} from "express";

const router = express.Router();
import jwt from "jsonwebtoken";
//validation
import validation from "../validation.js";

const registerValidation = validation.registerValidation;
const loginValidation = validation.loginValidation;
//models
import User from "../models/User-model.js";

//middleware
//每當有人進入這邊認證的path時，就會觸發這個middleware
router.use((req, res, next) => {
    console.log("A request is coming in to auth.js");
    next();
});

//API
//使用postman跟server互動，這個可以確認有連結
router.get("/testAPI", (req, res) => {
    const msgObj = {
        message: "Test API is working",
    }
    return res.json(msgObj);//這邊用res.send()也一樣
})
//post register
router.post("/register", async (req, res) => {
    //check the validation of data:
    // console.log(registerValidation(req.body));
    // 如果通過，則會傳送{value:{...}};
    // 否則傳送{value:{...},error:[Error[ValidationError]:"..."]{...}}
    const {error} = registerValidation(req.body);
    // console.log(error.details);//[{message:...}]
    if (error) return res.status(400).send(error.details[0].message);

    //check if the user exists
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send("Email has already been register.");

    //register the user
    const newUser = new User({
        email: req.body.email, username: req.body.username, //已經在User-model.js寫middleware，save前hash password
        password: req.body.password, role: req.body.role,
    });
    try {
        const saveUser = await newUser.save();
        res.status(200).send({
            msg: "success", savedObject: saveUser,
        });
    } catch (err) {
        res.status(400).send("User not saved.")
    }
})

router.post("/login", (req, res) => {
    //先 data validation
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    User.findOne({email: req.body.email}, (err, user) => {
        //如果出現error
        if (err) return res.status(400).send(err);
        //如果沒有找到user
        if (!user) return res.status(401).send("User not found");

        //找到則compare password => 使用在schema設置的fn
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) return res.status(401).send("Wrong password");
            if (isMatch) {
                //make token
                const tokenObject = {_id: user._id, email: user.email};
                //第一個放object,第二個放secret
                const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
                //回傳一個object => success+ token +user
                res.send({success: true, token: "JWT" + token, user});
                //email:abc@gmail.com password:12345678 token:
                /*"JWTeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJmZjg3M2I1MzdhMDRhNDVhMzNiZTIiLCJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJpYXQiOjE2NjQwOTAyODd9.3s2ixqkIzy42tPe2nA8ySr_gjAqJkC8hY-aoCf7aeJQ"*/

            }
        });

    })
})

export default router;
