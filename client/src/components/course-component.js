import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import CourseService from "../services/course.service";

//根據role顯示不同內容
const CourseComponent = (props) => {
    let {currentUser, setCurrentUser} = props;
    const navigate = useNavigate();
    const handleTakeToLogin = () => {
        navigate("/login");
    };
    let [courseData, setCourseData] = useState(null);
    useEffect(() => {
        // console.log("Using effect");//debug用
        let _id = currentUser?(currentUser.user._id):"";
        CourseService.get(_id)
            .then(data => {
                // console.log(data);//debug用
                setCourseData(data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);//用於取得data並替代

    return (
        <div style={{padding: "3rem"}}>
            {!currentUser && (//如果沒有登入的話
                <div>
                    <p>You must login before get your courses</p>
                    <button
                        onClick={handleTakeToLogin}
                        className="btn btn-primary btn-lg">
                        Take me to login page
                    </button>
                </div>
            )}
            {currentUser && currentUser.user.role === "instructor" && (
                <div>
                    <h1>Welcome to Instructor's Course page</h1>
                </div>
            )}
            {currentUser&&courseData&&courseData.length!=0&&(
                <div>
                    <p>Here's the data we got back from server:</p>
                    {courseData.map((course)=>(//注意這邊是小括號
                        <div className="card" style={{width:"18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">{course.title}</h5>
                                <p className="card-text">{course.description}</p>
                                <p>Student Count:{course.students.length}</p>
                                <button className="btn btn-primary">{course.price}</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {currentUser && currentUser.user.role === "student" && (
                <div>
                    <h1>Welcome to Student's Course page</h1>
                </div>
            )}
        </div>
    )
}
export default CourseComponent;