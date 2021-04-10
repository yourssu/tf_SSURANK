import React,{useState,useEffect} from 'react';
import { StaticDialog } from 'react-st-modal';
import Loading from '../components/Loading';
import PropTypes from 'prop-types';
import axios from "axios";
import Header from "../components/prof/Header";
import RecentClass from "../components/prof/RecentClass";
import ClassList from "../components/prof/ClassList";
import CommentBox from '../components/CommentBox';
import Divider from '../components/Divider';
import CommentList from '../components/CommentList';
import {postCommentData} from '../components/API/Api'
const ViewProf = ({match}) => {
    const [detailData, setDetailData] = useState();
    const [detailClassData, setDetailClassData] = useState([]);
    const [getClassMax,setGetClassMax]=useState();
    const [commentData, setCommentData] = useState();
    const [isPending,setIsPending] = useState(false);
    const [popup,setPopup] = useState(false);
    const [sort,setSort]= useState(0);
    const COOKIE = document.cookie;
    const MS = process.env.REACT_APP_MASTER_TOKEN||'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6OTk5OTksInJvbGVzIjpbIlJPTEVfVVNFUiJdfQ.0n4EumQnVj3v0twvOMtEKsDUtixNC4yp8PYd1X12AJQ';
      const getDetailData = async () => {
        const response = await axios.get(`https://test.ground.yourssu.com/timetable/v1/ssurank/professors/detail/${match.params.id}`);
        //console.log(response.status)
        setDetailData(response.data.detailedProfessor);
    };
    const getProfClassData = async (index) => {
        const response = await axios.get(`https://test.ground.yourssu.com/timetable/v1/ssurank/professors/detail/${match.params.id}/courses/${index}`);
        setDetailClassData(detailClassData.concat(response.data.offeredCourses));
        //console.log(response.data);
    };
    const getProfClassMaxData = async () => {
      const response = await axios.get(`https://test.ground.yourssu.com/timetable/v1/ssurank/professors/detail/${match.params.id}/courses/count`);
      setGetClassMax(response.data);
      //console.log(response.data);
    };
    const getCommentData = async (index) => {
      let sortCategory =['latest','best']
        const response = await axios.get(`https://test.ground.yourssu.com/timetable/v1/ssurank/professors/evaluations/${sortCategory[sort]}/${match.params.id}/${index}`);
        setCommentData(response.data.evaluations);
        //console.log(response.data.evaluations);
    };

    const getCookie = (cookieName) =>{
      cookieName = cookieName + '=';
      let cookieData = document.cookie;
      let start = cookieData.indexOf(cookieName);
      let cookieValue = '';
      if(start != -1){
        start += cookieName.length;
        let end = cookieData.indexOf(';', start);
      if(end == -1)end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
      }
      return unescape(cookieValue);
      }

    /*
    
    const postReport = async () => {
        const json = JSON.stringify({ 
            content: "string",
            id: 0,
            reportCategory: "기타"
        });
        const response = await axios.post(`https://test.ground.yourssu.com/timetable/v1/ssurank/professor/evaluation/report`,json, {
            headers: {
              'Content-Type': 'application/json'
            }});
    };*/
    
    function sendDataComment(value){     
      setIsPending(true);
      let dataModel = {
        message : '한 줄 평 작성 성공!',
        path :'professors/evaluations/post',
        data : JSON.stringify({ 
          content:value.inputText.substring(0,10000),
          professorId: match.params.id,
          studentType: value.inputMajor
        }),
        headers : {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${MS}`
        }
    }
      postCommentData(dataModel).then(
        res=>setIsPending(false)
      )

           
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
        getProfClassData(1);
        getCommentData(1);
        getProfClassMaxData();
        console.log(COOKIE)
    }, [])
    useEffect(() => {
      getCommentData(1);
      console.log('change!')
  }, [sort])
    return (detailData?
       <>
        
      <StaticDialog
        isOpen={popup}
        onAfterClose={() => {
          setPopup(false);
        }}
      >
        {/* see previous demo */}
        <CustomDialogContent />
      </StaticDialog>
        <Header detailData={detailData}/>
        <RecentClass detailData={detailData}/>
        <Divider/>
        {detailClassData&&
        <>
          <ClassList maxData={getClassMax}  detailClassData={detailClassData}/>

          {/*console.log(getClassMax)*/}
          {
            getClassMax>5&&getClassMax>detailClassData.length&&
            <div className="pd-16-side bs"><button onClick={()=>{
              getProfClassData(detailClassData.length/5 + 1);
            }} className="detail-comment-more ">더보기<img src={"/img/More.svg"}/></button>
            </div>
          }
        </>
        }
        <Divider/>
        <CommentBox sendDataComment={sendDataComment} />
        <Divider/>
        <CommentList date={1} commentData={commentData} setPopup={setPopup} setSort={setSort}/>
        
       </>:<Loading/>
    );
};

ViewProf.propTypes={
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
}

export default ViewProf;