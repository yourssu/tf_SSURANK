import React from "react";
import { render } from "react-dom";
import "./Nav.css"
const Nav=()=>{
    return(
    <div className="nav">
        <div className="nav-logo">
            <img src="./Logo.png"/>
        </div>
        <div className="nav-btn">
            <ul>
                <li>강의평가</li>
                <li>교수평가</li>
            </ul>
        </div>
    </div>
    )
}

export default Nav;