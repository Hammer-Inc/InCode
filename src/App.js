import React, {Component} from 'react';
import './App.css';
import {MuiThemeProvider} from "material-ui";
import Auth from "./Logic/Auth";

class App extends Component {
    render() {
        return (
            <div className="App">
                <MuiThemeProvider>
                    <Auth/>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
