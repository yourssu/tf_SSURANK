import React from "react";
import "./Footer.css";
import { Link, Route } from 'react-router-dom';
const Footer = ()=>{
    return(
    <div className="footer">
        <p>Contact us ssurank.urssu@gmail.com<br/>
Copyright <Link to='/credit'><u>SSU Rank at YOURSSU</u></Link>. {new Date().getFullYear()}. All rights reserved.</p>
    </div>
    );
}

export default Footer;