import React,{useState,useEffect} from 'react';
import { Link, Route } from 'react-router-dom';
import SearchList from '../components/SearchList'
import { VictoryLine,VictoryChart,VictoryTheme,VictoryContainer } from "victory";
import  LockIcon from '@material-ui/icons/Lock';
import Search from './Search'
import { StaticDialog, useDialog } from 'react-st-modal';
import axios from "axios";
const View = ({match}) => {
    const [detailData, setDetailData] = useState();
    const [detailClassData, setDetailClassData] = useState();
    const [commentData, setCommentData] = useState();
    const [inputMajor,setInputMajor] = useState();
    const [inputText,setInputText] = useState();
    const [inputEmail,setInputEmail] = useState();
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
        const response = await axios.get(`https://ssurank.herokuapp.com/ssurank/professor/evaluation/recent/${match.params.id}/${{index}}`);
        setCommentData(response.data.detailedProfessor);
        console.log(response.data.detailedProfessor);
    };
    const postCommentData = async () => {
        const json = JSON.stringify({ 
            content:inputText,
            email: inputEmail,
            professorId: match.params.id,
            type: inputMajor
        });
        const response = await axios.post(`https://ssurank.herokuapp.com​/ssurank​/professor​/evaluation`,json, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }});
        console.log(response.data.data);
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
    function sendDataComment(){
        console.log(inputWhen);
        console.log(inputText);
        console.log(inputMajor);
        if(inputMajor&&inputText&&inputEmail){
            postCommentData();
        }
        else{
            alert('데이터를 넣어주세요')
        }
    }

    function CustomDialogContent() {
        const dialog = useDialog();
        const [value, setValue] = useState();
        return (
          <div>
              <p>한 줄 평 작성 이벤트 참여 및 본인이 작성한 한 줄 평 수정, 삭제 시 아래 이메일을 통해 본인 인증이 이루어집니다.</p>
            <input
              type="email"
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <button
              onClick={() => {
                // Сlose the dialog and return the value
                dialog.close(value);
              }}
            >
              작성
            </button>
            <Link to="/">통합 서비스 이용 약관 및 운영 정책에 동의</Link>
          </div>
        );
      }
      
    useEffect(() => {
        getDetailData();
        getProfClassData(1);
        //getCommentData(1);
    }, [])
    const sample= {top:1,name:"오픈소스기초설계", major:"스마트시스템소프트웨어학과", person:"김강희", rank:"A1",season:"19년 2학기" ,
                    comment:[
                        {opt1:"본전생",opt2:"2020년 2학기",contents:"동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세. 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세. 남산 위에 저 소나무, 철갑을 두른 듯 바람 서리 불변함은 우리 기상일세. 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세."},
                        {opt1:"본전생",opt2:"2020년 2학기",contents:"동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세. 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세. 남산 위에 저 소나무, 철갑을 두른 듯 바람 서리 불변함은 우리 기상일세. 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세."},
                        {opt1:"본전생",opt2:"2020년 2학기",contents:"한국인이라면 들어보세요"},
                        {opt1:"본전생",opt2:"2020년 2학기",contents:"한국인이라면 들어보세요"},
                        {opt1:"본전생",opt2:"2020년 2학기",contents:"한국인이라면 들어보세요"},
                        {opt1:"본전생",opt2:"2020년 2학기",contents:"한국인이라면 들어보세요"},
                    ]
};
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
            <div className="detail-rank-logo"><img className={"rank-img "+ "none"} src={"/img/"+detailData.ranking.substring(0,1) +".svg"}/></div>
            <div className="detail-info">
                <span>{detailData.name}</span>
                
                <p>{detailData.department}·{detailData.position}</p>
            </div>
        </div>
        <div className="detail-prof-percent">
            <p>최근 3년간 개설한 강의수 <span className="color bold">상위 {detailData.topPercent}%</span></p>
            <p className="bold">{detailData.courseCnt}개</p>
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
                        <div className="block-left"><img className={"rank-img "+ rank.ranking.substring(0,1) +" "+ caseR[parseInt((rank.ranking.substring(1,2)))]} src={"/img/"+rank.ranking.substring(0,1) +".svg"}/></div>
                        <div className="block-center">
                            <span>{rank.title}</span>
                            
                            <p>{rank.department}·{rank.name}</p>
                        </div>
                        <div className="block-right">
                            <p>{rank.year} - {(rank.semester==='SEMESTER'?<>2학기</>:<>1학기</>)}</p>
                        </div>
                    </div>
                </Link>
            ))}
            </div>
        </div>
        <div className="devider"></div>
        <div className="detail-comment-input">
            <div className="header">이 교수 한 줄 평</div>
            <textarea onChange={changeInputText} placeholder="여기에 한 줄 평을 작성해주세요."></textarea>
            <div className="detail-input-footer">
                <div>
            <select onChange={changeInputMajor} className="select-bar"style={selectBar}>
                <option selected>전공 여부</option>
                <option >본전생</option>
                <option >부전생</option>
                <option >타과생</option>
            </select>
            </div>
            <button class="submit-btn" onClick={()=>setPopup(true)}>작성</button>
            </div>
            
        </div>
        <div className="detail-comment-list">
            <div className="detail-comment-header">
                <button className={(recent?"selec-btn":"none-btn")} onClick={()=>setRecent(true)}>최신순</button>
                 <button className={(recent?"none-btn":"selec-btn")} onClick={()=>setRecent(false)}>추천순 <LockIcon color="#343A40" fontSize="small" /></button>
            </div>
        {recent&&
            sample.comment.map((index)=>
                <div className="comment-wrapper">
                    <div className="comment-head"><span>{index.opt1}</span><p>{index.opt2}</p></div>
                    <div className="comment-contents">{index.contents}</div>
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