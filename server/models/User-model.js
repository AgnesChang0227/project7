import mongoose from "mongoose";
import bcrypt from  "bcrypt";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50,
    },
    email:{
        type:String,
        required:true,
        minLength:6,
        maxLength:100,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        maxLength:1024,
    },
    role:{
        type:String,
        enum:["Student","Instructor"],//只能在裡面選擇
        required:true,
        default:"Student",
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

userSchema.methods.isStudent = function (){
    return this.role =="student";
};

userSchema.methods.isInstructor=function (){
    return this.role == "Instructor";
}

//mongoose schema middleware
//pre => 在事情發生之前，這裡是save 之前
//希望password經過hash再儲存
userSchema.pre("save",async function (next){
    if (this.isModified("password")||this.isNew){//password被改過，或資料是新的
        //重新將password再hash一次
        const hash = await bcrypt.hash(this.password,10);
        this.password=hash;
        next();
    }else{
        return next();
    }
})

userSchema.methods.comparePassword = function (password,cb){
    //第一個是輸入的password，後者是已經被hash的password,第三個是callback fn
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        //isMatch的結果是true/false
        if (err)return cb(err,isMatch);
        cb(null,isMatch);
    })
}

//export User
export default mongoose.model("User",userSchema);