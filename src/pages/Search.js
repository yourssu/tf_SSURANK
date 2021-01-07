import React,{useEffect,useState} from 'react';
import { Link, Route } from 'react-router-dom';
import SearchList from '../components/SearchList'
import View from './View'
import Loading from '../components/Loading'
import axios from "axios";
const Search = ({match,category}) => {
    const [searchData, setSearchData] = useState();
    const [pageIndex,setPageIndex]=useState(1);
    const [maxPage,setMaxPage]=useState(0);
    const pageRowCnt=10;
    const getSearchList = async (index) => {
        const response = await axios.get(`https://ssurank.herokuapp.com/ssurank/course/search/${match.params.id}/${index}`);
        setSearchData(response.data.courses);
        const responsePage = await axios.get(`https://ssurank.herokuapp.com/ssurank/course/search/${match.params.id}`);
        setMaxPage(responsePage.data);
        //console.log(response.data);
        //console.log(responsePage.data);
    };
    const getSearchProList = async (index) => {
        const response = await axios.get(`https://ssurank.herokuapp.com/ssurank/professor/search/${match.params.id}/${index}`);
        setSearchData(response.data.professors);
        const responsePage = await axios.get(`https://ssurank.herokuapp.com/ssurank/professor/search/${match.params.id}`);
        setMaxPage(responsePage.data);
        //console.log(response.data);
        //console.log(responsePage.data);
    };
    const selected = (index)=>{
        //console.log(pageIndex)
        if(pageIndex==index+1){
            return {
                color:'#3c95ff',
                cursor:'pointer'
            }
        }
        else{
            return {
                color:'#343a40',
                cursor:'pointer'
            }
        }
    }
    const nextPage = ()=>{

    }
    const prevPage = ()=>{
        
    }
    const getPage = (index)=>{
        setPageIndex(index+1);
        if(category===1){
            getSearchList(index+1);
        }
        else if(category===0){
            getSearchProList(index+1);
        }
    }
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
      <Route exact path={match.url} render={()=>( 
      <>
        <SearchList data={searchData} value={category}/>
        {maxPage?
            <div className="pagenation"> 
                <a onClick={nextPage} className="justify-content-end"><div className="icon sm"><img src="/img/prev_Icon.png"/></div></a>
                <ul>
                    {   
                        [...Array(parseInt((maxPage+(pageRowCnt-1))/pageRowCnt))].map((e, i) => {
                            
                            return  <li key={i}><a style={selected(i)} className="none" onClick={()=>getPage(i)}>{i+1}</a></li>
                          })
                    }
                </ul>
                <a onClick={prevPage} className="justify-content-start"><div className="icon sm"><img src="/img/next_Icon.png"/></div></a>
            </div> 
      :<Loading/>}
        </>)}/>
      <Route path={`${match.url}+/view/:id`} component={View}/>
       </>
    );
};

export default Search;