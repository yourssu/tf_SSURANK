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
    const response = await axios.get(`https://test.ground.yourssu.com/timetable/v1/ssurank/courses/detail/${match.params.id}`);
    setDetailData(response.data.detailedCourse);
    setRankData(response.data.detailedCourse.historyCourses.map(
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
      message: '성공!',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    if (token) {
      switch (value.mode) {//0 : 추천 || 1 : 비추천 || 2 : 신고 || 3 : 삭제
        case 0:
          dataModel['path'] = `courses/evaluations/thumbs-up/${value.content.courseEvaluationId}`;
          postActionData(dataModel).then( //이거 존나 의미없어보이는데?
            res => setIsPending(false)
          )
          break;
        case 1:
          dataModel['path'] = `courses/evaluations/thumbs-down/${value.content.courseEvaluationId}`;
          //dataModel['data'] = `${value.id}`;
          postActionData(dataModel).then( //이거 존나 의미없어보이는데?
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
          deleteCommentData(dataModel).then( //이거 존나 의미없어보이는데?
            res => setIsPending(false)
          )
          return;
        default:
          alert('잘못된 접근');
      }

    }
    else {
      alert('로그인 후 이용해주세요');
      setIsPending(false);
    }
  }

  function reportComment(value) {
    setIsPending(true);
    const token = getCookie('userAccessToken') || null;
    console.log('we get ', token);
    let dataModel = {
      message: '신고 접수 성공!',
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
      postCommentData(dataModel).then( //이거 존나 의미없어보이는데?
        res => setIsPending(false)
      )
    }
    else {
      alert('로그인 후 이용해주세요');
      setPopup(false);
      setIsPending(false);
    }
  }
  function sendDataComment(value) {
    setIsPending(true);
    const token = getCookie('userAccessToken') || null;
    console.log('we get ', token);
    let dataModel = {
      message: '한 줄 평 작성 성공!',
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
      postCommentData(dataModel).then( //이거 존나 의미없어보이는데?
        res => setIsPending(false)
      )
    }
    else {
      alert('로그인 후 이용해주세요');
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
    const [title, setTitle] = useState('신고');
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
              <button onClick={() => { setLevel('폭력성'); setTitle(`신고 > 폭력성`) }}>
                <p className='modal-text'>폭력성</p>
              </button>
              {devider()}
              <button onClick={() => { setLevel('스팸'); setTitle(`신고 > 스팸`) }}>
                <p className='modal-text'>스팸</p>
              </button>
              {devider()}
              <button onClick={() => { setLevel('혐오조장'); setTitle(`신고 > 혐오조장`) }}>
                <p className='modal-text'>혐오조장</p>
              </button>
              {devider()}
              <button onClick={() => { setLevel(1); setTitle(`신고 > 기타`) }}>
                <p className='modal-text'>기타</p>
              </button>
            </>
          )
        case 1:
          return (
            <>
              <textarea className="modal-input-bar"
                placeholder="신고 사유를 입력해주세요."
                onChange={(e) => { setValue(e.target.value) }}
              />
              <button className="modal-button full bg-color"
                onClick={() => {
                  setLevel('기타');
                  reportComment({ inputText: value, reportCategory: '기타' })
                }}
              >
                작성
            </button>
            </>)
        case 2:
          <>
            <p>신고가 접수되었습니다</p>
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
  }, [width])
  return (
    (detailData && commentData) ?
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

        <Header detailData={detailData} />
        <Button url={detailData.professorId} string="이 교수 평가 보러가기" />
        <Divider />
        {rankData && detailData &&
          <HistoryGraph rankData={rankData} width={width} />}
        <Divider />
        <CommentBox sendDataComment={sendDataComment} semester={detailData.historyCourses} setPopup={setPopup} />
        <Divider />
        <CommentList sendAction={sendAction} date={1} state={0} setSort={setSort} commentData={commentData} setPopup={setPopup} />

      </> : <Loading />
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