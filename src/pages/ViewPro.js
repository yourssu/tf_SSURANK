import React,{useState,useEffect} from 'react';
import { Link, Route } from 'react-router-dom';
import  LockIcon from '@material-ui/icons/Lock';
import { StaticDialog, useDialog } from 'react-st-modal';
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
        console.log(response.data.detailedProfessor);
    };
    const getProfClassData = async (index) => {
        const response = await axios.get(`https://ssurank.herokuapp.com/ssurank/professor/detail/${match.params.id}/${index}`);
        setDetailClassData(response.data);
        console.log(response.data);
    };
    const getCommentData = async (index) => {
        const response = await axios.get(`https://ssurank.herokuapp.com/ssurank/professor/evaluation/recent/${match.params.id}/${index}`);
        setCommentData(response.data.evaluations);
        console.log(response.data.evaluations);
    };
    const dialog = useDialog();
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
    function sendDataComment(value){
        console.log(value);
        console.log(inputText);
        console.log(inputMajor);
        if(inputMajor&&inputText&&value){
            setIsPending(true);
            postCommentData(value);
            
        }
        else{
            alert('데이터를 넣어주세요')
        }
    }

    function CustomDialogContent() {
        
        const [value, setValue] = useState();
        return (
          <div className='modal-window'>
              <p className='modal-text'>한 줄 평 작성 이벤트 참여 및 본인이 작성한 한 줄 평 수정, 삭제 시 아래 이메일을 통해 본인 인증이 이루어집니다.</p>
            <input className="modal-input-bar"
              type="email"
              placeholder="이메일을 입력해주세요."
              onChange={(e)=>{setValue(e.target.value)}}
            />
            <button className="modal-button full bg-color"
              onClick={() => {
                // Сlose the dialog and return the value
                if(!isPending){
                    sendDataComment(value);
                }
              }}
            >
              작성
            </button>
            <Link to="/"><div className="modal-footer"><p>통합 서비스 이용 약관 및 운영 정책에 동의</p><p>보기</p></div></Link>
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
        title="한 줄 평 작성"
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
            <p className="bold">분반을 포함한 강의 개수 : {detailData.courseCnt}개</p>
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
                            <p>{rank.year} - {(rank.semester==='SECOND'?<>2학기</>:<>1학기</>)}</p>
                        </div>
                    </div>
                </Link>
            ))}
            </div>
        </div>
        <div className="devider"></div>
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
            <button class="submit-btn" onClick={()=>setPopup(true)}>작성</button>
            </div>
            
        </div>
        <div className="detail-comment-list">
            <div className="detail-comment-header">
                <button className={(recent?"selec-btn":"none-btn")} onClick={()=>setRecent(true)}>최신순</button>
                 <button className={(recent?"none-btn":"selec-btn")}>추천순 <LockIcon color="#343A40" fontSize="small" /></button>
            </div>
        {commentData&&
            commentData.map((index)=>
                <div className="comment-wrapper">
                    <div className="comment-head"><span>{index.type}</span><p>{(index.createdAt).substr( 0, 10 ).replace(/-/g, '.')}</p></div>
                    <div className="comment-contents">{index.content}</div>
                    <div className="comment-footer">추천<LockIcon color="#3C95FF"  style={{ fontSize: 15 }}/> · 비추천 <LockIcon color="#3C95FF"  style={{ fontSize: 15 }}/>·<button>신고</button></div>
                </div>
            )
        }
        <button className="detail-comment-more">더보기<img src={"/img/dropdown_Icon.svg"}/></button>
        </div>
        
        
       </>:<h1>로딩중</h1>
    );
};

export default View;