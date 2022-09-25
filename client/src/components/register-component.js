import React,{useState} from "react";
//version6版本前用useHistory, 之後用useNavigate
import {useNavigate} from "react-router-dom";//hook,重新導向另外一個頁面
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
    const navigate = useNavigate();

    let [username,setUsername] = useState("");
    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");
    let [role,setRole] = useState("");
    //使用message處理error message
    let [error_msg,setError_msg] = useState("")
    // let [success_msg,setSuccess_msg] = useState("")

    const handleChangeUsername = (e)=>{//e for event
        setUsername(e.target.value);
    }
    const handleChangeEmail = (e)=>{//e for event
        setEmail(e.target.value);
    }
    const handleChangePassword = (e)=>{//e for event
        setPassword(e.target.value);
    }
    const handleChangeRole = (e)=>{//e for event
        setRole(e.target.value);
    }
    const handleRegister = ()=>{
        AuthService.register(username,email,password,role)
            .then((msg)=>{
                window.alert("Registration succeeds.You are now redirected to the login page.");
                // setSuccess_msg(msg.data.msg);
                navigate("/login");//重新導向去login page
            }).catch(error=>{
            console.log(error.response);//server的res.send在這邊會變成一個object
            setError_msg(error.response.data);//data=>error message
        })
    }

    return (//不用form的原因：如果用了form，button會自動submit到react的route
        //因此在這裡使用div包起來，之後再用api把資料傳送到server處理
        <div style={{ padding: "3rem" }} className="col-md-12">
            <div>
                {/*如果有message，就顯示message*/}
                {error_msg&&<div className="alert alert-danger">{error_msg}</div>}
                {/*{success_msg&&<div className="alert alert-success">{success_msg}</div>}*/}
                <div>
                    <label htmlFor="username">Username</label>
                    <input onChange={handleChangeUsername} type="text" className="form-control" name="username" />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="email">email</label>
                    <input onChange={handleChangeEmail} type="text" className="form-control" name="email" />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChangePassword} type="password" className="form-control" name="password" />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="password">role</label>
                    <input onChange={handleChangeRole} type="text" className="form-control" name="role" />
                </div>
                <br />
                <button onClick={handleRegister} className="btn btn-primary">
                    <span>Register</span>
                </button>
            </div>
        </div>
    );
};

export default RegisterComponent;