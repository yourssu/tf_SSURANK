import React,{useEffect,useState} from 'react';
import { Link, Route } from 'react-router-dom';
import SearchList from '../components/SearchList'
import View from './View'
import axios from "axios";
const Search = ({match,category}) => {
    const [searchData, setSearchData] = useState();
    const getSearchList = async (index) => {
        const response = await axios.get(`https://ssurank.herokuapp.com/ssurank/course/search/${match.params.id}/${index}`);
        setSearchData(response.data.courses);
        console.log(response.data);
    };
    const getSearchProList = async (index) => {
        const response = await axios.get(`https://ssurank.herokuapp.com/ssurank/professor/search/${match.params.id}/${index}`);
        setSearchData(response.data.professors);
        console.log(response.data);
    };
    useEffect(()=>{
        if(category===1){
            getSearchList(1);
        }
        else if(category===0){
            getSearchProList(1);
        }
    },[match.params.id]);
    return (
       <>
    {console.log(match.params.id)}
      <Route exact path={match.url} render={()=>( <SearchList data={searchData} value={category}/>)}/>
      <Route path={`${match.url}+/view/:id`} component={View}/>
       </>
    );
};

export default Search;