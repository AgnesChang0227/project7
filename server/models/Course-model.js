import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    instructor:{
        //ref表示 instructor 通過ObjectID 關聯User
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    description:{
        type:String,
        required:true,
    },
    price: {
        type: Number,
        required: true,
    },
    students:{
        type:[String],//array當中都是string
        default:[],
    }
})

const Course = mongoose.model("Course",courseSchema);
export default Course;
