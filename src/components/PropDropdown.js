import React,{useState,useEffect} from "react";
import { render } from "react-dom";

const PropDropdown = (props)=>{
    const [rank,setRank]=useState();
    const [major,setMajor]=useState(false);
    const [honor,setHonor]=useState(false);
    const caseR = ["plus",'zero','minus',''];
    const college=['1','2','3'];
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
    /*async function getRanking(){
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/',//cors 막아주는친구
        targetUrl = "";//get 요청할 친구
        fetch(proxyUrl+targetUrl)
        .then(blob => blob.json())
          .then((result) => {
            setRank(result);
            console.log(result);
          }).catch((e)=>{
            console.log(e);
            setError(true);
          })
    }
*/  
    return(
        <>
        <div className="major-dropdown-contents">
        <div className="dropdown">
        <button onClick={()=>{setMajor(!major);console.log('major click')}} className="dropdown-header"><div className="header">학과별 랭킹</div> <div className="dropdown_icon"><img src={"./img/drop"+(major?"up":"down")+"_Icon.svg"}/></div></button>
            {major&&
                <>
                {sample.major.map((college,index) => (
                    console.log(college),
                    <div className="major-wrapper">
                        {college.type.map((major,subindex) =>(
                                <div className="major-block"><p>{major.name}</p></div>
                        ))}
                    </div>
                ))}
                </>
            }
        </div>
         
     </div>
    <div className="pf-dropdown-contents">
       <div className="dropdown">
       <button onClick={()=>{setHonor(!honor);console.log('honor click');}} className="dropdown-header"><div className="header">명예의 전당</div> <div className="dropdown_icon"><img src={"./img/drop"+(honor?"up":"down")+"_Icon.svg"}/></div></button>
       {honor&&
        <>
        {sample.honor.map(rank => (
            <div className="dropdown-block"> 
                    <div className="block-left"><img className={"rank-img "+ rank.rank.substring(0,1) +" "+ caseR[parseInt((rank.rank.substring(1,2)))]} src={"./img/"+rank.rank.substring(0,1) +".svg"}/></div>
                    <div className="block-center">
                        <span>{rank.name}</span>
                        
                        <p>{rank.major}·{rank.position}</p>
                    </div>
                    
                </div>
            ))}
        </>
        }
       </div>
            
    </div>
    </>);
}

export default PropDropdown;