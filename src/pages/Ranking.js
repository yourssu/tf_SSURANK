import React,{useEffect,useState} from 'react';
import { Link, Route } from 'react-router-dom';
import SearchList from '../components/SearchList'
import View from './View'
import axios from "axios";
const Ranking = ({match}) => {
    const [rankingData, setRankingData] = useState({});
    const getRankingList = async (index) => {
        const response = await axios.get(`https://ssurank.herokuapp.com/ssurank/professor/department/${match.params.id}/${index}`);
        setRankingData(response.data);
        console.log(response.data);
    };
    useEffect(() => {
        getRankingList(1);
    }, [])
    return (
       <>
       <div className="pd-16-side bs contents-text"><span>학과별 랭킹</span><br/>{match.params.id}</div>
      
      <Route exact path={match.url} render={()=>( <SearchList data={rankingData.professors} value={3}/>)}/>
      <Route path={`/professor/view/:id`} component={View}/>
       </>
    );
};

export default Ranking;