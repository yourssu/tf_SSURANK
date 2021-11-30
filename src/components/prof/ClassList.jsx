import React from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
const ClassList = ({detailClassData, profData}) =>{

      return(
        <div className="detail-prof-class-list pd-16-side">
        <div className="header">이 교수가 개설한 강의</div>
        <div className="detail-prof-class-list-wrapper">{
            detailClassData.map((rank, key) => (
            <Link key={key} to ={'/class/view/'+rank.courseId}>
               
            <div className={"dropdown-block" + (key === detailClassData.length-1?" border-bottom":" ")}> 
                    <div className="block-left"><img className={"rank-img none"}src={"/img/"+rank.ranking.substring(0,1) +".png"}/></div>
                    <div className="block-center">
                        <span>{rank.title}</span>
                        {/* 이름이랑 과 어떻게 보여줄지 고민.. */}
                        <p>{profData.department}·{profData.name}</p>
                    </div>
                    <div className="block-right">
                        <p>{rank.year%2000}년 {(rank.semester==='SECOND'?<>2학기</>:<>1학기</>)}</p>
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