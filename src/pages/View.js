import React,{useState,useEffect} from 'react';
import { Link, Route } from 'react-router-dom';
import { VictoryLine,VictoryChart,VictoryArea,VictoryTheme,VictoryContainer,VictoryAxis } from "victory";
import  LockIcon from '@material-ui/icons/Lock';
import { StaticDialog, useDialog } from 'react-st-modal';
import axios from "axios";
import Loading from '../components/Loading'
const View = ({match}) => {
    const [detailData, setDetailData] = useState();
    const [commentData, setCommentData] = useState();
    const [inputMajor,setInputMajor] = useState();
    const [inputText,setInputText] = useState();
    const [inputWhen,setInputWhen] = useState();
    const [isPending,setIsPending] = useState(false);
    const [popup,setPopup] = useState(false);
    const [rankData,setRankData]=useState(false);
    const [graphData,setGraphData]=useState(false);
    const [yearData,setYearData]=useState(false);
    const [width, setWidth] = useState(608)
    //const rank = {'A0':10,'A1':9,'A2':8,'B0':7,'B1':6,'B2':5,'C0':4,'C1':3,'C2':2,'D':1,'U':0};
    const rank = {'A0':4,'B0':3,'C0':2,'D':1,'U':0};
    const rankName=['U','D','C','B','A'];
    const year = {'FIRST':'01','SECOND':'02'}
    const data = [
    { year: 1, rank: 1 },//A+ A0 A- B+ B0 B- C+ C0 C- D U -> 10 9 8 7 6 5 4 3 2 1
      { year: 2, rank: 2 },
      { year: 3, rank: 2 },
      { year: 4, rank: 1 },
      { year: 5, rank: 3 }
      ];
      const selectBar = {
        background: 'url(./img/dropdown_Icon.svg) no-repeat 95% 50%'
      }
      const updateWidth = (ev) => {
          if(ev.target.innerWidth>=608){
            setWidth(608)
          }
        else{setWidth(ev.target.innerWidth)}
    }
      const getDetailData = async () => {
        const response = await axios.get(`https://ssurank.herokuapp.com/ssurank/course/detail/${match.params.id}`);
        setDetailData(response.data.detailedCourse);
        console.log(response.data.detailedCourse.historyCourses)
        console.log(
            response.data.detailedCourse.historyCourses.map(
                (index,key)=>(
                   {year: (String(index.year)).substr(2,4)+'/'+year[index.semester],
                   ranking: rank[index.ranking]}
                    )))
        setRankData( response.data.detailedCourse.historyCourses.map(
            (index,key)=>(
               {year: (String(index.year)).substr(2,4)+'/'+year[index.semester],
                ranking: rank[index.ranking]
            }
                )))
        setYearData(response.data.detailedCourse.historyCourses.map(({year,semester})=>({year,semester})))
        }
    const getCommentData = async (index) => {
        const response = await axios.get(`https://ssurank.herokuapp.com/ssurank/course/evaluation/recent/${match.params.id}/${index}`);
        setCommentData(response.data.evaluations);
        //console.log(response.data.evaluations);
    };
    const dialog = useDialog();
    const postCommentData = async (value) => {
        const json = JSON.stringify({ 
            content:inputText,
            email:value,
            courseId:match.params.id,
            type:inputMajor,
            year:inputWhen.substring(0, 4),
            semester:inputWhen.substring(6, 7)
        });
        const response = await axios.post(`https://cors-anywhere.herokuapp.com/https://ssurank.herokuapp.com/ssurank/course/evaluation`,json, {
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
        /*console.log(value);
        console.log(inputText);
        console.log(inputMajor);
        console.log(inputWhen);*/
        if(value){
            postCommentData(value);
            setIsPending(true);
        }
        else{
            alert('신고 사유를 입력해주세요.')
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
      }
      
    useEffect(() => {
        getDetailData();
        getCommentData(1);
        window.addEventListener('resize', updateWidth)
    }, [])
    useEffect(() => {
        window.addEventListener('resize', updateWidth)
        return () => {
            window.removeEventListener('resize', updateWidth)
        }
    },[width])
    const caseR = ["plus",'zero','minus','none'];
    const [recent,setRecent]=useState(true);
    return (
        detailData?
       <>
       {console.log(rankData)}
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
                <span>{detailData.title}</span>
                
                <p>{detailData.name}·{detailData.department}</p>
            </div>
        </div>
        <Link to ={`/professor/view/${detailData.professorId}`}><button className="prof-detail-btn"><p>이 교수 평가 보러가기</p></button></Link>
        <div className="divider"></div>
        <div className="detail-graph">
            <div className="header">이 강의 지난 학기 평가</div>
            {
                rankData&&
            <VictoryChart 
                height={135}
                width={width}
                padding={30}
            responsive={false}  containerComponent={
                <VictoryContainer
                
                    style={{
                        pointerEvents: "auto",
                        userSelect: "auto",
                        touchAction: "auto"
                    }}
                />
                }
            >
            <VictoryArea
                domain={{y: [0, 4]}}
                
                categories={{
                    x: rankData.year,
                    
                  }}
                style={{
                    data: { fill: "#3C95FF",opacity: 0.5 ,stroke:  "#3C95FF" },
                    parent: { border: "1px solid #ccc"},
                    }} data={rankData} x="year" y="ranking" labels={({datum})=>rankName[datum.ranking]}/>
            <VictoryAxis crossAxis={false}/>
            </VictoryChart>
            }
        </div>
        <div className="divider"></div>
        <div className="detail-comment-input">
            <div className="header">이 강의 한 줄 평</div>
            <textarea onChange={changeInputText} onKeyDown={(e) => enterSubmit(e) } placeholder="여기에 한 줄 평을 작성해주세요."></textarea>
            <div className="detail-input-footer">
                <div>
            <select className="select-bar" onChange={changeInputMajor}  style={selectBar}>
                <option defaultValue>전공 여부</option>
                <option >본전공</option>
                <option >부전공</option>
                <option >복수전공</option>
                <option >타전공</option>
            </select>
            <select value={inputWhen} onChange={changeInputWhen} className="select-bar" style={selectBar}>
            <option defaultValue>수강학기</option>
                {detailData.historyCourses.map((index)=>
                    (index.semester==='FIRST'?<option> {index.year}년 1학기</option>:<option>{index.year}년 2학기</option>)
                )}
            </select>
            </div>
            <button class="submit-btn">작성</button>
            </div>
            
        </div>
        <div className="divider"></div>
        <div className="detail-comment-list">
            <div className="detail-comment-header">
                <button className={(recent?"selec-btn":"none-btn")} onClick={()=>setRecent(true)}>최신순</button>
                 <button className={(recent?"none-btn":"selec-btn")} onClick={()=>setRecent(false)}>추천순</button>
            </div>
        {commentData&&
            commentData.map((index)=>
                <div className="comment-wrapper">
                    <div className="comment-head"><span>{index.type}</span><p>{index.opt2}</p></div>
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