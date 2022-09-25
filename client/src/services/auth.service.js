//把react的http request 傳送到server
import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

class AuthService{
    login(){}
    logout(){}
    register(username,email,password,role){
        //axios 會回傳一個promise
        return axios.post(API_URL+"/register",{
            username,
            email,
            password,
            role,
        });
    }
    getCurrentUser(){}
}
//export 的是用 class create 的object
export default new AuthService();