import React from "react";
import PropTypes from 'prop-types';
const RecentClass = ({detailData}) =>{
return(
    <div className="detail-prof-percent pd-16-side mg-12-bt">
            <p>최근 3년간 개설한 강의수 <span className="color bold">상위 {detailData.topPercent}%</span></p>
            <p className="bold">분반을 포함하여 {detailData.courseCnt}개</p>
            <div className="detail-prof-percent-list">
            {detailData.sessions.map((index,key)=><div key={key}>{index.year}년 {index.semester==='FIRST'?<>1학기</>:<>2학기</>}</div>)}
            </div>
           
        </div>
)

}

RecentClass.propTypes = {
    detailData:PropTypes.shape({
        courseCnt:PropTypes.number.isRequired,
        sessions:PropTypes.array.isRequired,
        topPercent:PropTypes.number.isRequired
    })
}

export default RecentClass;