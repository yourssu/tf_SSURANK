import React,{useState,useEffect} from 'react';
import { Link, Route } from 'react-router-dom';
import SearchList from '../components/SearchList'
import { VictoryLine,VictoryChart,VictoryTheme,VictoryContainer } from "victory";
import  LockIcon from '@material-ui/icons/Lock';
import Search from './Search'
import axios from "axios";
const View = ({match}) => {
    const [detailData, setDetailData] = useState();
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
    useEffect(() => {
        getDetailData();
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
    return (
        detailData?
       <>
        <div className="detail-box">
            <div className="detail-rank-logo"><img className={"rank-img "+ "none"} src={"/img/"+sample.rank.substring(0,1) +".svg"}/></div>
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
            <textarea placeholder="여기에 한 줄 평을 작성해주세요."></textarea>
            <div className="detail-input-footer">
                <div>
            <select className="select-bar"style={selectBar}>
                <option selected>전공 여부</option>
                <option >본전생</option>
                <option >부전생</option>
                <option >타과생</option>
            </select>
            <select className="select-bar" style={selectBar}>
                <option selected>수강학기</option>
                <option >2020년 2학기</option>
                <option >2020년 1학기</option>
                <option >1980년 1학기</option>
            </select>
            </div>
            <button class="submit-btn">작성</button>
            </div>
            
        </div>
        <div className="devider"></div>
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