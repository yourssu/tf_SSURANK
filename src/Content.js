import React from "react";
import { render } from "react-dom";
import "./Content.css";


const Content = ()=>{
    return(
    <div className="contents">
        <div className="logo">
            <img src="./Logo_img.png"/>
        </div>
        <div className="search">
            <input className="search_bar" type="text" placeholder="강의 검색하기"/>
        </div>
        <div className="banner">
            
        </div>
    </div>);
}

export default Content;