import React,{useEffect,useState} from 'react';
import { Link, Route } from 'react-router-dom';
import SearchList from '../components/SearchList'
import View from './View'
import SearchBox from '../components/SearchBox';
import Loading from '../components/Loading'
import axios from "axios";
import NoResult from '../components/NoResult';
const Search = ({history,match,category}) => {
    const [searchData, setSearchData] = useState([]);
    const [pageIndex,setPageIndex]=useState(0);
    const [maxPage,setMaxPage]=useState();
    const [keyword,setKeyword] = useState('');
    const [maxIndex,setMaxIndex] = useState();
    const [pageList,setPageList]=useState([0]);
    const pageRowCnt=10;
    const getSearchList = async (index) => {
        const response = await axios.get(`https://test.ground.yourssu.com/timetable/v1/ssurank/courses/search/${match.params.id}/${index}`); 
        //console.log(match.params.id)       
        //console.log(keyword)
        if(keyword !== match.params.id){
            setSearchData(response.data.courses);
            setKeyword(match.params.id)
        }
        else{
            setSearchData(searchData.concat(response.data.courses));
            
            //console.log(keyword)
        }
        //console.log(response.data);
        //console.log(responsePage.data);
    };
    const getSearchProList = async (index) => {
        const response = await axios.get(`https://test.ground.yourssu.com/timetable/v1/ssurank/professors/search/${match.params.id}/${index}`);
        setSearchData(searchData.concat(response.data.professors));
        if(keyword !== match.params.id){
            setSearchData(response.data.professors);
            setKeyword(match.params.id)
        }
        else{
            setSearchData(searchData.concat(response.data.professors));
            
        }
        //console.log(response.data);
        //console.log(responsePage.data);
    };
    const getMaxPage = async ()=>{
        const responsePage = await axios.get(`https://test.ground.yourssu.com/timetable/v1/ssurank/courses/search/${match.params.id}/count`);
        setMaxPage(responsePage.data);
        setMaxIndex(parseInt((responsePage.data+(pageRowCnt-1))/pageRowCnt));
        setList(responsePage.data)
    }
    const getMaxProPage = async ()=>{
        const responsePage = await axios.get(`https://test.ground.yourssu.com/timetable/v1/ssurank/professors/search/${match.params.id}/count`);
        setMaxPage(responsePage.data);
        setMaxIndex(parseInt((responsePage.data+(pageRowCnt-1))/pageRowCnt));
        setList(responsePage.data)
    }
    const selected = (index)=>{
        //console.log(pageIndex)
        if(pageIndex==index+1){
            return {
                color:'#0085FF',
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
        let temp=pageIndex;
        //console.log(pageIndex);
        setPageIndex(pageIndex+1);
        //console.log(temp);
        getPage(temp);
    }
    const prevPage = ()=>{
        if(pageIndex/5>1){
            let temp = pageIndex-pageIndex%5-1;
            if(pageIndex%5===0){
                temp = (pageIndex/5 - 1)*5;
            }
            //console.log(pageIndex);
            setPageIndex(temp);
            //console.log(temp);
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
    if(maxPage<1){
        return(
            <>
            <SearchBox history={history} category={category} match={match}/> 
           <NoResult/>
           </>
        )
    }
    return (
       <>
       
      <Route path={match.url} render={()=>( 
      <>
        <SearchBox history={history} category={category} match={match}/> 
        <SearchList data={searchData} value={category}/>
        {/* {console.log(searchData.length)} */}
        {maxPage&&pageList?
            <div>
                {
                    maxPage>5&&maxPage>searchData.length&&
                    <div className="pd-16-side bs"><button onClick={()=>{
                    nextPage()
                    }} className="detail-comment-more ">더보기<img src={"/img/More.svg"}/></button>
                    </div>
                }
            </div>
            /*<div className="pagenation"> 
                <a onClick={prevPage} className="justify-content-end"><div className="icon sm"><img src="/img/Left.svg"/></div></a>
                <ul>
                
               {
                pageList.map((i,key)=>(
                    <li key={key}><a style={selected(i)} className="none" onClick={()=>getPage(i)}>{i+1}</a></li>)
                )}
                </ul>
                <a  onClick={nextPage} className="justify-content-start"><div className="icon sm"><img src="/img/Right.svg"/></div></a>
            </div> */
      :<Loading/>}
        </>)}/>
      <Route path={`${match.url}+/view/:id`} component={View}/>
       </>
    );
};

export default Search;