import React,{useState,useEffect} from "react";
import axios from 'axios';
import "./Content.css";
import { Link } from 'react-router-dom';
import ProDropdown from "./PropDropdown"

const sample = {
    class:[ // 강의 제목 , 교수이름, 내용, 작성일자, 게시글 id
        {className:"일반물리학",proName:"홍길동", comment:"물리학은 너무 어려운것같아요 제가 LA에 있을 때 너무나도 많은 물리적 법칙을 경험했습니다 이 강의를 들으며 저는 하늘을 날아 여기 쨘 저기 쨘 윤기 쨘 하는 법을 배울 수 있었습니다", createdAt:"20161027T171340Z", id:"14" },
        {className:"대포 포물선 감성학",proName:"김수한무",comment:"포물선이 이렇게 감성이 있었다니, 마치 대포를 거칠게 날리던 후크선장이 된 듯 ", createdAt:"20161027T171340Z", id:"22"},
        {className:"주량 성장 개론",proName:"김가나", comment:"알쓰였는데 이 강의를 듣고 괴물이 되었습니다", createdAt:"20161027T171340Z", id:"31" },
        {className:"알고리즘을 알고알고알고알고알고알고알고알파고알고알고알고알고",proName:"박한별", comment:"알고있나 알고리즘? 알고이쓰", createdAt:"20161027T171340Z", id:"5" }
    ],
    pro:[// 교수이름, 내용, 작성일자, 게시글 id
        {proName:"홍길동",major:"의적양성학과", comment:"여기 뿅! 저기 뿅!", createdAt:"20161027T171340Z", id:"14" },
        {proName:"김수한무",major:"끝말잇기학과",comment:"김수한무거북이와두루미삼", createdAt:"20161027T171340Z", id:"22"},
        {proName:"김가나",major:"국문학과", comment:"다라마바사아자차카타파하", createdAt:"20161027T171340Z", id:"31" },
        {proName:"박한별",major:"천체물리학과", comment:"한별아...-기로로-", createdAt:"20161027T171340Z", id:"5" }//전공도 위와 비슷하게
    ],
}

const RecentComment = ({category,match})=>{
    const [recentCommentData,setRecentCommentData] = useState();
    
    const getRecentComment = async () => {
        let temp =['professors','courses']
        await axios.get(`https://test.ground.yourssu.com/timetable/v1/ssurank/${temp[category]}/evaluations/main`)
        .then((res)=>{
            let data =res.data.evaluations;
            setRecentCommentData(data);
            }
        );
        //etCommentData(response.data.evaluations);
        //console.log(response.data.evaluations);
    };

    const firstChild = (index) =>{
        if(index==0){
            return(
            {marginLeft:'16px'}
            )
        }
        if(category<1){
            if(sample.pro.length-1==index)
            return(
                {marginRight:'16px'}
                )
        }
        else{
            if(sample.class.length-1==index)
            return(
                {marginRight:'16px'}
            )
        }
    }
    useEffect(() => {
        getRecentComment();
    }, []);
    return(
    <div className="contents ">
        <div className="header pd-16-side">최근 등록된 한 줄 평</div>
        {category>0&&recentCommentData&&
        
        <div className="comment-list">
            {
                recentCommentData.length > 0? recentCommentData.map((comment,key) => (
                <Link key={key} to ={`${match.url}/view/`+comment.id}>
                <div className="comment-box" style={firstChild(key)}>
                    <div className="box-header"><span>{comment.title}</span> - {comment.name}</div>
                    <div className="box-contents"><p>{comment.content}</p></div>
                </div>
                </Link>
                )):
                <div className="comment-box">
                    <div className="box-contents"><p>최근 등록된 데이터가 없습니다</p></div>
                </div>
            }

       
        </div>
        }{category<1&&recentCommentData&&
        <>
            <div className="comment-list">
            {console.log(recentCommentData)}
            {recentCommentData.length > 0?recentCommentData.map((comment,key) => (
             <Link key={key} to ={`${match.url}/view/`+comment.professorEvaluationId}>
            <div className="comment-box" style={firstChild(key)}>
                 <div className="box-header">{comment.name} - {comment.department}</div>
                 <div className="box-contents"><p>{comment.content}</p></div>
             </div>
             </Link>
            )):
            <div className="comment-box">
                <div className="box-contents"><p>최근 등록된 데이터가 없습니다</p></div>
            </div>}
        </div>
        </>}
    
    </div>);
}

export default RecentComment;