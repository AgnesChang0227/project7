import axios from "axios";

const API_URL = "http://localhost:8080/api/course";

const getToken = () => {
    let token;
    if (localStorage.getItem("user")) {
        token = JSON.parse(localStorage.getItem("user")).token;
    } else {
        token = "";
    }
    return token;
}//取得現在user的token
class CourseService {
    //instructor post course and get cources
    post(title, description, price) {
        let token = getToken();
        //因為API受保護，因此要把token也丟過去
        return axios.post(API_URL, {title, description, price}, {
            headers: {//設置header
                Authorization:token,//postman用過的方法
            }
        });
    }
    get(_id) {
        let token = getToken();
        return axios.get(API_URL+"/instructor/"+_id, {
            headers: {//設置header
                Authorization:token,//postman用過的方法
            }
        })
    }

    //student get courses
    getEnrolledCourses(_id){//另一種做法：學生每申請一個course就放進data，然後populate
        let token = getToken();
        return axios.get(API_URL+"/student/"+_id,{
            headers: {//設置header
                Authorization:token,//postman用過的方法
            }
        })
    }
    //search courses
    getCoursesByName(name){//searchCourse/:name"
        let token = getToken();
        return axios.get(API_URL+"/searchCourse/"+name, {
            headers: {//設置header
                Authorization:token,//postman用過的方法
            }
        })
    }
    //
    enroll(_id,user_id){
        let token = getToken();
        return axios.post(API_URL+"/enroll/"+_id,{user_id}, {
            headers: {//設置header
                Authorization:token,//postman用過的方法
            }
        })
    }

}

export default new CourseService();