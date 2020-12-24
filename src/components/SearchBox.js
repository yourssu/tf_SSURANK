import React,{useState,useEffect} from "react";
import { render } from "react-dom";
import { Link, Route } from 'react-router-dom';

const SearchBox = ({match,category})=>{
    const [value,setValue]=useState()
    const placeholder = (category===1?'강의 검색하기':'교수 검색하기')
    function search(e){
        setValue(e.target.value);
    }

    return(
    <div className="search">
    <input className="search_bar"onChange={search} type="search" placeholder={placeholder}/>
    <Link to={(`${match.url}/search/${value}`)}><div className="search_bar_icon"><img src="/img/search_Icon.svg"/></div></Link>
    </div>
    )
}
export default SearchBox;