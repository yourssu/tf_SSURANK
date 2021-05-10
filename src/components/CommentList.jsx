import React, { useState } from 'react'
import PropTypes from 'prop-types';

const CommentList = ({ setPopup, date, sendAction, state, commentData, setSort }) => {
    const commentData_ = [{
        type: '슈랭크',
        content: '한 줄 평 기능 업데이트를 위해 열심히 준비중입니다. 위 버튼을 눌러 업데이트 알림을 신청해주세요!',
    }]
    const [recent, setRecent] = useState(true);
    return (
        <div className="detail-comment-list">
            <div className="detail-comment-header">
                <button className={(recent ? "selec-btn" : "none-btn")} onClick={() => { setRecent(true); setSort(0) }}>최신순</button>
                <button className={(recent ? "none-btn" : "selec-btn")} onClick={() => { setRecent(false); setSort(1) }}>추천순</button>
            </div>
            {commentData &&
                commentData.map((index, key) =>
                    <div key={key} className="comment-wrapper">
                        <div className="comment-head">
                            <span>{index.studentType}</span>
                            {state == 0 && <p>{index.year}년 {'FIRST' === 'FIRST' ? <>1학기</> : <>2학기</>}</p>}
                        </div>
                        <div className="comment-contents">{index.content}</div>
                        <div className="comment-footer">
                            <div className="comment-btn">
                                <button onClick={() => sendAction(0)}> 추천</button>
                                ·
                                <button onClick={() => sendAction(1)} >비추천</button>
                                ·
                                {index.isMine ? <button onClick={() => sendAction(3)}>삭제</button> : <button onClick={() => sendAction(2)}>신고</button>}
                            </div>
                            <div >
                                <span><div style={{ margin: 'auto' }}><img src={"/img/thumbsUp.png"} /></div><p>{index.thumbsUp}</p></span>
                                <span><div style={{ margin: 'auto' }}><img src={"/img/thumbsDown.png"} /></div><p>{index.thumbsDown}</p></span>
                            </div>
                        </div>
                    </div>
                )
            }
            {/*<button className="detail-comment-more">더보기<img src={"/img/More.svg"}/></button>*/}
        </div>

    )
}

CommentList.propTypes = {
    commentData: PropTypes.array.isRequired,
    setPopup: PropTypes.func,
    date: PropTypes.number
}

export default CommentList;