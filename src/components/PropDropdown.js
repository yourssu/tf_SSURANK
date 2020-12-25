import React,{useState,useEffect} from "react";
import { render } from "react-dom";
import { Link, Route } from 'react-router-dom';
import axios from "axios";
const PropDropdown = (props)=>{
    const [majorData, setMajorData] = useState();
    const [honorData, setHonorData] = useState();
    const [major,setMajor]=useState(false);
    const [honor,setHonor]=useState(false);
    const caseR = ["plus",'zero','minus',''];
    const college=['1','2','3'];
    const getMajorList = async () => {
        const response = await axios.get("https://cors-anywhere.herokuapp.com/https://ssurank.herokuapp.com/ssurank/professor/department/lists",{headers: {
            'Access-Control-Allow-Origin': '*',
        }});
        setMajorData(response.data);
        console.log(response.data);
    };
    const getHonorList = async () => {
        const response = await axios.get("https://cors-anywhere.herokuapp.com/https://ssurank.herokuapp.com/ssurank/professor/honor",{headers: {
            'Access-Control-Allow-Origin': '*'
        }});
        setHonorData(response.data);
        console.log(response.data);
    };
    const collegeList = ["인문대", "자연과학대학", "법과대학", "사회과학대학", "경제통상대학", "경영대학", "공과대학", "IT대학", "베어드교양대학", "융특"]
    const sample = {
        honor:[
            {top:1,name:"홍길동", major:"코카콜라맛있다학과", position:"척척박사", rank:"A1",season:"19년 2학기" },
            {top:2,name:"김수한무", major:"팹시콜라맛있다학과", position:"척척석사", rank:"B2",season:"19년 2학기"},
            {top:3,name:"김가나", major:"제로콜라맛있다학과", position:"조교수", rank:"C0", season:"19년 2학기"},
            {top:4,name:"박한별", major:"민트초코맛있다학과", position:"학생", rank:"U2", season:"19년 2학기"},
        ],
        major:[
            {study:'it',type:[{name:"컴퓨터",fullname:"컴퓨터학부"},{name:"소프트",fullname:"소프트웨어학부"},{name:"글로벌미디어",fullname:"글로벌미디어학부"},{name:"글로벌미디어",fullname:"글로벌미디어학부"}]},
            {study:"engine",type:[{name:"화학공",fullname:"화학공학부"},{name:"산소재",fullname:"소프트웨어학부"},{name:"건축",fullname:"글로벌미디어학부"},{name:"다단계",fullname:"글로벌미디어학부"}]},
            {study:"society",type:[{name:"회계",fullname:"컴퓨터학부"},{name:"경영",fullname:"소프트웨어학부"},{name:"경제",fullname:"글로벌미디어학부"}]},        
            //전공도 위와 비슷하게
        ],
    }
    useEffect(() => {
        getMajorList();
        getHonorList();
    }, [])
    return(
        <>
        <div className="major-dropdown-contents">
        <div className="dropdown">
        <button onClick={()=>{setMajor(!major)}} className="dropdown-header"><div className="header">학과별 랭킹</div> <div className="dropdown_icon"><img src={"./img/drop"+(!major?"up":"down")+"_Icon.svg"}/></div></button>
            {major&&
                (majorData?
                <>
                {collegeList.map((college,index) => (
                    <div className="major-wrapper">
                    {majorData['list'][college].map((data,index) => (
                        //<>{console.log(data.originalName)}</>
                        <Link to={`/professor/ranking/${data.originalName}`}><div className="major-block"><p>{data.shortenedName}</p></div></Link>
                    ))}
                    </div>
                ))}
                </>:
                <h1>로딩중</h1>
                )
            }
        </div>
         
     </div>
    <div className="pf-dropdown-contents">
       <div className="dropdown">
       <button onClick={()=>{setHonor(!honor)}} className="dropdown-header"><div className="header">명예의 전당</div> <div className="dropdown_icon"><img src={"./img/drop"+(!honor?"up":"down")+"_Icon.svg"}/></div></button>
       {honor&&
       (honorData?
        <>
        {honorData.professors.map(rank => (
            <Link to={`/professor/view/${rank.id}`}><div className="dropdown-block"> 
                    <div className="block-left"><img className={"rank-img "+ rank.ranking.substring(0,1) +" "+ caseR[parseInt((rank.ranking.substring(1,2)))]} src={"./img/"+rank.ranking.substring(0,1) +".svg"}/></div>
                    <div className="block-center">
                        <span>{rank.name}</span>
                        <p>{rank.department}·{rank.position}</p>
                    </div>
                    
                </div>
            </Link>
            ))}
        </>
        :
        <h1>로딩중</h1>
        )
        }
       </div>
            
    </div>
    </>);
}

export default PropDropdown;