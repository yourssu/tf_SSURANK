import React,{useState,useEffect} from 'react';
import { Link, Route } from 'react-router-dom';
import  LockIcon from '@material-ui/icons/Lock';
import { StaticDialog, useDialog } from 'react-st-modal';
import Loading from '../components/Loading'
import axios from "axios";
const View = ({match}) => {
    const [detailData, setDetailData] = useState();
    const [detailClassData, setDetailClassData] = useState();
    const [commentData, setCommentData] = useState();
    const [inputMajor,setInputMajor] = useState();
    const [inputText,setInputText] = useState();
    const [isPending,setIsPending] = useState(false);
    const [popup,setPopup] = useState(false);
    const rank = ['U','A','B','C','D'];
    const data = [
    { year: 1, rank: 1 },//1 -> A , 2 -> B , 3 -> C
      { year: 2, rank: 2 },
      { year: 3, rank: 2 },
      { year: 4, rank: 1 },
      { year: 5, rank: 3 }
      ];
      const selectBar = {
        background: 'url(./img/dropdown_Icon.svg) no-repeat 95% 50%'
      }///ssurank/professor/evaluation/recent/{professorId}/{page}
      const getDetailData = async () => {
        const response = await axios.get(`https://ssurank.herokuapp.com/ssurank/professor/detail/${match.params.id}`);
        setDetailData(response.data.detailedProfessor);
        //console.log('professor:');
        //console.log(response.data);
    };
    const getProfClassData = async (index) => {
        const response = await axios.get(`https://ssurank.herokuapp.com/ssurank/professor/detail/${match.params.id}/${index}`);
        setDetailClassData(response.data.detailedCourses);
        //console.log(response.data);
    };
    const getCommentData = async (index) => {
        const response = await axios.get(`https://ssurank.herokuapp.com/ssurank/professor/evaluation/recent/${match.params.id}/${index}`);
        setCommentData(response.data.evaluations);
        //console.log(response.data.evaluations);
    };
    const postCommentData = async (value) => {
        const json = JSON.stringify({ 
            content:inputText,
            email:value,
            professorId:match.params.id,
            type:inputMajor
        });
        const response = await axios.post(`https://cors-anywhere.herokuapp.com/https://ssurank.herokuapp.com/ssurank/professor/evaluation`,json, {
            headers: {
            'Content-Type': 'application/json'
            }});
        setIsPending(false);
        setPopup(false);
        window.location.reload(false);
    };
    const postReport = async () => {
        const json = JSON.stringify({ 
            content: "string",
            id: 0,
            reportCategory: "기타"
        });
        const response = await axios.post(`https://ssurank.herokuapp.com/ssurank/professor/evaluation/report`,json, {
            headers: {
              'Content-Type': 'application/json'
            }});
    };
    function changeInputMajor(e){
        setInputMajor(e.target.value)
    }
    function changeInputText(e){
        setInputText(e.target.value)
    }
    function changeInputEmail(e){
        setInputEmail(e.target.value)
    }
    function enterSubmit(e){
        if (e.keyCode === 13) {
            setPopup(true)
        }
    }
    function CheckBeforePopup(){
       
        if(!inputMajor&&!inputText){
            alert('필수 정보를 입력해주세요.')
        }
        else if(!inputMajor){
            alert('전공 여부를 선택해주세요.')
        }
        else if(!inputText){
            alert('한 줄 평 내용을 작성해주세요.')
        }
        else{
            setPopup(true)
        }
    }
    function sendDataComment(value){
        //console.log(value);
        //console.log(inputText);
        //console.log(inputMajor);
        
        if(!value){
            alert('신고 사유를 입력해주세요.')
        }
        else {
            setIsPending(true);
            postCommentData(value);
            
        }
    }

    function CustomDialogContent() {
        
        const [value, setValue] = useState();
        return (
          <div className='modal-window'>
               <div  className='dropdown-header'>
                  <div className='header'>신고</div>
                <button onClick={()=>setPopup(false)} className='dropdown_icon'>
                    <img src="./img/close_Icon.png"/>
                </button>
              </div>
              <p className='modal-text'>폭력성</p>
              <p className='modal-text'>스팸</p>
              <p className='modal-text'>혐오조장</p>
              <p className='modal-text'>기타</p>
            {
                <>
            <textarea className="modal-input-bar"
              placeholder="신고 사유를 입력해주세요."
              onChange={(e)=>{setValue(e.target.value)}}
            />
            <button className="modal-button full bg-color"
              onClick={() => {
                if(!isPending){
                    sendDataComment(value)
                }
              }}
            >
              작성
            </button>
            </>

            }
          </div>
        );
      }function CustomDialogContent() {
        
        const [value, setValue] = useState();
        return (
          <div className='modal-window'>
               <div  className='dropdown-header'>
                  <div className='header'>신고</div>
                <button onClick={()=>setPopup(false)} className='dropdown_icon'>
                    <img src="./img/close_Icon.png"/>
                </button>
              </div>
              <p className='modal-text'>폭력성</p>
              <p className='modal-text'>스팸</p>
              <p className='modal-text'>혐오조장</p>
              <p className='modal-text'>기타</p>
            {
                <>
            <textarea className="modal-input-bar"
              placeholder="신고 사유를 입력해주세요."
              onChange={(e)=>{setValue(e.target.value)}}
            />
            <button className="modal-button full bg-color"
              onClick={() => {
                if(!isPending){
                    sendDataComment(value)
                }
              }}
            >
              작성
            </button>
            </>

            }
          </div>
        );
      }
      
    useEffect(() => {
        getDetailData();
        getProfClassData(1);
        getCommentData(1);
    }, [])

    const caseR = ["plus",'zero','minus','none'];
    const [recent,setRecent]=useState(true);
    return (detailData?
       <>
        
      <StaticDialog
        isOpen={popup}
        onAfterClose={(result) => {
          setPopup(false);

          // do something with dialog result
        }}
      >
        {/* see previous demo */}
        <CustomDialogContent />
      </StaticDialog>
        <div className="detail-box">
            <div className="detail-rank-logo"><img className={"rank-img "+ "none"} src={"/img/"+detailData.ranking.substring(0,1) +".png"}/></div>
            <div className="detail-info">
                <span>{detailData.name}</span>
                
                <p>{detailData.department}·{detailData.position}</p>
            </div>
        </div>
        <div className="detail-prof-percent">
            <p>최근 3년간 개설한 강의수 <span className="color bold">상위 {detailData.topPercent}%</span></p>
            <p className="bold">분반을 포함하여 {detailData.courseCnt}개</p>
            <div className="detail-prof-percent-list">
            {detailData.sessions.map(index=><div>{index.year}년 {index.semester==='FIRST'?<>1학기</>:<>2학기</>}</div>)}
            </div>
           
        </div>
        <div className="detail-prof-class-list">
            <div className="header">이 교수가 개설한 강의</div>
            <div className="detail-prof-class-list-wrapper">{
            detailClassData && detailClassData.map((rank,key) => (
                <Link to ={'/class/view/'+rank.courseId}>
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
        <div className="divider"></div>
        <div className="detail-comment-input">
            <div className="header">이 교수 한 줄 평</div>
            <textarea onChange={changeInputText} onKeyDown={(e) => enterSubmit(e) } placeholder="여기에 한 줄 평을 작성해주세요."></textarea>
            <div className="detail-input-footer">
                <div>
            <select onChange={changeInputMajor} className="select-bar"style={selectBar}>
                <option defaultValue>전공 여부</option>
                <option >본전공</option>
                <option >부전공</option>
                <option >복수전공</option>
                <option >타전공</option>
            </select>
            </div>
            <button class="submit-btn">작성</button>
            </div>
            
        </div>
        <div className="detail-comment-list">
            <div className="detail-comment-header">
                <button className={(recent?"selec-btn":"none-btn")} onClick={()=>setRecent(true)}>최신순</button>
                 <button className={(recent?"none-btn":"selec-btn")} onClick={()=>setRecent(false)}>추천순</button>
            </div>
        {commentData&&
            commentData.map((index)=>
                <div className="comment-wrapper">
                    <div className="comment-head"><span>{index.type}</span><p>{(index.createdAt).substr( 0, 10 ).replace(/-/g, '.')}</p></div>
                    <div className="comment-contents">{index.content}</div>
                    <div className="comment-footer">추천 · 비추천 · <button onClick={()=>setPopup(true)}><span>신고</span></button></div>
                </div>
            )
        }
        <button className="detail-comment-more">더보기<img src={"/img/dropdown_Icon.svg"}/></button>
        </div>
        
        
       </>:<Loading/>
    );
};

export default View;