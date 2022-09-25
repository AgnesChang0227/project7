import Joi from "joi";

//Register Validation
const registerValidation = (data)=>{
    //schema: 模板
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(6).max(50).required().email(),
        password: Joi.string().min(6).max(255).required(),
        role:Joi.string().required().valid("student","instructor"),
    });

    return schema.validate(data);
};

//login 的 Validation
const loginValidation = (data)=>{
    const schema=Joi.object({
        email: Joi.string().min(6).max(50).required().email(),
        password: Joi.string().min(6).max(255).required(),
    });
    return schema.validate(data);
}

const validation = {
    registerValidation,
    loginValidation,
}
export default validation;