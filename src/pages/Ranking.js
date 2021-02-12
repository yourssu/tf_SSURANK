import React,{useEffect,useState} from 'react';
import { Link, Route } from 'react-router-dom';
import SearchList from '../components/SearchList'
import View from './View'
import axios from "axios";
const Ranking = ({match}) => {
    const [rankingData, setRankingData] = useState([]);
    const [maxPage,setMaxPage]=useState();
    const getRankingList = async (index) => {
        const response = await axios.get(`http://54.180.59.213:8080/ssurank/professor/department/${match.params.id}/${index}`);
        setRankingData(rankingData.concat(response.data.professors));
        console.log(response.data.professors);
    };
    const getPorfMax = async () => {
        const response = await axios.get(`http://54.180.59.213:8080/ssurank/professor/department/${match.params.id}`);
        setMaxPage(response.data);
        console.log(response.data);
    };
    useEffect(() => {
        getRankingList(1);
        getPorfMax();
    }, [])
    return (
        <>
        <div className="pd-16-side bs contents-text"><span>학과별 랭킹</span><br/>{match.params.id}</div>
      
        <Route exact path={match.url} render={()=>( 
            <>
            {rankingData&&
                <>
            <SearchList data={rankingData} value={3}/>
                {
                    maxPage>10&&maxPage/10>rankingData.length/10&&
                    <div className="pd-16-side bs"><button onClick={()=>{
                        getRankingList(rankingData.length/10 + 1);
                    }} className="detail-comment-more ">더보기<img src={"/img/More.svg"}/></button>
                    </div>
                }
                </>
            }
            </>
        )}
        />
      <Route path={`/professor/view/:id`} component={View}/>
       </>
    );
};

export default Ranking;