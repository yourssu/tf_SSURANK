import React,{useState,useEffect} from 'react';
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
const View = ({match}) => {
    const [detailData, setDetailData] = useState();
    const [commentData, setCommentData] = useState();
    const [isPending,setIsPending] = useState(false);
    const [popup,setPopup] = useState(false);
    const [rankData,setRankData]=useState(false);
    const [width, setWidth] = useState(608)
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
        const response = await axios.get(`https://ssurank.herokuapp.com/ssurank/course/detail/${match.params.id}`);
        setDetailData(response.data.detailedCourse);
        setRankData( response.data.detailedCourse.historyCourses.map(
            (index)=>(
               {year: (String(index.year)).substr(2,4)+'/'+year[index.semester],
                ranking: rank[index.ranking]
            }
                )))
        }
    const getCommentData = async (index) => {
        const response = await axios.get(`https://ssurank.herokuapp.com/ssurank/course/evaluation/recent/${match.params.id}/${index}`);
        setCommentData(response.data.evaluations);
        //console.log(response.data.evaluations);
    };
   /*const postCommentData = async (value) => {
        const json = JSON.stringify({ 
            content:inputText,
            email:value,
            courseId:match.params.id,
            type:inputMajor,
            year:inputWhen.substring(0, 4),
            semester:inputWhen.substring(6, 7)
        });
        await axios.post(`https://cors-anywhere.herokuapp.com/https://ssurank.herokuapp.com/ssurank/course/evaluation`,json, {
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
        await axios.post(`https://ssurank.herokuapp.com/ssurank/course/report`,json, {
            headers: {
              'Content-Type': 'application/json'
            }});
    };*/
    function sendDataComment(value){
        /*console.log(value);
        console.log(inputText);
        console.log(inputMajor);
        console.log(inputWhen);*/
        if(value){
            //postCommentData(value);
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
    return (
        detailData?
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
        <CommentBox semester={detailData.historyCourses} setPopup={setPopup} />
        <Divider/>
        <CommentList commentData={commentData} setPopup={setPopup}/>
        
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