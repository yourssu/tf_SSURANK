import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from "recoil";
import Root from './client/Root';

ReactDOM.render(
        <RecoilRoot>
            <Root/>
        </RecoilRoot>
  , document.getElementById('root'));
