import React ,{useEffect,useState}from "react";
import { render } from "react-dom";
import { NavLink ,Link} from 'react-router-dom';
import "./Nav.css"
const Nav=(props)=>{
    const activeStyle={
        fontWeight: '700',
        fontStyle: 'normal',
        fontSize: '14px',
        lineHeight: '19px',
        color: '#3C95FF',
        borderBottom: '3px solid #3C95FF',
        display: 'block',
        height: '100%'
    }
    return(
    <div className="nav">
        <div className="nav-logo">
            <Link to="/"><img src="./img/Logo.png"/></Link>
        </div>
        <div className="nav-btn">
            <ul>
                <li className="none" ><NavLink to="/class" activeStyle={activeStyle} >강의평가</NavLink></li>
                <li className="none" ><NavLink to="/professor" activeStyle={activeStyle}>교수평가</NavLink></li>
            </ul>
        </div>
    </div>
    )
}

export default Nav;