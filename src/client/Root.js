
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../shared/App';
import Analytics from 'react-router-ga';

 
const Root = () => (
    <BrowserRouter>
        <Analytics id="UA-188451512-1">
            <App/>
        </Analytics>
    </BrowserRouter>
);

export default Root;