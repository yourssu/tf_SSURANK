import React from 'react';
import { Link, Route } from 'react-router-dom';
import SearchList from '../components/SearchList'
import View from './View'
const Search = ({match}) => {
    return (
       <>
      <Route exact path={match.url} render={()=>( <SearchList value={match.params.id}/>)}/>
      <Route path={`/class/view/1213`} component={View}/>
       </>
    );
};

export default Ranking;