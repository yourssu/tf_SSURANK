import React ,{useEffect,useState}from "react";
import { render } from "react-dom";
import "./Nav.css"
const Nav=(props)=>{
    
    function setContents(e){
        props.setContents(1);
        console.log(e);
    }
    function setContents2(e){
        props.setContents(0);
        console.log(e);
    }
    return(
    <div className="nav">
        <div className="nav-logo">
            <img src="./img/Logo.png"/>
        </div>
        <div className="nav-btn">
            <ul>
                <li className={(props.category?"selected":"none")} ><a onClick={setContents}>강의평가</a></li>
                <li className={(props.category?"none":"selected")} ><a onClick={setContents2}>교수평가</a></li>
            </ul>
        </div>
    </div>
    )
}

export default Nav;