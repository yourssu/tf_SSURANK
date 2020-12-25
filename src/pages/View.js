import React,{useState,useEffect} from 'react';
import { Link, Route } from 'react-router-dom';
import { VictoryLine,VictoryChart,VictoryTheme,VictoryContainer } from "victory";
import  LockIcon from '@material-ui/icons/Lock';
import { StaticDialog, useDialog } from 'react-st-modal';
import axios from "axios";
const View = ({match}) => {
    const [detailData, setDetailData] = useState();
    const [commentData, setCommentData] = useState();
    const [inputMajor,setInputMajor] = useState();
    const [inputText,setInputText] = useState();
    const [inputWhen,setInputWhen] = useState();
    const [sender,setSender] = useState(false);
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
      }
      const getDetailData = async () => {
        const response = await axios.get(`https://ssurank.herokuapp.com/ssurank/course/detail/${match.params.id}`);
        setDetailData(response.data.detailedCourse);
        console.log(response.data.detailedCourse);
    };
    const getCommentData = async (index) => {
        const response = await axios.get(`https://ssurank.herokuapp.com/ssurank/course/evaluation/recent/${match.params.id}/${index}`);
        setCommentData(response.data.evaluations);
        console.log(response.data.evaluations);
    };
    const dialog = useDialog();
    const postCommentData = async (value) => {
        const json = JSON.stringify({ 
            content:inputText,
            email:value,
            courseId:match.params.id,
            type:inputMajor,
            year:setInputWhen.substring(0, 4),
            semester:setInputWhen.substring(6, 7)
        });
        const response = await axios.post(`https://cors-anywhere.herokuapp.com/https://ssurank.herokuapp.com/ssurank/course/evaluation`,json, {
            headers: {
            'Content-Type': 'application/json'
            }});
        console.log(response.data.data);
        setPopup(false);
        window.location.reload(false);
    };
    const postReport = async () => {
        const json = JSON.stringify({ 
            content: "string",
            id: 0,
            reportCategory: "기타"
        });
        const response = await axios.post(`https://ssurank.herokuapp.com/ssurank/course/report`,json, {
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
    function changeInputWhen(e){
        setInputWhen(e.target.value)
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
        console.log(inputWhen);
        if(value&&inputWhen&&inputMajor&&inputText){
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
                sendDataComment(value)
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
        getCommentData(1);
    }, [])
   
    const caseR = ["plus",'zero','minus','none'];
    const [recent,setRecent]=useState(true);
    return (
        detailData?
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
                <span>{detailData.title}</span>
                
                <p>{detailData.name}·{detailData.department}</p>
            </div>
        </div>
        <Link to ={`/professor/view/${detailData.professorId}`}><button className="prof-detail-btn"><p>이 교수 평가 보러가기</p></button></Link>
        <div className="devider"></div>
        <div className="detail-graph">
            <div className="header">이 강의 지난 학기 평가</div>
            <VictoryChart
            
            >
            <VictoryLine   style={{
      data: { stroke:  "#3C95FF" },
      parent: { border: "1px solid #ccc"},
      height: 135 
    }} data={data} x="year" y="rank" labels={({ datum }) => {rank[datum.year]}}/>
            </VictoryChart>
        </div>
        <div className="devider"></div>
        <div className="detail-comment-input">
            <div className="header">이 강의 한 줄 평</div>
            <textarea onChange={changeInputText} onKeyDown={(e) => enterSubmit(e) } placeholder="여기에 한 줄 평을 작성해주세요."></textarea>
            <div className="detail-input-footer">
                <div>
            <select className="select-bar" onChange={changeInputMajor}  style={selectBar}>
                <option defaultValue>전공 여부</option>
                <option >본전공</option>
                <option >부전공</option>
                <option >타전공</option>
            </select>
            <select value={inputWhen} onChange={changeInputWhen} className="select-bar" style={selectBar}>
            <option defaultValue>수강학기</option>
                {detailData.historyCourses.map((index)=>
                    (index.semester==='FIRST'?<option> {index.year}년 1학기</option>:<option>{index.year}년 2학기</option>)
                )}
            </select>
            </div>
            <button class="submit-btn"onClick={()=>setPopup(true)}>작성</button>
            </div>
            
        </div>
        <div className="devider"></div>
        <div className="detail-comment-list">
            <div className="detail-comment-header">
                <button className={(recent?"selec-btn":"none-btn")}>최신순</button>
                 <button className={(recent?"none-btn":"selec-btn")}>추천순 <LockIcon color="#343A40" fontSize="small" /></button>
            </div>
        {commentData&&
            commentData.map((index)=>
                <div className="comment-wrapper">
                    <div className="comment-head"><span>{index.type}</span><p>{index.opt2}</p></div>
                    <div className="comment-contents">{index.content}</div>
                    <div className="comment-footer">추천<LockIcon color="#3C95FF"  style={{ fontSize: 15 }}/> · 비추천 <LockIcon color="#3C95FF"  style={{ fontSize: 15 }}/> · <button>신고</button></div>
                </div>
            )
        }
        <button className="detail-comment-more">더보기<img src={"/img/dropdown_Icon.svg"}/></button>
        </div>
        
        
       </>:<h1>로딩중</h1>
    );
};

export default View;