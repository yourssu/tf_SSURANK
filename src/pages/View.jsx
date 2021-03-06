import React, { useState, useRef, useEffect } from 'react';
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

import {deleteCommentData, getCookie, postActionData, postCommentData, getCommentData } from '../components/API/Api'
const View = ({ match }) => {
  const [detailData, setDetailData] = useState();
  const [commentData, setCommentData] = useState();
  const [isPending, setIsPending] = useState(false);
  const [popup, setPopup] = useState(false);
  const [rankData, setRankData] = useState(false);
  const [width, setWidth] = useState(608);
  const [selectCommentId, setSelectCommentId] = useState();
  const [sort, setSort] = useState(0);
  //const rank = {'A0':10,'A1':9,'A2':8,'B0':7,'B1':6,'B2':5,'C0':4,'C1':3,'C2':2,'D':1,'U':0};
  const updateWidth = (ev) => {
    if (ev.target.innerWidth >= 608) {
      setWidth(608)
    }
    else { setWidth(ev.target.innerWidth) }
  }
  const getDetailData = async () => {
    const rank = { 'A0': 4, 'B0': 3, 'C0': 2, 'D0': 1 };
    const year = { 'FIRST': '01', 'SECOND': '02' }
    console.log(match.params.id);
    const response = await axios.get(`https://test.ground.yourssu.com/timetable/v1/rank/courses/${match.params.id}`);
    console.log(response);
    setDetailData(response.data.course);
    setRankData(response.data.course.courseHistory.map(
      
      (index) => (
        {
          year: (String(index.year)).substr(2, 4) + '/' + year[index.semester],
          ranking: rank[index.ranking]
        }
      )))
  }

  window.printAlert = new Event('printAlert');
  window.addEventListener('printAlert', function () {
    alert('You called printAlert function');
  }, false);

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
          dataModel['path'] = `courses/evaluations/thumbs-up/${value.content.courseEvaluationId}`;
          postActionData(dataModel).then( //?????? ?????? ?????????????????????????
            res => setIsPending(false)
          )
          break;
        case 1:
          dataModel['path'] = `courses/evaluations/thumbs-down/${value.content.courseEvaluationId}`;
          //dataModel['data'] = `${value.id}`;
          postActionData(dataModel).then( //?????? ?????? ?????????????????????????
            res => setIsPending(false)
          )
          break;
        case 2:
          dataModel['path'] = 'courses/evaluations/report';
          setSelectCommentId(value.content.courseEvaluationId);
          setPopup(true);
          break;
        case 3:
          dataModel['path'] = `courses/evaluations/delete/${value.content.courseEvaluationId}`;
          deleteCommentData(dataModel).then( //?????? ?????? ?????????????????????????
            res => setIsPending(false)
          )
          return;
        default:
          alert('????????? ??????');
      }

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
      path: 'courses/evaluations/report',
      data: JSON.stringify({
        content: value.inputText.substring(0, 10000),
        evaluationId:selectCommentId,
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
  function sendDataComment(value) {
    setIsPending(true);
    const token = getCookie('userAccessToken') || null;
    console.log('we get ', token);
    let dataModel = {
      message: '??? ??? ??? ?????? ??????!',
      path: 'courses/evaluations/post',
      data: JSON.stringify({
        content: value.inputText.substring(0, 10000),
        courseId: match.params.id,
        studentType: value.inputMajor,
        year: value.inputYear,
        semester: 0
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
  function requestCommentData(index) {
    const token = getCookie('userAccessToken') || null;
    console.log('requestCommenData value is ', index);
    let sortCategory = ['latest', 'best']
    let dataModel = {
      message: '',
      path: `courses/evaluations`,
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
                  reportComment({ inputText: value, reportCategory: '??????' })
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
          reportComment({ inputText: value, reportCategory: level });
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
    getDetailData();
    //requestCommentData(1);
    window.addEventListener('resize', updateWidth)
  }, [])
  // useEffect(() => {
  //   requestCommentData(1);
  // }, [sort])
  useEffect(() => {
    window.addEventListener('resize', updateWidth)
    return () => {
      window.removeEventListener('resize', updateWidth)
    }
  }, [width])
  
  return (
     //(detailData && commentData) ?
     detailData ?
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
        <Button url={detailData.professorId} string="??? ?????? ?????? ????????????" />
        <Divider />
        {rankData && detailData &&
          <HistoryGraph rankData={rankData} width={width} />}
        <Divider />
        <CommentBox sendDataComment={sendDataComment} semester={detailData.courseHistory} setPopup={setPopup} />
        <Divider />
        <CommentList sendAction={sendAction} date={1} state={0} setSort={setSort} commentData={commentData} setPopup={setPopup} /> 
          </>
       : <Loading /> 
  );
  
};

View.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
}

export default View;