import React,{useEffect,useState} from 'react';
import { Link, Route } from 'react-router-dom';
import SearchList from '../components/SearchList'
import View from './View'
import Loading from '../components/Loading'
import axios from "axios";
const Search = ({match,category}) => {
    const [searchData, setSearchData] = useState();
    const [pageIndex,setPageIndex]=useState();
    const [maxPage,setMaxPage]=useState();
    const [maxIndex,setMaxIndex] = useState();
    const [pageList,setPageList]=useState([0]);
    const pageRowCnt=10;
    const getSearchList = async (index) => {
        const response = await axios.get(`https://ssurank.herokuapp.com/ssurank/course/search/${match.params.id}/${index}`);
        setSearchData(response.data.courses);
        //console.log(response.data);
        //console.log(responsePage.data);
    };
    const getSearchProList = async (index) => {
        const response = await axios.get(`https://ssurank.herokuapp.com/ssurank/professor/search/${match.params.id}/${index}`);
        setSearchData(response.data.professors);
        //console.log(response.data);
        //console.log(responsePage.data);
    };
    const getMaxPage = async ()=>{
        const responsePage = await axios.get(`https://ssurank.herokuapp.com/ssurank/course/search/${match.params.id}`);
        setMaxPage(responsePage.data);
        setMaxIndex(parseInt((responsePage.data+(pageRowCnt-1))/pageRowCnt));
        
    }
    const getMaxProPage = async ()=>{
        const responsePage = await axios.get(`https://ssurank.herokuapp.com/ssurank/professor/search/${match.params.id}`);
        setMaxPage(responsePage.data);
        setMaxIndex(parseInt((responsePage.data+(pageRowCnt-1))/pageRowCnt));
    }
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
    Array.range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);
    const pageIndexArray = () => {
        console.log('실행')
        
        
        if (maxIndex<=5){// 최대 페이지가 5보다 많을경우
            console.log(Array.range(0, maxIndex+1))
            return(Array.range(0, maxIndex+1))
        } 
        else if (maxIndex <= pageIndex + 2) {//최대 페이지까지 거의 다 왔을경우 
            console.log(Array.range(maxIndex - 4, maxIndex));
            return (Array.range(maxIndex - 5, maxIndex))
        }
        
    }
    const nextPage = ()=>{
        if(pageIndex<=parseInt(pageIndex/5)*5){
            let temp = pageIndex-pageIndex%5+6;
            if(pageIndex%5===0){
                temp = pageIndex+1;
            }
            console.log(pageIndex);
            setPageIndex(temp);
            console.log(temp);
            setPageList(Array.range(temp-1 , (temp+4>maxIndex?maxIndex:temp+4)))
        }
    }
    const prevPage = ()=>{
        if(pageIndex/5>1){
            let temp = pageIndex-pageIndex%5;
            if(pageIndex%5===0){
                temp = (pageIndex/5 - 1)*5;
            }
            console.log(pageIndex);
            setPageIndex(temp);
            console.log(temp);
            setPageList(Array.range(temp-5,temp))
        }
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
    const setList = (n)=>{
        if(n<5){
            setPageList([...Array.range(0, n+1)])
        }
        else{
            setPageList([...Array.range(0, 5)])
        }
    }
    useEffect(()=>{
        if(category===1){
            getSearchList(1);
            getMaxPage();
        }
        else if(category===0){
            getSearchProList(1);
            getMaxProPage()
        }
        setList(maxPage)
        getPage(0)

    },[match.params.id]);
    
    return (
       <>
      <Route path={match.url} render={()=>( 
      <>
        <SearchList data={searchData} value={category}/>
        {maxPage&&pageList?
            <div className="pagenation"> 
                <a onClick={prevPage} className="justify-content-end"><div className="icon sm"><img src="/img/prev_Icon.png"/></div></a>
                <ul>
               {
                pageList.map((i,key)=>(
                    <li key={key}><a style={selected(i)} className="none" onClick={()=>getPage(i)}>{i+1}</a></li>)
                )}
                </ul>
                <a  onClick={nextPage} className="justify-content-start"><div className="icon sm"><img src="/img/next_Icon.png"/></div></a>
            </div> 
      :<Loading/>}
        </>)}/>
      <Route path={`${match.url}+/view/:id`} component={View}/>
       </>
    );
};

export default Search;