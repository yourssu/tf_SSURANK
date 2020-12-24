import React,{useState} from 'react';
import Search from './Search'
import { Link, Route } from 'react-router-dom';
import Content from '../components/Content';
import SearchBox from '../components/SearchBox';
import View from './View'
const ClassHome = ({match}) => {
    
    return (
        <>
        <Route exact path={match.url} render={({match})=>(<><div className="logo">
        <img src="./img/Logo_img.png"/>
        </div> <SearchBox  category={1} match={match}/><Content category={1} match={match}/></>)}/>
        <Route path={`${match.url}/search/:id`} render={({match})=>(<><SearchBox category={1} match={match}/> <Search category={1} match={match}/></>)}/>
        <Route path={`${match.url}/view/:id`} component={View}/>
        
        </>
    );
};

export default ClassHome;