import React, {Component} from 'react';
import './App.css';
import {MuiThemeProvider} from "material-ui";
import Page from "./Page.js";
import {CookiesProvider} from 'react-cookie';

class App extends Component {
    render() {
        return (
            <div className="App">
                <MuiThemeProvider>
                    <Page/>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
