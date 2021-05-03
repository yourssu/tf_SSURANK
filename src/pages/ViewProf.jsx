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
import {requestCommentData,getCookie,postCommentData,getDetailData} from '../components/API/Api'
const ViewProf = ({match}) => {
    const [detailData, setDetailData] = useState();
    const [detailClassData, setDetailClassData] = useState([]);
    const [getClassMax,setGetClassMax]=useState();
    const [commentData, setCommentData] = useState();
    const [isPending,setIsPending] = useState(false);
    const [popup,setPopup] = useState(false);
    const [sort,setSort]= useState(0);
    const COOKIE = document.cookie;
    const [commentToken,setCT] = useState();
    const MS = process.env.REACT_APP_MASTER_TOKEN||commentToken;
      const getDetailData_ = async () => {
        const response = await axios.get(`https://test.ground.yourssu.com/timetable/v1/ssurank/professors/detail/${match.params.id}`);
        //console.log(response.status)
        setDetailData(response.data.detailedProfessor);
    };

    const getProfClassData = async (index) => {
        const response = await axios.get(`https://test.ground.yourssu.com/timetable/v1/ssurank/professors/detail/${match.params.id}/courses/${index}`);
        setDetailClassData(detailClassData.concat(response.data.offeredCourses));
        //console.log(response.data);
    }; 
    const deleteComment = async (index) => {
      const response = await axios.get(`https://test.ground.yourssu.com/timetable/v1/ssurank/courses/evaluations/delete/${match.params.id}`);
      setDetailClassData(detailClassData.concat(response.data.offeredCourses));
      //console.log(response.data);
  };
    const getProfClassMaxData = async () => {
      const response = await axios.get(`https://test.ground.yourssu.com/timetable/v1/ssurank/professors/detail/${match.params.id}/courses/count`);
      
      //console.log(response.data);
    };
    const setCookie = (cookieName)=>{
      setCT(getCookie(cookieName));
    }

      useEffect(() => {
        setCookie('userAccessToken');
      }, [])

    function requestDetailData(){     
      let dataModel = {
        message : '',
        path :'professors/detail',
        data : match.params.id,
        headers : {
          'Content-Type': 'application/json'
        }
      }
      getDetailData(dataModel).then(response=>setDetailData(response.detailedProfessor));
     
    }
    function requestDataComment(value){     
      setIsPending(true);
      const token = getCookie('userAccessToken')||null;
      console.log('we get ',token);
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
        path :`professors/evaluations`,
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
        requestDetailData();
        getProfClassData(1);
        requestCommentData(1);
        getProfClassMaxData();
        console.log(COOKIE)
    }, [])
    useEffect(() => {
      requestCommentData(1);
    }, [sort])
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
        <CommentBox sendDataComment={requestDataComment} />
        <Divider/>
        <CommentList date={1} state={1} commentData={commentData} setPopup={setPopup} setSort={setSort}/>
        
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