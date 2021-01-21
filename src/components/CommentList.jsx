import React,{useState} from 'react'
import PropTypes from 'prop-types';

const CommentList = ({commentData,setPopup,date})=>{
    const [recent,setRecent]=useState(true);
    return(
        <div className="detail-comment-list">
            <div className="detail-comment-header">
                <button className={(recent?"selec-btn":"none-btn")} onClick={()=>setRecent(true)}>최신순</button>
                 <button className={(recent?"none-btn":"selec-btn")} onClick={()=>setRecent(false)}>추천순</button>
            </div>
        {commentData&&
            commentData.map((index,key)=>
                <div key={key} className="comment-wrapper">
                <div className="comment-head"><span>{index.type}</span>{date?<p>{(index.createdAt).substr( 0, 10 ).replace(/-/g, '.')}</p>:<p>1900년 {'FIRSTS'==='FIRST'?<>1학기</>:<>2학기</>}</p>}</div>
                <div className="comment-contents">{index.content}</div>
                <div className="comment-footer">추천 · 비추천 · <button onClick={()=>setPopup(true)}><span>신고</span></button></div>
            </div>
            )
        }
        <button className="detail-comment-more">더보기<img src={"/img/dropdown_Icon.svg"}/></button>
        </div>
       
    )
}

CommentList.propTypes={
   commentData:PropTypes.array.isRequired,
    setPopup:PropTypes.func,
    date:PropTypes.bool
}

export default CommentList;