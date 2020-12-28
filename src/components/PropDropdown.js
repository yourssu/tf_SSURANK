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
        const response = await axios.get("https://ssurank.herokuapp.com/ssurank/professor/department/lists");
        setMajorData(response.data);
    };
    const getHonorList = async () => {
        const response = await axios.get("https://ssurank.herokuapp.com/ssurank/professor/honor");
        setHonorData(response.data);
    };
    const collegeList = ["인문대학", "자연과학대학", "법과대학", "사회과학대학", "경제통상대학", "경영대학", "공과대학", "IT대학", "베어드교양대학", "융특"]
    const honorRank=(index)=>{
        return {objectPosition: ((index)*-24)+'px 0'}
    }
    useEffect(() => {
        getMajorList();
        getHonorList();
    }, [])
    return(
        <>
        <div className="major-dropdown-contents">
        <div className="dropdown">
        <button onClick={()=>{setMajor(!major)}} className="dropdown-header"><div className="header">학과별 랭킹</div> <div className="dropdown_icon"><img src={"./img/drop"+(major?"up":"down")+"_Icon.svg"}/></div></button>
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
       <button onClick={()=>{setHonor(!honor)}} className="dropdown-header"><div className="header">명예의 전당</div> <div className="dropdown_icon"><img src={"./img/drop"+(honor?"up":"down")+"_Icon.svg"}/></div></button>
       {honor&&
       (honorData?
        <>
        {honorData.professors.map((rank,level) => (
            
            <Link to={`/professor/view/${rank.id}`}><div className="dropdown-block"> 
            {console.log(level)}
                    <div className="block-left"><img className={"honor-img "} src={"./img/rank.png"} style={honorRank(level)}/></div>
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