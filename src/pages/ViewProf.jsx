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
const ViewProf = ({match}) => {
    const [detailData, setDetailData] = useState();
    const [detailClassData, setDetailClassData] = useState([]);
    const [getClassMax,setGetClassMax]=useState();
    const [commentData, setCommentData] = useState();
    const [isPending,setIsPending] = useState(false);
    const [popup,setPopup] = useState(false);

      const getDetailData = async () => {
        const response = await axios.get(`https://test.ground.yourssu.com/timetable/v1/ssurank/professors/detail/${match.params.id}`);
        //console.log(response.status)
        setDetailData(response.data.detailedProfessor);
    };
    const getProfClassData = async (index) => {
        const response = await axios.get(`https://test.ground.yourssu.com/timetable/v1/ssurank/professors/detail/${match.params.id}/${index}`);
        setDetailClassData(detailClassData.concat(response.data.detailedCourses));
        //console.log(response.data);
    };
    const getProfClassMaxData = async () => {
      const response = await axios.get(`https://test.ground.yourssu.com/timetable/v1/ssurank/professors/${match.params.id}/courses`);
      setGetClassMax(response.data);
      //console.log(response.data);
    };
    const getCommentData = async (index) => {
        const response = await axios.get(`https://test.ground.yourssu.com/timetable/v1/ssurank/professors/evaluation/recent/${match.params.id}/${index}`);
        setCommentData(response.data.evaluations);
        //console.log(response.data.evaluations);
    };
    const postCommentData = async (value) => {
        const json = JSON.stringify({ 
            content:value
        });
        await axios.post(`https://cors-anywhere.herokuapp.com/https://test.ground.yourssu.com/timetable/v1/ssurank/professors/evaluation`,json, {
            headers: {
            'Content-Type': 'application/json'
            }});
        setIsPending(false);
        setPopup(false);
        window.location.reload(false);
    };
    window.printAlert = new Event('printAlert');
    window.addEventListener('printAlert', function() {
      alert('You called printAlert function');
  }, {once:true});

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
      }
      
    useEffect(() => {
        getDetailData();
        getProfClassData(1);
        getCommentData(1);
        getProfClassMaxData();
    }, [])
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
          {/*console.log(detailClassData.length)*/}
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
        <CommentBox setPopup={setPopup} />
        <Divider/>
        <CommentList date={1} commentData={commentData} setPopup={setPopup}/>
        
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