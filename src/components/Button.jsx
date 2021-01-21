import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const Button = ({url,string})=>{
    return (
        <Link to ={`/professor/view/${url}`}>
            <button className="prof-detail-btn mg-12-top mg-12-bt mg-16-side"><p>{string}</p></button>
        </Link>
    )
}

Button.propTypes={
    url:PropTypes.number.isRequired,
    string:PropTypes.string.isRequired
}
  

export default Button;