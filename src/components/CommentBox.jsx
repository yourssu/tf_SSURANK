import React,{useState} from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const CommentBox = ({setPopup,semester})=>{
    const [inputMajor,setInputMajor] = useState();
    const [inputText,setInputText] = useState();
    const [inputWhen,setInputWhen] = useState();
    const selectBar = {
        background: 'url(./img/dropdown_Icon.svg) no-repeat 95% 50%'
      }
    function enterSubmit(e){
        if (e.keyCode === 13) {
            setPopup(true)
        }
    }
    return (
        <div className="detail-comment-input ">
            
            <div className="bs ">
            <div className="header mg-16-side" >이 {semester?<>강의</>:<>교수</>} 한 줄 평</div>
            <div className="detail-input-box">
                {(navigator.userAgent.indexOf("SSURANK")>-1)?
                <></>:
                <div className="cover-ground bs pd-16-side">
                    <p><span>이 강의 좋았어요!</span></p>
                    <p>한 줄 평 기능이 곧 추가됩니다.</p>
                    <a href="https://forms.gle/YuUjj9dN5nGLfmzp8"  rel="noreferrer" target="_blank"><button className=""><img className="icon sm" src="/img/GroundLogo.png"/>한 줄 평 업데이트 알림받기</button></a>
                </div>}
                <textarea onChange={(e)=>setInputText(e.target.value)} onKeyDown={(e) => enterSubmit(e) } placeholder="여기에 한 줄 평을 작성해주세요."></textarea>
                <div className="detail-input-footer">
                    <div>
                <select className="select-bar" onChange={(e)=>setInputMajor(e.target.value)}  style={selectBar}>
                    <option defaultValue>전공 여부</option>
                    <option >주전공</option>
                    <option >부전공</option>
                    <option >복수전공</option>
                    <option >타전공</option>
                </select>
                {semester&&
                <select value={inputWhen} onChange={(e)=>setInputWhen(e.target.value)} className="select-bar" style={selectBar}>
                <option defaultValue>수강학기</option>
                    {semester.map((index,key)=>
                        (index.semester==='FIRST'?<option key={key}> {index.year}년 1학기</option>:<option key={key}>{index.year}년 2학기</option>)
                    )}
                </select>}
                </div>
                
                <button className="submit-btn">작성</button>
                </div>
                </div>
            </div>
        </div>
    )
}
CommentBox.propTypes = {
    setPopup:PropTypes.func.isRequired,
    semester:PropTypes.array
  }
export default CommentBox;