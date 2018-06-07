import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import NotFound from "./404";
import {BrowserRouter, Route, Switch} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route component={NotFound} status={404}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
