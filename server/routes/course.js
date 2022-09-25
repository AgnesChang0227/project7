import express from  "express";
const router = express.Router();
import Course from "../models/Course-model.js";
import {courseValidation} from "../validation.js";

//middleware 測試有沒有進入這邊
router.use((req,res,next)=>{
    console.log("A request is coming into api");
    next();
})

//post => create a course
//validate => check the role => save()
router.post("/",async (req,res)=>{
    //validate the input
    const {error} = courseValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //檢查role 是否為 instructor
    if (req.user.isStudent()){
        return res.status(400).send("Only instructor can post a new course");
    }
    //如果是：就儲存data
    let {title,description,price} = req.body;
    let newCourse = new Course({
        title,
        description,
        price,
    });
    try{
        await newCourse.save();
        res.status(200).send("New course has been saved.");
    }catch (err){
        res.status(400).send("cannot save course");
    }
});

export default router;

