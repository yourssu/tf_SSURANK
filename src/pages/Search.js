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
        setList(responsePage.data)
    }
    const getMaxProPage = async ()=>{
        const responsePage = await axios.get(`https://ssurank.herokuapp.com/ssurank/professor/search/${match.params.id}`);
        setMaxPage(responsePage.data);
        setMaxIndex(parseInt((responsePage.data+(pageRowCnt-1))/pageRowCnt));
        setList(responsePage.data)
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
    const nextPage = ()=>{
        let temp;
        if(pageIndex%5===0&&(pageIndex-1)/5<maxIndex/5){
            temp = pageIndex;
        }
        else if(pageIndex/5<maxIndex/5){
            temp = pageIndex-pageIndex%5+5;
        }
        else{
            return;
        }
        console.log(pageIndex);
        setPageIndex(temp);
        console.log(temp);
        setPageList(Array.range(temp , (temp+4>maxIndex?maxIndex:temp+5)))
        getPage(temp);
    }
    const prevPage = ()=>{
        if(pageIndex/5>1){
            let temp = pageIndex-pageIndex%5-1;
            if(pageIndex%5===0){
                temp = (pageIndex/5 - 1)*5;
            }
            console.log(pageIndex);
            setPageIndex(temp);
            console.log(temp);
            setPageList(Array.range(temp-4,temp+1));
            getPage(temp);
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
        if((n/pageRowCnt)<5){
            setPageList([...Array.range(0, (n/pageRowCnt)+1)])
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
        
        getPage(0)

    },[match.params.id]);
    return (
       <>
      <Route path={match.url} render={()=>( 
      <>
        <SearchList data={searchData} value={category}/>
        {maxPage&&pageList?
            <div className="pagenation"> 
                <a onClick={prevPage} className="justify-content-end"><div className="icon sm"><img src="/img/Left.svg"/></div></a>
                <ul>
               {
                pageList.map((i,key)=>(
                    <li key={key}><a style={selected(i)} className="none" onClick={()=>getPage(i)}>{i+1}</a></li>)
                )}
                </ul>
                <a  onClick={nextPage} className="justify-content-start"><div className="icon sm"><img src="/img/Right.svg"/></div></a>
            </div> 
      :<Loading/>}
        </>)}/>
      <Route path={`${match.url}+/view/:id`} component={View}/>
       </>
    );
};

export default Search;