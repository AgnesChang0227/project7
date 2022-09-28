import express from "express";

const router = express.Router();
import Course from "../models/Course-model.js";
import {courseValidation} from "../validation.js";

//middleware 測試有沒有進入這邊
router.use((req, res, next) => {
    console.log("A request is coming into api");
    next();
})

//顯示所有課程
router.get("/", (req, res) => {
    //populate:利用關聯的部分，找到另外collection的訊息
    //populate語法：Query.populate(path,[select],[model],[match],[options])
    Course.find({}).populate("instructor", ["username", "email"])
        .then((course) => {
            console.log(course);
            res.send(course);
        }).catch(() => {
        res.status(500).send("Cannot get course");
    })
})

//post => create a course
//validate => check the role => save()
router.post("/", async (req, res) => {
    //validate the input
    const {error} = courseValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //檢查role 是否為 instructor
    if (req.user.isStudent()) {
        return res.status(400).send("Only instructor can post a new course");
    }
    //如果是：就儲存data
    let {title, description, price} = req.body;
    let newCourse = new Course({
        title,
        description,
        price,
        instructor: req.user._id,//儲存user id
    });
    try {
        await newCourse.save();
        res.status(200).send("New course has been saved.");
    } catch (err) {
        res.status(400).send("cannot save course");
    }
});

//從course 的id 找到 instructor 的id 和email
router.get("/:_id", (req, res) => {
    let {_id} = req.params;
    Course.findOne({_id}).populate("instructor", ["email"])
        .then((course) => {
            res.send(course);
        }).catch((err) => {
        res.send(err);
    })
})

//修改course內容
router.patch("/:_id", async (req, res) => {
    //先 data validation
    const {error} = courseValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let {_id} = req.params;
    let course = await Course.findOne({_id});
    if (!course) {
        res.status(404);
        return res.json({
            success: false,
            message: "Course not found",
        })
    }
    //如果user是course的作者，或是管理員
    if (course.instructor.equals(req.user._id) || req.user.isAdmin()) {
        Course.updateOne(course, req.body, {
            new: true,
            runValidators: true,
        }).then(() => {
            res.send("Course updated")
        }).catch(err => {
            res.send({
                success: false,
                message: err,
            })
        })
    } else {
        res.status(403);
        return res.json({
            success: false,
            message: "Only the instructor of this course or admin can edit this course ",
        })
    }
});

//刪除course
router.delete("/:_id", async (req, res) => {
    let {_id} = req.params;
    let course = await Course.findOne({_id});
    if (!course) {
        res.status(404);
        return res.json({
            success: false,
            message: "Course not found",
        })
    }
    //如果user是course的作者，或是管理員
    if (course.instructor.equals(req.user._id) || req.user.isAdmin()) {
        Course.deleteOne(course)
            .then(() => {
                res.send("Course deleted")
            }).catch(err => {
            res.send({
                success: false,
                message: err,
            })
        })
    } else {
        res.status(403);
        return res.json({
            success: false,
            message: "Only the instructor of this course or admin can delete this course ",
        })
    }
})

router.get("/instructor/:_instructor_id",(req,res)=>{
    let {_instructor_id}=req.params;
    Course.find({instructor: _instructor_id})
        .populate("instructor",["username","email"])
        .then((data)=>{
            // console.log(data);//debug用
            res.send(data);
        }).catch(()=>{
            res.status(500).send("Cannot get course data");
    })
})

export default router;

