import React,{useState,useEffect} from "react";
import { render } from "react-dom";
import { Link, Route } from 'react-router-dom';
const SearchList = (props)=>{
    const caseR = ['none',"plus",'zero','minus'];
    const college=['1','2','3'];
    //1 : 강의별 , 2 : 교수별, 3: 학과랭킹
    return(
        <>
         <div className="divider"></div>
        <div className="search-result ">
            <div className="result-header bs pd-16-side">
                <div className= "result-left"><span>티어</span> <span>{(props.value === 1 ?<>강의</>:<>교수</>)}</span> </div>
                <div className="">{(props.value === 1 ?<>최근 개설 학기</>:<>강의수</>)}</div>
            </div>
            <>
            {props.data && props.data.map(rank => (
                (props.value!==1?
                <Link to ={'/professor/view/'+rank.id}>
                <div className="dropdown-block bs mg-16-side"> 
                        <div className="block-left"><img className={"rank-img "+ caseR[parseInt((rank.ranking.substring(1,2)))]} src={"/img/"+rank.ranking.substring(0,1) +".png"}/></div>
                        <div className="block-center mg-16-side">
                            <span>{rank.name}</span>
                            
                            <p>{rank.department}·{rank.position}</p>
                        </div>
                        <div className="block-right" style={{width:'36px'}}>
                            <p>{rank.courseCnt}</p>
                        </div>
                    </div>
                </Link>
                :<Link to ={'/class/view/'+rank.courseId}>
                <div className="dropdown-block pd-16-side bs"> 
                        <div className="block-left"><img className={"rank-img none "} src={"/img/"+rank.ranking.substring(0,1) +".png"}/></div>
                        <div className="block-center mg-16-side">
                            <span>{rank.title}</span>
                            
                            <p>{rank.name}·{rank.department}</p>
                        </div>
                        <div className="block-right" style={{width:'70px'}}>
                            <p>{rank.year%2000}년 {(rank.semester==='SECOND'?<>2학기</>:<>1학기</>)}</p>
                        </div>
                    </div>
                    </Link>)
            ))}
            </>
        </div>
       
        </>
    )
}
export default SearchList;