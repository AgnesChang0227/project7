import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import CourseService from "../services/course.service";

const PostCourseComponent = (props) => {
    let {currentUser, setCurrentUser} = props;
    const navigate = useNavigate();

    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [price, setPrice] = useState(0);
    let [message, setMessage] = useState("");


    const handleTakeToLogin = () => {
        navigate("/login");
    };
    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    }
    const handleChangePrice = (e) => {
        setPrice(e.target.value);
    }
    const postCourse = () => {
        CourseService.post(title,description,price)
            .then((response)=>{
                window.alert("New course has been created");
                navigate("/course");
            })
            .catch(error=>{
                console.log(error.response);
                setMessage(error.response.data);
            })
    }
    return (
        <div style={{padding: "3rem"}}>
            {!currentUser && (
                <div>
                    <p>You must login first before posting a new course.</p>
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={handleTakeToLogin}
                    >
                        Take me to login page.
                    </button>
                </div>
            )}
            {currentUser && currentUser.user.role !== "instructor" && (
                <div>
                    <p>Only instructors can post new courses.</p>
                </div>
            )}
            {/*一個form*/}
            {currentUser && currentUser.user.role === "instructor" && (
                <div className="form-group">
                    {message && (//如果有任何錯誤message
                        <div className="alert alert-warning" role="alert">
                            {message}
                        </div>
                    )}
                    <label htmlFor="exampleforTitle">Title</label>
                    <input
                        name="title"
                        type="text"
                        className="form-control"
                        id="exampleforTitle"
                        onChange={handleChangeTitle}
                    />
                    <br/>
                    <label htmlFor="exampleforContent">Content</label>
                    <textarea
                        className="form-control"
                        id="exampleforContent"
                        aria-describedby="emailHelp"
                        name="content"
                        onChange={handleChangeDescription}
                    />
                    <br/>
                    <label htmlFor="exampleforPrice">Price</label>
                    <input
                        name="price"
                        type="number"
                        className="form-control"
                        id="exampleforPrice"
                        onChange={handleChangePrice}
                    />
                    <br/>
                    <button className="btn btn-primary" onClick={postCourse}>
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}
export default PostCourseComponent;