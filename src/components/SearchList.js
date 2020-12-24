import React,{useState,useEffect} from "react";
import { render } from "react-dom";
import { Link, Route } from 'react-router-dom';
const SearchList = (props)=>{
    const caseR = ["plus",'zero','minus',''];
    const college=['1','2','3'];
    //1 : 강의별 , 2 : 교수별, 3: 학과랭킹
    return(
        <>
         <div className="devider"></div>
        <div className="search-result">
            <div className="result-header">
                <div className= "result-left"><span>티어</span> <span>{(props.value === 1 ?<>강의</>:<>교수</>)}</span> </div>
                <div className="">{(props.value === 1 ?<>최근 개설 학기</>:<>강의수</>)}</div>
            </div>
            <>{console.log(props.data)}
            {props.data && props.data.map(rank => (
                (props.value!==1?
                <Link to ={'/professor/view/'+rank.id}>
                <div className="dropdown-block"> 
                        <div className="block-left"><img className={"rank-img "+ rank.ranking.substring(0,1) +" "+ caseR[parseInt((rank.ranking.substring(1,2)))]} src={"/img/"+rank.ranking.substring(0,1) +".svg"}/></div>
                        <div className="block-center">
                            <span>{rank.name}</span>
                            
                            <p>{rank.department}·{rank.position}</p>
                        </div>
                        <div className="block-right">
                            <p>{rank.courseCnt}</p>
                        </div>
                    </div>
                </Link>
                :<Link to ={'/'+(props.value===1?'class':'professor')+'/view/'+rank.courseId}>
                <div className="dropdown-block"> 
                        <div className="block-left"><img className={"rank-img "+ rank.ranking.substring(0,1) +" "+ caseR[parseInt((rank.ranking.substring(1,2)))]} src={"/img/"+rank.ranking.substring(0,1) +".svg"}/></div>
                        <div className="block-center">
                            <span>{rank.title}</span>
                            
                            <p>{rank.department}·{rank.name}</p>
                        </div>
                        <div className="block-right">
                            <p>{rank.year} - {(rank.semester==='SEMESTER'?<>2학기</>:<>1학기</>)}</p>
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