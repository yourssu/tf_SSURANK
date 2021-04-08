import React,{useState,useEffect} from "react";
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

const SearchBox = ({history,match,category})=>{
    
    const [value,setValue]=useState(match.params.id||'')
    const placeholder = (category===1?'강의 검색하기':'교수 검색하기')
    function search(e){
        setValue(e.target.value);
    }
    function decodeKeyword(){
        return(decodeURIComponent(value))
    }
    function enterSubmit(e){
        if (e.keyCode === 13&&value.length>0) {
            history.push((category===1?'/class':'/professor')+`/search/${encodeURIComponent(value.replace(/ /g,""))}`);
        }
    }
    useEffect(() => {
    }, [value])
    return(
    <div className="search bs pd-16-side">
        {console.log(value)}
    <input className="search_bar" value={decodeKeyword()} onChange={search} onKeyDown={(e) => enterSubmit(e) } type="search" placeholder={placeholder}/>
    <Link to={()=>value.length>0&&((category===1?'/class':'/professor')+`/search/${encodeURIComponent(value.replace(/ /g,""))}`)}><div className="search_bar_icon"><img src="/img/search_Icon.svg"/></div></Link>
    </div>
    
    )
}

SearchBox.propTypes ={
    history: ReactRouterPropTypes.history.isRequired,
    category:PropTypes.number.isRequired,
}
export default SearchBox;