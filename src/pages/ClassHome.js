import React,{useState} from 'react';
import Search from './Search'
import { Route } from 'react-router-dom';
import RecentComment from '../components/RecentComment';
import SearchBox from '../components/SearchBox';
import Logo from '../components/Logo'
import View from './View'
import { Banner } from '../components/banner';
const ClassHome = ({history,match}) => {
    
    return (
        <>
        <Route exact path={match.url} render={({match})=>(<>
        <Logo/>
        <SearchBox history={history} category={1} match={match}/><RecentComment category={1} match={match}/>
        {/*<Banner/>*/}
        </>)}/>
        <Route path={`${match.url}/search/:id`} render={({match})=>(<><Search category={1} history={history} match={match}/></>)}/>
        <Route path={`${match.url}/view/:id`} component={View}/>
        
        </>
    );
};

export default ClassHome;