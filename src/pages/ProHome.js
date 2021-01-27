import React from 'react';
import Search from './Search'
import { Link, Route } from 'react-router-dom';
import RecentComment from '../components/RecentComment';
import ProDropdown from "../components/PropDropdown";
import SearchBox from '../components/SearchBox';
import ViewProf from './ViewProf';
import Ranking from './Ranking';
const ProHome = ({match,history}) => {
    return (
       <>
        <Route exact path={match.url} render={({match})=>(<><div className="logo">
        <img src="./img/Logo_img.png"/>
        </div> <SearchBox  history={history} category={0} match={match} />
        <ProDropdown/>{/*<RecentComment match={match} category={0} />*/}</>)}/>
        <Route path={`${match.url}/search/:id`} render={({match,history})=>(<><SearchBox  history={history} category={0} match={match}/> <Search category={0} match={match}/></>)}/>
        <Route path={`${match.url}/view/:id`} component={ViewProf}/>
        <Route path={`${match.url}/ranking/:id`} component={Ranking}/>
       </>
    );
};

export default ProHome;