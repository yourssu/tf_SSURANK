import React, { useState, useEffect } from 'react';
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
import { deleteCommentData,postActionData, getCommentData, getCookie, postCommentData, getDetailData } from '../components/API/Api'
const ViewProf = ({ match }) => {
  const [detailData, setDetailData] = useState();
  const [detailClassData, setDetailClassData] = useState([]);
  const [getClassMax, setGetClassMax] = useState();
  const [commentData, setCommentData] = useState();
  const [isPending, setIsPending] = useState(false);
  const [popup, setPopup] = useState(false);
  const [selectCommentId, setSelectCommentId] = useState();
  const [sort, setSort] = useState(0);
  const COOKIE = document.cookie;
  const [commentToken, setCT] = useState();
  const MS = process.env.REACT_APP_MASTER_TOKEN || commentToken;

  const getProfClassData = async (index) => {
    const response = await axios.get(`https://test.ground.yourssu.com/timetable/v1/rank/professors/${match.params.id}`);
    setDetailClassData(response.data.professor.offeredCourses);
  };

  

  const deleteComment = async (index) => {
    const response = await axios.get(`https://test.ground.yourssu.com/timetable/v1/rank/courses/evaluations/delete/${match.params.id}`);
    setDetailClassData(detailClassData.concat(response.data.professor.offeredCourses));
    
  };
  const getProfClassMaxData = async () => {
    const response = await axios.get(`https://test.ground.yourssu.com/timetable/v1/rank/professors/${match.params.id}`);

    //console.log(response.data);
  };

  const getDetailData = async () => {
    console.log(match.params.id);
    const response = await axios.get(`https://test.ground.yourssu.com/timetable/v1/rank/professors/${match.params.id}`);
    console.log(response);
    setDetailData(response.data.professor);
  }

  function requestDataComment(value) {
    setIsPending(true);
    const token = getCookie('userAccessToken') || null;
    console.log('we get ', token);
    let dataModel = {
      message: '??? ??? ??? ?????? ??????!',
      path: 'professors/evaluations/post',
      data: JSON.stringify({
        content: value.inputText.substring(0, 10000),
        professorId: match.params.id,
        studentType: value.inputMajor
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    if (token) {
      postCommentData(dataModel).then( //?????? ?????? ?????????????????????????
        res => setIsPending(false)
      )
    }
    else {
      alert('????????? ??? ??????????????????');
      setIsPending(false);
    }
  }

  function reportComment(value) {
    setIsPending(true);
    const token = getCookie('userAccessToken') || null;
    console.log('we get ', token);
    let dataModel = {
      message: '?????? ?????? ??????!',
      path: 'professors/evaluations/report',
      data: JSON.stringify({
        content: value.inputText.substring(0, 10000),
        evaluationId: selectCommentId,
        reportCategory: value.reportCategory
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    console.log(dataModel);
    if (token) {
      postCommentData(dataModel).then( //?????? ?????? ?????????????????????????
        res => setIsPending(false)
      )
    }
    else {
      alert('????????? ??? ??????????????????');
      setPopup(false);
      setIsPending(false);
    }
  }
  function requestCommentData(index) {
    const token = getCookie('userAccessToken') || null;
    console.log('requestCommenData value is ', index);
    let sortCategory = ['latest', 'best']
    let dataModel = {
      message: '',
      path: `professors/evaluations`,
      data: `${sortCategory[sort]}/${match.params.id}/${String(index)}`,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (token) {
      dataModel['headers']['Authorization'] = `Bearer ${token}`
    }
    getCommentData(dataModel).then(response => setCommentData(response.evaluations));

  }

  function sendAction(value) {
    setIsPending(true);
    const token = getCookie('userAccessToken') || null;
    console.log('we get ', token);
    let dataModel = {
      message: '??????!',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    if (token) {
      switch (value.mode) {//0 : ?????? || 1 : ????????? || 2 : ?????? || 3 : ??????
        case 0:
          dataModel['path'] = `professors/evaluations/thumbs-up/${value.content.professorEvaluationId}`;
          postActionData(dataModel).then( //?????? ?????? ?????????????????????????
            res => setIsPending(false)
          )
          break;
        case 1:
          dataModel['path'] = `professors/evaluations/thumbs-down/${value.content.professorEvaluationId}`;
          postActionData(dataModel).then( //?????? ?????? ?????????????????????????
            res => setIsPending(false)
          )
          break;
        case 2:
          dataModel['path'] = 'professors/evaluations/report';
          setSelectCommentId(value.content.professorEvaluationId);
          setPopup(true);
          break;
        case 3:
          dataModel['path'] = `professors/evaluations/delete/${value.content.professorEvaluationId}`;
          deleteCommentData(dataModel).then( //?????? ?????? ?????????????????????????
            res => setIsPending(false)
          )
          break;
        default:
          alert('????????? ??????');
      }

    }
    else {
      alert('????????? ??? ??????????????????');
      setIsPending(false);
    }
  }
  function CustomDialogContent() {
    const [value, setValue] = useState('');
    const [level, setLevel] = useState(0);
    const [title, setTitle] = useState('??????');
    function devider() {
      return (
        <hr style={{ height: '1px', backgroundColor: '#ECECEC', margin: '0', border: 'none' }} />
      )
    }
    function switchDiv() {
      switch (level) {
        case 0:
          return (
            <>
              <button onClick={() => { setLevel('?????????'); setTitle(`?????? > ?????????`) }}>
                <p className='modal-text'>?????????</p>
              </button>
              {devider()}
              <button onClick={() => { setLevel('??????'); setTitle(`?????? > ??????`) }}>
                <p className='modal-text'>??????</p>
              </button>
              {devider()}
              <button onClick={() => { setLevel('????????????'); setTitle(`?????? > ????????????`) }}>
                <p className='modal-text'>????????????</p>
              </button>
              {devider()}
              <button onClick={() => { setLevel(1); setTitle(`?????? > ??????`) }}>
                <p className='modal-text'>??????</p>
              </button>
            </>
          )
        case 1:
          return (
            <>
              <textarea className="modal-input-bar"
                placeholder="?????? ????????? ??????????????????."
                onChange={(e) => { setValue(e.target.value) }}
              />
              <button className="modal-button full bg-color"
                onClick={() => {
                  setLevel('??????');
                  reportComment({ inputText: value, reportCategory: '??????', })
                }}
              >
                ??????
            </button>
            </>)
        case 2:
          <>
            <p>????????? ?????????????????????</p>
          </>
          break;
        default:
          reportComment({ inputText: value, reportCategory: level, });
          setLevel(2);
          break;
      }
    }
    return (
      <div className='modal-window'>
        <div className='dropdown-header'>
          <div className='header'>{title}</div>
          <button onClick={() => setPopup(false)} className='dropdown_icon'>
            <img src="/img/close_Icon.png" />
          </button>
        </div>
        {switchDiv()
        }
      </div>
    );
  }

  useEffect(() => {
    getProfClassData(1);
    requestCommentData(1);
    getProfClassMaxData();
    console.log(COOKIE);
    getDetailData();
  }, [])

  useEffect(() => {
    requestCommentData(1);
  }, [sort])

  return (detailData ?
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
      <Header detailData={detailData} />
      <RecentClass detailData={detailData} />
      <Divider />
      {detailClassData &&
        <>
          <ClassList maxData={getClassMax} detailClassData={detailClassData} profData={detailData}/>
          {
            getClassMax > 5 && getClassMax > detailClassData.length &&
            <div className="pd-16-side bs"><button onClick={() => {
              getProfClassData(detailClassData.length / 5 + 1);
            }} className="detail-comment-more ">?????????<img src={"/img/More.svg"} /></button>
            </div>
          }
        </>
      }
      <Divider />
      <CommentBox sendDataComment={requestDataComment} semester={detailData.semester}/>
      <Divider />
      <CommentList sendAction={sendAction} date={1} state={1} commentData={commentData} setPopup={setPopup} setSort={setSort} />

    </> : <Loading />
  );
};

ViewProf.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
}

export default ViewProf;