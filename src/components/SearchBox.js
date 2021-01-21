import React,{useState} from "react";
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

const SearchBox = ({history,category})=>{
    const [value,setValue]=useState()
    const placeholder = (category===1?'강의 검색하기':'교수 검색하기')
    function search(e){
        setValue(e.target.value);
    }
    function enterSubmit(e){
        if (e.keyCode === 13) {
            history.push((category===1?'/class':'/professor')+`/search/${value}`);
        }
    }
    return(
    <div className="search">
    <input className="search_bar"  onChange={search} onKeyDown={(e) => enterSubmit(e) } type="search" placeholder={placeholder}/>
    <Link to={((category===1?'/class':'/professor')+`/search/${value}`)}><div className="search_bar_icon"><img src="/img/search_Icon.svg"/></div></Link>
    </div>
    
    )
}

SearchBox.propTypes ={
    history: ReactRouterPropTypes.history.isRequired,
    category:PropTypes.string.isRequired,
}
export default SearchBox;