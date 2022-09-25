import React from "react";
import {Routes,Route} from "react-router-dom";
//import component
import HomeComponent from "./components/home-component";
import NavComponent from "./components/nav-component";
import RegisterComponent from "./components/register-component";

const App=()=>{
    return(
        <div>
            <NavComponent/>
            <Routes>
                <Route path="/" element={<HomeComponent/>}/>
                <Route path="/register" element={<RegisterComponent/>}/>
            </Routes>
        </div>
    );
}

export default App;

//axios: 將react的http request 傳送到server