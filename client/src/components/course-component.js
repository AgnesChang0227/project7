import React from 'react'
import {useNavigate} from "react-router-dom";

//根據role顯示不同內容
const CourseComponent = (props) => {
    let {currentUser,setCurrentUser} = props;
    const navigate = useNavigate();
    const handleTakeToLogin = ()=>{
        navigate("/login");
    }
    return (
        <div style={{padding:"3rem"}}>
            {!currentUser&&(//如果沒有登入的話
                <div>
                    <p>You must login before get your courses</p>
                    <button
                        onClick={handleTakeToLogin}
                        className="btn btn-primary btn-lg">
                        Take me to login page
                    </button>
                </div>
            )}
            {currentUser&&currentUser.user.role==="instructor"&&(
                <div>
                    <h1>Welcome to Instructor's Course page</h1>
                </div>
            )}
            {currentUser&&currentUser.user.role==="student"&&(
                <div>
                    <h1>Welcome to Student's Course page</h1>
                </div>
            )}
        </div>
    )
}
export default CourseComponent;