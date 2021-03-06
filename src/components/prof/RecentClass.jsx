import React from "react";
import PropTypes from 'prop-types';


const RecentClass = ({detailData}) =>{
    const firstChild = (index) =>{
        if(index==0){
            return(
            {marginLeft:'16px'}
            )
        }
    }
    const semester={
        'FIRST':0,
        'SECOND':1
    }
return(
    <div className="detail-prof-percent mg-12-bt">
        <div className="pd-16-side ">
            <p>최근 3년간 개설한 강의수 <span className="color bold">상위 {detailData.topPercent}%</span></p>
            <p>분반을 포함하여<span className="bold"> {detailData.courseCnt}개</span></p>
            </div>
            <div className="detail-prof-percent-list">
            {detailData.sessions
            .sort((a,b)=>
                (a.year*10+semester[a.semester] <= b.year*10+semester[b.semester])?1:-1
            ).map((index,key)=><div style={firstChild(key)} key={key}>{index.year}년 {index.semester==='FIRST'?<>1학기</>:<>2학기</>}</div>)}
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