//把react的http request 傳送到server
import axios from "axios";
import {redirect} from "react-router-dom";
const API_URL = "http://localhost:8080/api/user";

class AuthService{
    login(email,password){
        return axios.post(API_URL+"/login",{email,password});
    }
    logout(){
        //沒有token就不是在登陸的狀態
        localStorage.removeItem("user");
    }
    register(username,email,password,role){
        //axios 會回傳一個promise
        return axios.post(API_URL+"/register",{
            username,
            email,
            password,
            role,
        });
    }
    getCurrentUser(){//獲得現在的user
        //從token 拿出 user解析為json => object
        return JSON.parse(localStorage.getItem("user"));
    }
}
//export 的是用 class create 的object
export default new AuthService();