import React from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
const ClassList = ({detailClassData}) =>{
    const semester={
        'FIRST':0,
        'SECOND':1
    }
    const caseR = ["plus",'zero','minus','none'];
      return(
        <div className="detail-prof-class-list pd-16-side">
        <div className="header">이 교수가 개설한 강의</div>
        <div className="detail-prof-class-list-wrapper">{
            detailClassData
            .sort((a,b)=>
                (a.year*10+semester[a.semester] <= b.year*10+semester[b.semester])?1:-1
            )
            .map((rank,key) => (
            <Link key={key} to ={'/class/view/'+rank.courseId}>
            <div className={"dropdown-block" + (key === detailClassData.length-1?" border-bottom":" ")}> 
                    <div className="block-left"><img className={"rank-img "+ rank.ranking.substring(0,1) +" "+ caseR[parseInt((rank.ranking.substring(1,2)))]} src={"/img/"+rank.ranking.substring(0,1) +".png"}/></div>
                    <div className="block-center">
                        <span>{rank.title}</span>
                        
                        <p>{rank.department}·{rank.name}</p>
                    </div>
                    <div className="block-right">
                        <p>{rank.year}년 {(rank.semester==='SECOND'?<>2학기</>:<>1학기</>)}</p>
                    </div>
                </div>
            </Link>
        ))}
        </div>
    </div>
      );
  }
ClassList.propTypes = {
    detailClassData:PropTypes.array.isRequired,
}
export default ClassList;