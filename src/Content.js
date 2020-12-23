import React from "react";
import { render } from "react-dom";
import "./Content.css";
import ProDropdown from "./PropDropdown"

const Content = (props)=>{
    return(
    <div className="contents">
        <div className="logo">
            <img src="./img/Logo_img.png"/>
        </div>
        <div className="search">
            <input className="search_bar" type="text" placeholder={(props.category?"강의 검색하기":"교수 검색하기")}/>
            <div className="search_bar_icon"><img src="./img/search_Icon.svg"/></div>
        </div>
        {props.category>0&&<div className="banner">
            <img src="https://avatars1.githubusercontent.com/u/39041161?s=460&u=a99a864343723bb8008a983afc460f0b580c3ad1&v=4" alt="새까미"/>
            </div>}{props.category<1&&<ProDropdown/>}
        
    </div>);
}

export default Content;