import React, {Component} from 'react';
import './App.css';
import {MuiThemeProvider} from "material-ui";
import Page from "./Page.js";
import {getMuiTheme} from "material-ui/styles/index";
import * as Colors from "material-ui/styles/colors";

class App extends Component {
    render() {
        return (
            <div className="App">
                <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
                    <Page/>
                </MuiThemeProvider>
            </div>
        );
    }
}

const customTheme = {
    "palette": {
        "primary1Color": Colors.lime400,
        "primary2Color": Colors.lime200,
        "accent1Color": Colors.deepOrange300,
        "accent2Color": Colors.grey900
    }
};
export default App