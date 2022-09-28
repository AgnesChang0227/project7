import React from "react";
import {Link} from "react-router-dom";
import AuthService from "../services/auth.service";

const NavComponent = (props) => {
    let {currentUser, setCurrentUser} = props;

    const handleLogout = () => {
        AuthService.logout(); //會清除localstorage 的token
        window.alert("Logout Successfully, now you're redirect to the homepage");
        setCurrentUser(null);
    };

    return (
        <div>
            <nav>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/">
                                        Home
                                    </Link>
                                </li>
                                {!currentUser && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/register">
                                                Register
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login">
                                                Login
                                            </Link>
                                        </li>
                                    </>
                                )}
                                {currentUser &&
                                    <>
                                        <li className="nav-item">
                                            <Link onClick={handleLogout} className="nav-link" to="/">
                                                {/*   如果用navigate則不可用link或者a，否則會相撞，可轉用div*/}
                                                {/*<div onClick={() => handleLogout()}>Logout</div>*/}
                                                Logout
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/profile">
                                                Profile
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/course">
                                                Course
                                            </Link>
                                        </li>
                                        {currentUser.user.role === "instructor" && (
                                            <>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/postCourse">
                                                        PostCourse
                                                    </Link>
                                                </li>
                                            </>
                                        )}
                                        {currentUser&&currentUser.user.role==="student"&&(
                                            <>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/enroll">
                                                        Enroll
                                                    </Link>
                                                </li>
                                            </>
                                        )}
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </nav>
        </div>
    );
};
export default NavComponent;
