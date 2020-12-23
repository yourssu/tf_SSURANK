import React from 'react';
import Search from './Search'
import { Link, Route } from 'react-router-dom';
import Content from '../components/Content';
import SearchBox from '../components/SearchBox';
import View from './View';
const ProHome = ({match}) => {
    return (
       <>
        <Route exact path={match.url} render={({match})=>(<><div className="logo">
        <img src="./img/Logo_img.png"/>
        </div> <SearchBox  /><Content match={match} category={0} /></>)}/>
        <Route path={`${match.url}/search/:id`} render={({match})=>(<><SearchBox/> <Search match={match}/></>)}/>
        <Route path={`${match.url}/view/:id`} component={View}/>
       </>
    );
};

export default ProHome;