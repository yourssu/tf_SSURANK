import React,{useState,useRef,useEffect} from 'react';
import ReactDOM from 'react-dom';
import { StaticDialog } from 'react-st-modal';
import axios from "axios";
import Loading from '../components/Loading'
import PropTypes from 'prop-types';
import HistoryGraph from '../components/class/HistoryGraph';
import Header from '../components/class/Header';
import Button from '../components/Button';
import CommentBox from '../components/CommentBox';
import Divider from '../components/Divider';
import CommentList from '../components/CommentList';
import Modal from './Modal'

import {getCookie,postCommentData,getCommentData} from '../components/API/Api'
const View = ({match}) => {
    const [detailData, setDetailData] = useState();
    const [commentData, setCommentData] = useState();
    const [isPending,setIsPending] = useState(false);
    const [popup,setPopup] = useState(false);
    const [rankData,setRankData]=useState(false);
    const [width, setWidth] = useState(608)
    const [sort,setSort]= useState(0);
    const MS = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6OTk5OTksInJvbGVzIjpbIlJPTEVfVVNFUiJdfQ.0n4EumQnVj3v0twvOMtEKsDUtixNC4yp8PYd1X12AJQ';
    //const rank = {'A0':10,'A1':9,'A2':8,'B0':7,'B1':6,'B2':5,'C0':4,'C1':3,'C2':2,'D':1,'U':0};
      const updateWidth = (ev) => {
          if(ev.target.innerWidth>=608){
            setWidth(608)
          }
        else{setWidth(ev.target.innerWidth)}
    }
      const getDetailData = async () => {
        const rank = {'A0':4,'B0':3,'C0':2,'D0':1};
        const year = {'FIRST':'01','SECOND':'02'}
        const response = await axios.get(`https://test.ground.yourssu.com/timetable/v1/ssurank/courses/detail/${match.params.id}`);
        setDetailData(response.data.detailedCourse);
        setRankData( response.data.detailedCourse.historyCourses.map(
            (index)=>(
               {year: (String(index.year)).substr(2,4)+'/'+year[index.semester],
                ranking: rank[index.ranking]
            }
                )))
        }
        window.printAlert = new Event('printAlert');
        window.addEventListener('printAlert', function() {
          alert('You called printAlert function');
      },false);
    
    const postReport = async () => {
        const json = JSON.stringify({ 
            content: "string",
            id: 0,
            reportCategory: "기타"
        });
        await axios.post(`https://test.ground.yourssu.com/timetable/v1/ssurank/course/report`,json, {
            headers: {
              'Content-Type': 'application/json'
            }});
    };
    function sendDataComment(value){     
      setIsPending(true);
      const token = getCookie('userAccessToken')||null;
      console.log('we get ',token);
      let dataModel = {
        message : '한 줄 평 작성 성공!',
        path :'courses/evaluations/post',
        data : JSON.stringify({ 
          content:value.inputText.substring(0,10000),
          courseId: match.params.id,
          studentType: value.inputMajor,
          year:value.inputYear,
          semester:0
        }),
        headers : {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${token}`
        }
      }
      if(token){
        postCommentData(dataModel).then( //이거 존나 의미없어보이는데?
          res=>setIsPending(false)
        )}
      else{
        alert('비정상적인 접근');
        setIsPending(false);
      }  
    }
    function requestCommentData(index){     
      const token = getCookie('userAccessToken')||null;
      console.log('requestCommenData value is ',index);
      let sortCategory =['latest','best'] 
      let dataModel = {
        message : '',
        path :`courses/evaluations`,
        data :`${sortCategory[sort]}/${match.params.id}/${String(index)}`,
        headers : {
          'Content-Type': 'application/json'
        }
      }
      if(token){
        dataModel['headers']['Authorization'] = `Bearer ${token}`
      }
      getCommentData(dataModel).then(response=>setCommentData(response.evaluations));
     
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
        requestCommentData(1);
        window.addEventListener('resize', updateWidth)
    }, [])
    useEffect(() => {
      requestCommentData(1);
    }, [sort])
    useEffect(() => {
        window.addEventListener('resize', updateWidth)
        return () => {
            window.removeEventListener('resize', updateWidth)
        }
    },[width])
    return (
        (detailData&&commentData)?
       <>
       <StaticDialog
        isOpen={popup}
        onAfterClose={() => {
          setPopup(false);

          // do something with dialog result
        }}
      >
        {/* see previous demo */}
        <CustomDialogContent />
      </StaticDialog>
        
        <Header detailData={detailData}/>
        <Button url={detailData.professorId} string="이 교수 평가 보러가기"/>
        <Divider/>
        {rankData&&detailData&&
        <HistoryGraph rankData={rankData} width={width}/>}
        <Divider/>
        <CommentBox sendDataComment={sendDataComment} semester={detailData.historyCourses} setPopup={setPopup} />
        <Divider/>
        <CommentList date={1} state={0} setSort={setSort} commentData={commentData} setPopup={setPopup}/>
        
       </>:<Loading/>
    );
};

View.propTypes={
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      })
    }),
  }
  
export default View;