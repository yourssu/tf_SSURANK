import React,{useState} from 'react';
import Search from './Search'
import { Route } from 'react-router-dom';
import RecentComment from '../components/RecentComment';
import SearchBox from '../components/SearchBox';
import Logo from '../components/Logo'
import View from './View'
const ClassHome = ({history,match}) => {
    
    return (
        <>
        <Route exact path={match.url} render={({match})=>(<>
        <Logo/>
        <SearchBox history={history} category={1} match={match}/>{/*<RecentComment category={1} match={match}/>*/}</>)}/>
        <Route path={`${match.url}/search/:id`} render={({match})=>(<><SearchBox history={history} category={1} match={match}/> <Search category={1} match={match}/></>)}/>
        <Route path={`${match.url}/view/:id`} component={View}/>
        
        </>
    );
};

export default ClassHome;