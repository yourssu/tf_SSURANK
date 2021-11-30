import React,{useEffect,useState} from 'react';
import { Link, Route } from 'react-router-dom';
import SearchList from '../components/SearchList'
import View from './View'
import SearchBox from '../components/SearchBox';
import Loading from '../components/Loading'
import axios from "axios";
import NoResult from '../components/NoResult';
import { ContactSupportOutlined } from '@material-ui/icons';

const Search = ({history,match,category}) => {
    const [searchData, setSearchData] = useState([]);
    const [pageIndex,setPageIndex]=useState(0);
    const [keyword,setKeyword] = useState('');
    const [maxIndex,setMaxIndex] = useState();
    const [pageList,setPageList]=useState([0]);

    const getSearchList = async (index) => {
        const uri = `https://test.ground.yourssu.com/timetable/v1/rank/courses?search=${match.params.id}&page=${index}&size=10`;
        const response = await axios.get(encodeURI(uri));
        const totalIndex = response.data.page.totalPages-1;
        setMaxIndex(totalIndex);  
        
        if(keyword !== match.params.id){
            setSearchData(response.data.courses);
            setKeyword(match.params.id)
        }
        else{
            setSearchData(response.data.courses);
        }
    };
    const getSearchProList = async (index) => {
        const uri=`https://test.ground.yourssu.com/timetable/v1/rank/professors?name=${match.params.id}&page=${index}&size=10`
        const response = await axios.get(encodeURI(uri));
        const totalIndex = response.data.page.totalPages-1;
        setMaxIndex(totalIndex);  

        if(keyword !== match.params.id){
            setSearchData(response.data.professors);
            setKeyword(match.params.id)
        }
        else{
            setSearchData(response.data.professors);
        }
    };

    const selected = (index)=>{
        if(pageIndex==index){
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
        if(pageIndex!==maxIndex){
            let temp=pageIndex;
            setPageIndex(pageIndex+1);
            if((temp+1)%5===0) { //마지막 페이지가 있는 리스트 처리
                maxIndex-temp<=5 && 0< maxIndex-temp? setPageList(Array.range(temp+1, maxIndex+1)) : setPageList(Array.range(temp+1, temp+6))  
            }
            getPage(temp+1);
        }
    }

    const prevPage = ()=>{
        if(pageIndex!==0){
            let temp = pageIndex;
            setPageIndex(pageIndex-1);
            if(temp%5===0) setPageList(Array.range(temp-5, temp))
            getPage(temp-1);
        }
    }

    const getPage = (index)=>{
        setPageIndex(index);
        if(category===1){
            getSearchList(index);
        }
        else if(category===0){
            getSearchProList(index);
        }
    }

    useEffect(()=>{
        if(category===1){
            getSearchList(0);
        }
        else if(category===0){
            getSearchProList(0);
        }

    },[match.params.id]);

    useEffect(()=>{
        maxIndex > 4 ? setPageList([...Array.range(0, 5)]) : setPageList([...Array.range(0, maxIndex+1)]);
    },[maxIndex])

    if(searchData.length===0){
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
        {console.log(searchData.length)}
        {/* {maxPage&&pageList?
            <div>
                {
                    maxPage>5&&maxPage>searchData.length&&
                    <div className="pd-16-side bs">
                        <button onClick={()=>{nextPage()}} className="detail-comment-more ">
                            더보기
                            <img src={"/img/More.svg"}/>
                        </button>
                    </div>
                }
            </div>
      :<Loading/>} */}
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
        </>)}/>
      <Route path={`${match.url}+/view/:id`} component={View}/>
       </>
    );
};

export default Search;